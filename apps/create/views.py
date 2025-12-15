from django.shortcuts import render
from .forms import ProductUploadForm
from django.contrib.auth.decorators import login_required

@login_required
def create_content(request):
    upload_success = False  # Flag keberhasilan upload

    if request.method == 'POST':
        form = ProductUploadForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save(commit=False)
            product.user = request.user  # Hubungkan produk ke user
            product.save()
            upload_success = True  # Tandai berhasil
            form = ProductUploadForm()  # Kosongkan form setelah submit
    else:
        form = ProductUploadForm()

    # Gunakan variabel yang benar di context
    return render(request, 'create/upload_product.html', {
        'form': form,
        'success': upload_success
    })