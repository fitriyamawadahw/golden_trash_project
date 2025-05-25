from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.home.urls')),
    path('accounts/', include('apps.accounts.urls')),
    path('create/', include('apps.create.urls')),
    path('explore/', include('apps.explore.urls')),
    path('profile/', include('apps.profile.urls')),
    path('notifications/', include('apps.notifications.urls')),  # Add this line
]

# Untuk serving media files saat development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)