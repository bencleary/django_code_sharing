from django.urls import path
from .views import *

urlpatterns = [
    path('', SnippetView.as_view(), name="snippet-view"),
    path('<uuid:urn>/', SnippetDetailView.as_view(), name="snippet-view-detail"),
    path('<uuid:urn>/raw/', SnippetContentRawView.as_view(), name="snippet-raw-detail")
]