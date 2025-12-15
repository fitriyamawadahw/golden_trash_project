from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect

def root_redirect(request):
    return redirect('accounts:login')

urlpatterns = [
    path('admin/', admin.site.urls),

    # ROOT → LOGIN
    path('', root_redirect, name='root'),

    path('accounts/', include('apps.accounts.urls')),
    path('home/', include('apps.home.urls')),
    path('katalog/', include('apps.katalog.urls')),
    path('create/', include('apps.create.urls')),
    path('explore/', include('apps.explore.urls')),
    path('profile/', include('apps.profile.urls')),
    path('notifications/', include('apps.notifications.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
