from django.shortcuts import render, get_object_or_404
from .models import Product, Comment

def katalog_view(request, subcategory=None):
    if subcategory:
        products = Product.objects.filter(subcategory=subcategory)
    else:
        products = Product.objects.all()

    return render(request, 'katalog/katalog.html', {
        'products': products,
        'subcategory': subcategory
    })

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    comments = Comment.objects.filter(product=product).order_by('-created_at')
    return render(request, 'katalog/product_detail.html', {
        'product': product,
        'comments': comments
    })
