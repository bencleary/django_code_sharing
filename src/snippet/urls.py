from django.urls import path
from .views import *

urlpatterns = [
    path('', SnippetView.as_view(), name="snippet-view"),
    path('<uuid:urn>/', SnippetDetailView.as_view(), name="snippet-view-detail")
]