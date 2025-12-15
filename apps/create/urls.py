# apps/create/urls.py
from django.urls import path
from . import views

app_name = 'create'

urlpatterns = [
    path('', views.create_content, name='create_content'),
]