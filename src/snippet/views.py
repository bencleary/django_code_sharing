from django.views.generic import TemplateView


class SnippetView(TemplateView):
    template_name = "snippet.html"
