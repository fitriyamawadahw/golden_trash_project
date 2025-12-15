from django.db import models
from django.contrib.auth.models import User
from apps.katalog.models import Product

class Comment(models.Model):
    # product = models.ForeignKey(Product, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f'Comment by {self.author} on {self.product}'