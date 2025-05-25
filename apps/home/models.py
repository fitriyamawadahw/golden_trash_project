# apps/home/models.py
from django.db import models

class Waste(models.Model):
    CATEGORY_CHOICES = [
        ('Organik', 'Organik'),
        ('Anorganik', 'Anorganik'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'home_waste'
        
    def __str__(self):
        return self.name