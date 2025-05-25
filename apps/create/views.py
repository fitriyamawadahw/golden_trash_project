# apps/create/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import CreateContent
from .forms import CreateContentForm

@login_required
def create_content(request):
    if request.method == 'POST':
        form = CreateContentForm(request.POST, request.FILES)
        if form.is_valid():
            content = form.save(commit=False)
            content.user = request.user
            content.save()
            messages.success(request, 'Konten berhasil dibuat!')
            return redirect('create:upload_success')
    else:
        form = CreateContentForm()
    
    return render(request, 'create/create_content.html', {'form': form})

@login_required
def upload_success(request):
    """View untuk halaman sukses setelah upload"""
    return render(request, 'create/upload_success.html')