from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from prescricoes.api.viewsets import PrescricaoViewSet, ItemViewSet

route = routers.DefaultRouter()
route.register('prescricoes', PrescricaoViewSet)
route.register('items', ItemViewSet, base_name='Item')
urlpatterns = [
    path('', include(route.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls'))
]
