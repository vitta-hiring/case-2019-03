from django.contrib import admin
from .models import Paciente, Medico

admin.site.register(Paciente)
admin.site.register(Medico)