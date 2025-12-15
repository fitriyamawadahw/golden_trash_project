# apps/profile/urls.py
from django.urls import path
from . import views

app_name = 'profile'  # untuk namespace 'profile:profile_view'

urlpatterns = [
    path('', views.profile_view, name='profile_view'),  # <--- fix di sini
    path('ajax/update/', views.ajax_update_profile, name='ajax_update_profile'),
]