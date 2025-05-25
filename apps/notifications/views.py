from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.core.paginator import Paginator
from django.views.decorators.http import require_POST
from django.contrib import messages
from .models import Notification


@login_required
def notification_list(request):
    """Display all notifications for the current user"""
    notifications = Notification.objects.filter(recipient=request.user)
    
    # Pagination
    paginator = Paginator(notifications, 20)  # 20 notifications per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    # Mark all as read when viewing the page
    unread_notifications = notifications.filter(is_read=False)
    unread_notifications.update(is_read=True)
    
    context = {
        'page_obj': page_obj,
        'notifications': page_obj,
        'total_notifications': notifications.count(),
    }
    
    return render(request, 'notifications/notification_list.html', context)


@login_required
@require_POST
def mark_as_read(request, notification_id):
    """Mark a specific notification as read via AJAX"""
    notification = get_object_or_404(Notification, id=notification_id, recipient=request.user)
    notification.mark_as_read()
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({'status': 'success', 'message': 'Notification marked as read'})
    
    messages.success(request, 'Notification marked as read')
    return redirect('notifications:notification_list')


@login_required
@require_POST
def mark_all_as_read(request):
    """Mark all notifications as read"""
    notifications = Notification.objects.filter(recipient=request.user, is_read=False)
    notifications.update(is_read=True)
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({'status': 'success', 'message': 'All notifications marked as read'})
    
    messages.success(request, 'All notifications marked as read')
    return redirect('notifications:notification_list')


@login_required
@require_POST
def delete_notification(request, notification_id):
    """Delete a specific notification"""
    notification = get_object_or_404(Notification, id=notification_id, recipient=request.user)
    notification.delete()
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({'status': 'success', 'message': 'Notification deleted'})
    
    messages.success(request, 'Notification deleted')
    return redirect('notifications:notification_list')


@login_required
def get_unread_count(request):
    """Get unread notifications count via AJAX"""
    count = Notification.objects.filter(recipient=request.user, is_read=False).count()
    return JsonResponse({'unread_count': count})


def create_notification(recipient, sender=None, notification_type='system', title='', message='', content_object_id=None, content_type=None):
    """Helper function to create notifications"""
    notification = Notification.objects.create(
        recipient=recipient,
        sender=sender,
        notification_type=notification_type,
        title=title,
        message=message,
        content_object_id=content_object_id,
        content_type=content_type
    )
    return notification