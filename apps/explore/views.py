# apps/explore/views.py
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from apps.create.models import CreateContent

@login_required
def explore(request):
    contents = CreateContent.objects.all().order_by('-created_at')
    return render(request, 'explore/explore.html', {'contents': contents})
