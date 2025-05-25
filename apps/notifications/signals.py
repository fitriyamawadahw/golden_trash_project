from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Notification


@receiver(post_save, sender=User)
def create_welcome_notification(sender, instance, created, **kwargs):
    """Create welcome notification for new users"""
    if created:
        Notification.objects.create(
            recipient=instance,
            notification_type='system',
            title='Welcome to Golden Trash!',
            message=f'Hello {instance.username}! Welcome to our platform. Start exploring and creating amazing content!'
        )


# Example signal for when someone follows a user
# You can uncomment and modify this based on your models
"""
@receiver(post_save, sender=YourFollowModel)
def notify_on_follow(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            recipient=instance.followed_user,
            sender=instance.follower,
            notification_type='follow',
            title='New Follower',
            message=f'{instance.follower.username} started following you!'
        )
"""

# Example signal for likes
"""
@receiver(post_save, sender=YourLikeModel)
def notify_on_like(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            recipient=instance.post.author,
            sender=instance.user,
            notification_type='like',
            title='Someone liked your post',
            message=f'{instance.user.username} liked your post: "{instance.post.title[:50]}..."',
            content_object_id=instance.post.id,
            content_type='post'
        )
"""