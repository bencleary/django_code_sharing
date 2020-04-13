from django.views.generic import TemplateView, DetailView
from .models import Snippet


class SnippetView(TemplateView):
    template_name = "snippet.html"


class SnippetDetailView(DetailView):
    template_name = "snippet.detail.html"
    context_object_name = "snippet"

    def get_object(self):
        return Snippet.objects.get(urn=self.kwargs["urn"])