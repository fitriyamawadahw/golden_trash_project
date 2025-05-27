from django.urls import path
from .views import katalog_view
from . import views
from .views import katalog_view, product_detail

app_name = 'katalog'

urlpatterns = [
    path('<str:subcategory>/', views.katalog_view, name='katalog'),
    path('produk/<int:pk>/', views.product_detail, name='product_detail'),
    path('produk/<int:pk>/like/', views.like_product, name='like_product'),
]

