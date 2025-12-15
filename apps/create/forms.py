# apps/create/forms.py
from django import forms
from apps.katalog.models import Product

# apps/create/forms.py

class ProductUploadForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = [
            'title',
            'image',
            'category',
            'subcategory',
            'materials',
            'product_type',
            'difficulty',
            'cara_pembuatan',
        ]
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'image': forms.ClearableFileInput(attrs={'accept': 'image/,video/'}),
            'category': forms.Select(attrs={'class': 'form-control', 'id': 'id_category'}),
            'subcategory': forms.Select(attrs={'class': 'form-control', 'id': 'id_subcategory'}),
            'materials': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'product_type': forms.TextInput(attrs={'class': 'form-control'}),
            'difficulty': forms.Select(choices=[('Easy', 'Easy'), ('Medium', 'Medium'), ('Hard', 'Hard')], attrs={'class': 'form-control'}),
            'cara_pembuatan': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
        }