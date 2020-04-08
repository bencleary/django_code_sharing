from django.db import models
from uuid import uuid4


class Snippet(models.Model):
    urn = models.UUIDField(default=uuid4)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    expiry = models.DateTimeField(blank=True, null=True)
