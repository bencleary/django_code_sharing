from django.db import models
from uuid import uuid4
from datetime import timedelta


class Snippet(models.Model):
    urn = models.UUIDField(default=uuid4)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    expiry = models.DateTimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        self.expiry = self.created_at + timedelta(days=7)
        super().save(*args, **kwargs)
