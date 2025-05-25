from django import forms
from .models import Notification


class NotificationFilterForm(forms.Form):
    """Form for filtering notifications"""
    FILTER_CHOICES = [
        ('all', 'All Notifications'),
        ('unread', 'Unread Only'),
        ('read', 'Read Only'),
    ]
    
    TYPE_CHOICES = [
        ('all', 'All Types'),
        ('like', 'Likes'),
        ('comment', 'Comments'),
        ('follow', 'Follows'),
        ('share', 'Shares'),
        ('mention', 'Mentions'),
        ('system', 'System'),
    ]
    
    status = forms.ChoiceField(
        choices=FILTER_CHOICES,
        initial='all',
        widget=forms.Select(attrs={
            'class': 'form-control',
            'onchange': 'this.form.submit();'
        })
    )
    
    notification_type = forms.ChoiceField(
        choices=TYPE_CHOICES,
        initial='all',
        widget=forms.Select(attrs={
            'class': 'form-control',
            'onchange': 'this.form.submit();'
        })
    )


class CreateNotificationForm(forms.ModelForm):
    """Form for admins to create notifications"""
    class Meta:
        model = Notification
        fields = ['recipient', 'notification_type', 'title', 'message']
        widgets = {
            'recipient': forms.Select(attrs={'class': 'form-control'}),
            'notification_type': forms.Select(attrs={'class': 'form-control'}),
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Notification title'}),
            'message': forms.Textarea(attrs={
                'class': 'form-control', 
                'placeholder': 'Notification message',
                'rows': 4
            }),
        }