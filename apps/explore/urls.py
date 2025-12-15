from django.urls import path
from . import views

app_name = 'explore'

urlpatterns = [
    path('', views.explore, name='explore'),
    path('api/posts/random/', views.get_random_posts_api, name='random_posts_api'),
    path('api/post/<int:post_id>/', views.get_post_detail_api, name='post_detail_api'),
    path('api/post/<int:post_id>/like/', views.toggle_like_api, name='post_like_api'),
    path('api/post/<int:post_id>/comments/', views.post_comments_api, name='post_comments_api'),
]