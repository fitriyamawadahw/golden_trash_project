# apps/create/forms.py
from django import forms
from .models import CreateContent
from apps.home.models import Waste

class CreateContentForm(forms.ModelForm):
    class Meta:
        model = CreateContent
        fields = ['waste', 'content_type', 'file_path', 'caption', 'materials', 
                 'duration_label', 'category', 'hashtags']
        widgets = {
            'content_type': forms.Select(attrs={'class': 'form-control'}),
            'file_path': forms.FileInput(attrs={'class': 'form-control', 'accept': 'image/*,video/*'}),
            'caption': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'materials': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'duration_label': forms.Select(attrs={'class': 'form-control'}),
            'category': forms.Select(attrs={'class': 'form-control'}),
            'hashtags': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '#contoh #hashtag'}),
            'waste': forms.Select(attrs={'class': 'form-control'}),
        }
        labels = {
            'waste': 'Jenis Sampah',
            'content_type': 'Tipe Konten',
            'file_path': 'Upload File',
            'caption': 'Caption',
            'materials': 'Bahan-bahan',
            'duration_label': 'Durasi Pengerjaan',
            'category': 'Kategori',
            'hashtags': 'Hashtags',
        }