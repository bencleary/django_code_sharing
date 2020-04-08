from django.contrib.admin.models import LogEntry, ADDITION, CHANGE
from django.contrib.contenttypes.models import ContentType


def created(sender, instance, created, *args, **kwargs):
    if created:
        LogEntry.objects.log_action(
            user_id=None,
            content_type_id=ContentType.objects.get_for_model(sender).id,
            object_id=instance.id,
            object_repr=instance.created_at,
            action_flag=ADDITION,
            change_message="Added Snippet"
        )

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
