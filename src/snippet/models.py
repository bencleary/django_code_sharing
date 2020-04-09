from django.db import models
from uuid import uuid4
from django.utils.translation import ugettext_lazy as _


class Snippet(models.Model):
    urn = models.UUIDField(_("URN"), default=uuid4)
    syntax = models.CharField(_("Syntax"), max_length=75, blank=True)
    description = models.TextField(_("Description"), blank=True)
    content = models.TextField(_("Content"))
    created_at = models.DateTimeField(auto_now_add=True)
    expiry = models.DateTimeField(blank=True, null=True)
