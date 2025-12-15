from django.shortcuts import render, get_object_or_404
from .models import Product, Comment
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, get_object_or_404, redirect
from .models import Product
from .forms import ProductForm  # ⬅️ kita buat form ini di langkah c
from django.contrib import messages

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

def katalog_view(request, subcategory):
    # Ganti dash jadi spasi untuk match dengan field subcategory di database
    subcategory_cleaned = subcategory.replace('-', ' ')
    products = Product.objects.filter(subcategory__iexact=subcategory_cleaned)

    return render(request, 'katalog/katalog.html', {
        'products': products,
        'subcategory': subcategory_cleaned,
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

def edit_product(request, pk):
    product = get_object_or_404(Product, pk=pk)

    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            messages.success(request, "Produk berhasil diubah.")
            return redirect('katalog:product_detail', pk=pk)
    else:
        form = ProductForm(instance=product)

    return render(request, 'katalog/edit_product.html', {'form': form, 'product': product})

def delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk)

    if request.method == 'POST':
        product.delete()
        messages.success(request, "Produk berhasil dihapus.")
        return redirect('/')  # arahkan ke home atau katalog

    return render(request, 'katalog/delete_product.html', {'product': product})