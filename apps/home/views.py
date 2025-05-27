# apps/home/views.py
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from apps.katalog.models import Product

def index(request):
    keyword = request.GET.get('search', '')
    products = Product.objects.filter(title__icontains=keyword) if keyword else None

    return render(request, 'home/index.html', {
        'products': products,
        'keyword': keyword,
    })