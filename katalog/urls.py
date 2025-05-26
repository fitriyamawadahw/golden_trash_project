from django.urls import path
from .views import katalog_view
from . import views

app_name = 'katalog'

urlpatterns = [
    path('<str:subcategory>/', views.katalog_view, name='katalog'),
    path('produk/<int:pk>/', views.product_detail, name='product_detail'),
]

