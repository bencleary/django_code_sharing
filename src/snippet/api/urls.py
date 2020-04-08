from rest_framework.routers import SimpleRouter
from .views import *

router = SimpleRouter()
router.register('snippet', SnippetViewSet)

urlpatterns = router.urls
