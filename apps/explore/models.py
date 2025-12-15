from django.db import models
from django.contrib.auth.models import User
from apps.katalog.models import Product  # pastikan import sesuai nama app & model

class Comment(models.Model):
    # Relasi ke produk yang dikomentari
    product = models.ForeignKey(Product, related_name='comments', on_delete=models.CASCADE)
    
    # Relasi ke user yang memberi komentar
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='comments')
    
    # Konten komentar
    text = models.TextField()
    
    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # String representation
    def __str__(self):
        return f'Comment by {self.author.username if self.author else "Anonymous"} on {self.product.title}'
