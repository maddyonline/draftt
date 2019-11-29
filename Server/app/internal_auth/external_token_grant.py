
import json
import logging

from oauthlib.oauth2.rfc6749 import errors, utils
from oauthlib.oauth2.rfc6749.request_validator import RequestValidator
from oauthlib.oauth2.rfc6749.grant_types.base import GrantTypeBase
from django.http import HttpRequest
log = logging.getLogger(__name__)
from django.urls import reverse
import oauthlib
oauthlib.set_debug(True)
# from social_django.views import NAMESPACE
# from social_django.utils import load_backend, load_strategy
# from social_core.exceptions import MissingBackend, SocialAuthBaseException
# from social_core.utils import requests

class ExternalTokenGrant(GrantTypeBase):

    """External token grant
        Grant type to accept and authorize external token requests
        i.e. Google/Facebook Auth Code
    """

    def create_token_response(self, request, token_handler):
        """Create a new access token from an external token.
        :param request: OAuthlib request.
        :type request: oauthlib.common.Request
        :param token_handler: A token handler instance, for example of type
                              oauthlib.oauth2.BearerToken.
        If valid and authorized, the authorization server issues an access
        token as described . If the request failed verification or is invalid,
        the authorization server returns an error response.
        """
        headers = self._get_default_headers()
        try:
            if self.request_validator.client_authentication_required(request=request):
                log.debug('Authenticating client, %r.', request)
                if not self.request_validator.authenticate_client(request=request):
                    log.debug('Client authentication failed, %r.', request)
                    raise errors.InvalidClientError(request=request)
            elif not self.request_validator.authenticate_client_id(request.client_id, request=request):
                log.debug('Client authentication failed, %r.', request)
                raise errors.InvalidClientError(request=request)
            log.debug('Validating access token request, %r.', request)
            self.validate_token_request(request)
        except errors.OAuth2Error as e:
            log.debug('Client error in token request, %s.', e)
            headers.update(e.headers)
            return headers, e.json, e.status_code

        token = token_handler.create_token(request,
                                           refresh_token=self.refresh_tokens)

        for modifier in self._token_modifiers:
            token = modifier(token)

        self.request_validator.save_token(token, request)

        log.debug('Issuing new token to client id %r (%r), %r.',
                  request.client_id, request.client, token)
        return headers, json.dumps(token), 200

    def validate_token_request(self, request):
        """
        :param request: OAuthlib request.
        :type request: oauthlib.common.Request
        """

        for validator in self.custom_validators.pre_token:
            validator(request)

        #Check if the provider and access_code are provided
        for param in ('grant_type', 'provider', 'access_code'):
            if not getattr(request, param, None):
                raise errors.InvalidRequestError(
                    'Request is missing %s parameter.' % param, request=request)

        for param in ('grant_type', 'provider', 'access_code', 'scope'):
            if param in request.duplicate_params:
                raise errors.InvalidRequestError(description='Duplicate %s parameter.' % param, request=request)
        
        # This error should rarely (if ever) occur if requests are routed to
        # grant type handlers based on the grant_type parameter.
        if not request.grant_type == 'external_token':
            raise errors.UnsupportedGrantTypeError(request=request)
       
        if not self.external_validator(request.provider, request.access_code, request):
            raise errors.InvalidGrantError(
                    'Invalid token or provider', request=request)

        # Ensure client is authorized use of this grant type
        self.validate_grant_type(request)

        if request.client:
            request.client_id = request.client_id or request.client.client_id
        self.validate_scopes(request)

        for validator in self.custom_validators.post_token:
            validator(request)

    def external_validator(self,provider, access_code, request):
        req= HttpRequest()
        req.POST=request.body
        req.http_method="POST"
        req.path=request.uri
        log.info(req.POST)
        log.debug(req.get_host())
        return True
        # strategy = load_strategy(request=request)
        # try:
        #     backend= load_backend(strategy, provider, \
        #                         reverse("%s:django:complete" % NAMESPACE,args=(provider,)))
        # except MissingBackend:
        #     raise errors.InvalidRequestError(
        #             description='Invalud provider given',
        #             request=request)
        