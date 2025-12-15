from django.db import models
from django.contrib.auth.models import User
from apps.katalog.models import Product  # import model Product dari katalog

class Comment(models.Model):
    product = models.ForeignKey(Product, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # opsional, kalau mau edit komentar

    def __str__(self):
        return f'Comment by {self.author.username if self.author else "Anonymous"} on {self.product.title}'
