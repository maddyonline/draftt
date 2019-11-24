from django.db.models.signals import post_save
from .models import User
from .email import ActivationEmail, WelcomeEmail
from social_django.models import UserSocialAuth
# import the logging library
import logging
# Get an instance of a logger
logger = logging.getLogger('app_api')

def send_activation_email(sender, instance, created, **kwargs):
    """Sends the user an email with activation link on creation"""
    user = instance
    """Does not send email if superuser or active"""
    if created and not user.is_verified:
        context = {"user": user}
        ActivationEmail(context=context).send([user.email])

def send_welcome_email(sender, instance, created,update_fields=None, **kwargs):
    """ Sends a welcome email when account is verified """
    if created or update_fields is None or 'is_verified' not in update_fields:
        return
    logger.info(update_fields)
    logger.info(instance)
    if instance.is_verified and not instance.is_superuser:
        context = {'user': instance}
        WelcomeEmail(context=context).send([instance.email])

post_save.connect(send_welcome_email, sender=User)
