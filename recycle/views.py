# views.py
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        # Authenticate user
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            # Login successful
            login(request, user)
            return redirect('home')  # Redirect to home page
        else:
            # Login failed
            error = "Invalid username or password"
            return render(request, 'login.html', {'error': error})
    
    # GET request - show login form
    return render(request, 'login.html')

def register_view(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        # Validasi
        if password != confirm_password:
            messages.error(request, 'Password tidak cocok!')
            return redirect('register')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username sudah digunakan!')
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email sudah digunakan!')
            return redirect('register')

        # Buat user baru
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        user.save()
        messages.success(request, 'Registrasi berhasil!')
        return redirect('login')  # ganti ke nama url login kamu

    return render(request, 'register.html')

@login_required
def home_view(request):
    """Home page - requires login"""
    return render(request, 'home.html')

# Alternative: Class-based view
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy

class CustomLoginView(LoginView):
    template_name = 'login.html'
    success_url = reverse_lazy('home')
    redirect_authenticated_user = True
    
    def form_invalid(self, form):
        messages.error(self.request, 'Invalid username or password')
        return super().form_invalid(form)
    
def logout_view(request):
    logout(request)
    messages.success(request, 'Logout berhasil!')
    return redirect('login') 