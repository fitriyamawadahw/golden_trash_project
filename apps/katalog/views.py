from django.shortcuts import render, get_object_or_404
from .models import Product, Comment
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, get_object_or_404, redirect


@csrf_exempt
def like_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    product.likes += 1
    product.save()
    return JsonResponse({'likes': product.likes})

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

    if request.method == 'POST':
        content = request.POST.get('comment')
        if content:
            Comment.objects.create(product=product, content=content)
            return redirect('katalog:product_detail', pk=pk)

    return render(request, 'katalog/product_detail.html', {
        'product': product,
        'comments': comments
    })
