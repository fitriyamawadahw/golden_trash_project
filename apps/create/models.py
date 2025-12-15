# apps/create/models.py

from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    # Pilihan kategori utama
    CATEGORY_CHOICES = [
        ('Organik', 'Organik'),
        ('Anorganik', 'Anorganik'),
    ]

    # Pilihan subkategori
    SUBCATEGORY_CHOICES = [
        ('Plastik', 'Plastik'),
        ('Kertas', 'Kertas'),
        ('Logam', 'Logam'),
        ('Kaca', 'Kaca'),
        ('Kain', 'Kain'),
        ('Karet', 'Karet'),
        ('Elektronik', 'Elektronik'),
        ('Styrofoam', 'Styrofoam'),
        ('Mainan', 'Mainan'),
        ('Daun', 'Daun'),
        ('Sisa Makanan', 'Sisa Makanan'),
        ('Kulit Buah', 'Kulit Buah'),
        ('Sayur Busuk', 'Sayur Busuk'),
        ('Sekam Padi', 'Sekam Padi'),
        ('Ranting Kayu', 'Ranting Kayu'),
        ('Ampas Teh', 'Ampas Teh'),
        ('Ampas Kopi', 'Ampas Kopi'),
        ('Kulit Telur', 'Kulit Telur'),
        ('Kertas Tisu', 'Kertas Tisu'),
        ('Tulang Ikan', 'Tulang Ikan'),
        ('Bunga Layu', 'Bunga Layu'),
    ]

    # Fields utama
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='products/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    subcategory = models.CharField(max_length=50, choices=SUBCATEGORY_CHOICES)
    materials = models.TextField()
    product_type = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=20)
    cara_pembuatan = models.TextField()
    
    # Relasi ke user
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')

    # Timestamp (opsional tapi sering berguna)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # String representation
    def __str__(self):
        return f"{self.title} ({self.category} - {self.subcategory})"
