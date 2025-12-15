from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from .models import UserProfile
from .forms import ProfileEditForm

@login_required
def profile_view(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        form = ProfileEditForm(request.POST, request.FILES, instance=profile, user=request.user)
        if form.is_valid():
            try:
                form.save()
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    return JsonResponse({'success': True, 'message': 'Profile berhasil diperbarui!'})
                messages.success(request, 'Profile berhasil diperbarui!')
                return redirect('profile:profile_view')
            except Exception as e:
                messages.error(request, f'Terjadi kesalahan: {str(e)}')
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    return JsonResponse({'success': False, 'message': str(e)})
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = ProfileEditForm(instance=profile, user=request.user)

    days_joined = (timezone.now().date() - request.user.date_joined.date()).days

    context = {
        'profile': profile,
        'form': form,
        'days_joined': days_joined,
    }

    return render(request, 'profile/profile.html', context)

@login_required
@require_http_methods(["POST"])
def ajax_update_profile(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    form = ProfileEditForm(request.POST or None, request.FILES or None, instance=profile, user=request.user)


    if form.is_valid():
        form.save()
        return JsonResponse({
            'data': {
                'full_name': profile.full_name or request.user.username,
                'username': request.user.username,
                'email': request.user.email,
                'bio': profile.bio or '',
                'profile_image_url': profile.profile_image.url if profile.profile_image else None
            }
        })
    else:
        return JsonResponse({'success': False, 'errors': form.errors})
