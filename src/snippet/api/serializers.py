from rest_framework.serializers import ModelSerializer
from ..models import Snippet


class SnippetSerializer(ModelSerializer):
    class Meta:
        model = Snippet
        fields = "__all__"
        read_only_fields = ["urn", "expiry"]