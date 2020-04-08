from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from django.contrib.admin.models import LogEntry, ADDITION, CHANGE
from django.contrib.contenttypes.models import ContentType
from datetime import timedelta

from .models import *


@receiver(post_save, sender=Snippet)
def created(sender, instance, created, *args, **kwargs):
    if created:
        LogEntry.objects.log_action(
            user_id=1,
            content_type_id=ContentType.objects.get_for_model(sender).id,
            object_id=instance.id,
            object_repr=str(instance.id),
            action_flag=ADDITION,
            change_message="Added Snippet"
        )
        instance.expiry = instance.created_at + timedelta(days=7)
        instance.save()


def updated(sender, instance, created, *args, **kwargs):
    if not created:
        LogEntry.objects.log_action(
            user_id=None,
            content_type_id=ContentType.objects.get_for_model(sender).id,
            object_id=instance.id,
            object_repr=instance.created_at,
            action_flag=CHANGE,
            change_message="Updated Snippet"
        )
