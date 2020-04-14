from django.views.generic import TemplateView, DetailView, View
from django.http import HttpResponse
from .models import Snippet


class SnippetView(TemplateView):
    template_name = "snippet.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if clone := self.request.GET.get('clone'):
            context["clone"] = Snippet.objects.get(urn=clone)
        return context


class SnippetDetailView(DetailView):
    template_name = "snippet.detail.html"
    context_object_name = "snippet"

    def get_object(self):
        return Snippet.objects.get(urn=self.kwargs["urn"])


class SnippetContentRawView(View):

    def get(self, request, urn):
        return HttpResponse(Snippet.objects.get(urn=urn).content, content_type="text/plain")