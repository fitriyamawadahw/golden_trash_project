from django.db import models
from django.contrib.auth.models import User

# ⬇️ Taruh semua pilihan di atas class Product
CATEGORY_CHOICES = [
    ('organik', 'Organik'),
    ('anorganik', 'Anorganik'),
]

SUBCATEGORY_CHOICES = [
    ('plastik', 'Plastik'),
    ('kaca', 'Kaca'),
    ('logam', 'Logam'),
    ('elektronik', 'Elektronik'),
    ('mainan', 'Mainan'),
    ('kain', 'Kain'),
    ('karet', 'Karet'),
    ('kertas', 'Kertas'),
]

DIFFICULTY_CHOICES = [
    ('mudah', 'Mudah (<1 hari)'),
    ('standar', 'Standar (1 hari)'),
    ('sulit', 'Sulit (>1 hari)'),
]

# ⬇️ Baru class-nya
class Product(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='product_images/')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    subcategory = models.CharField(max_length=20, choices=SUBCATEGORY_CHOICES)
    cara_pembuatan = models.TextField()
    materials = models.TextField()
    product_type = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    likes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class Comment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    content = models.TextField()  # ← ini harus ADA
    created_at = models.DateTimeField(auto_now_add=True)
