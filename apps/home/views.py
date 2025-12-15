# apps/home/views.py
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from apps.katalog.models import Product

def index(request):
    keyword = request.GET.get('search')
    if keyword:
        products = Product.objects.filter(title__icontains=keyword)
    else:
        products = None

    kategori_options = Product.objects.values_list('category', flat=True).distinct()
    material_options = Product.objects.exclude(subcategory='-').values_list('subcategory', flat=True).distinct()
    difficulty_options = Product.objects.values_list('difficulty', flat=True).distinct()

    return render(request, 'home/index.html', {
        'products': products,
        'keyword': keyword,
        'kategori_options': kategori_options,
        'material_options': material_options,
        'difficulty_options': difficulty_options,
    })