from django.urls import path
from . import views 
from django.conf import settings
from django.conf.urls.static import static # import views dari app recycle

urlpatterns = [
    path('', views.login_view, name='login'),       # root app, / → login
    path('login/', views.login_view, name='login'), # /login/
    path('register/', views.register_view, name='register'),  # /register/
    path('home/', views.home_view, name='home'),    # /home/
    path('logout/', views.logout_view, name='logout'),  # /logout/
]

# Untuk serve static files dalam development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)