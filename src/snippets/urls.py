from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

django_urls = [
    path('admin/', admin.site.urls),
]

api_urls = [
    path('api/v1/', include('snippet.api.urls'))
]

view_urls = [
    path('', include('snippet.urls'))
]

urlpatterns = []
urlpatterns += django_urls
urlpatterns += api_urls
urlpatterns += view_urls


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)