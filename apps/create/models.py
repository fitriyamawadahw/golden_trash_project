# apps/create/models.py
from django.db import models
from django.contrib.auth.models import User
from apps.home.models import Waste

class CreateContent(models.Model):
    CONTENT_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]
    
    DURATION_CHOICES = [
        ('<=1hari', '≤ 1 hari'),
        ('1hari', '1 hari'),
        ('>=1hari', '≥ 1 hari'),
    ]
    
    CATEGORY_CHOICES = [
        ('Organik', 'Organik'),
        ('Anorganik', 'Anorganik'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    waste = models.ForeignKey(Waste, on_delete=models.SET_NULL, null=True, blank=True)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPE_CHOICES)
    file_path = models.FileField(upload_to='content_files/')
    caption = models.TextField(blank=True, null=True)
    materials = models.TextField(blank=True, null=True)
    duration_label = models.CharField(max_length=10, choices=DURATION_CHOICES)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    hashtags = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'create_content'
        
    def __str__(self):
        return f"{self.user.username} - {self.content_type}"