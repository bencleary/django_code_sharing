from django.urls import path
from .views import *

urlpatterns = [
    path('', SnippetView.as_view(), name="snippet-view")
]