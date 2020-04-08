from rest_framework.viewsets import ModelViewSet
from .serializers import *


class SnippetViewSet(ModelViewSet):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer