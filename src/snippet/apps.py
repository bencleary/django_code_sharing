from django.apps import AppConfig


class SnippetConfig(AppConfig):
    name = 'snippet'

    def ready(self):
        import snippet.signals
