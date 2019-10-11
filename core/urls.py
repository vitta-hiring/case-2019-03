from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from prescricoes.api.viewsets import PrescricaoViewSet
from pessoas.api.viewsets import PacienteViewSet, MedicoViewSet
from medicamentos.api.viewsets import MedicamentoViewSet, InteracaoViewSet

route = routers.DefaultRouter()
route.register('prescricoes', PrescricaoViewSet)
route.register('medicos', MedicoViewSet)
route.register('pacientes', PacienteViewSet)
route.register('medicamentos', MedicamentoViewSet)
route.register('interacoes', InteracaoViewSet)

urlpatterns = [
    path('', include(route.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls'))
]
