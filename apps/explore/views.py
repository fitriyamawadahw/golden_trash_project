from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.http import require_POST, require_http_methods
from django.views.decorators.csrf import csrf_exempt
import random
import json

from apps.katalog.models import Product
from .models import Comment

def explore(request):
    products = Product.objects.all()
    context = {'products': products}
    return render(request, 'explore/explore.html', context)

def get_random_posts_api(request):
    products = list(Product.objects.all())
    random_products = random.sample(products, min(len(products), 20))
    data = serializers.serialize('json', random_products)
    return JsonResponse({'products': data}, safe=False)

def get_post_detail_api(request, post_id):
    product = get_object_or_404(Product, pk=post_id)
    data = {
        'id': product.id,
        'title': product.title,
        'image': product.image.url if product.image else '',
        'cara_pembuatan': product.cara_pembuatan,
        'likes': product.likes,
    }
    return JsonResponse(data)

@require_POST
def toggle_like_api(request, post_id):
    product = get_object_or_404(Product, pk=post_id)
    action = request.POST.get('action')
    if action == 'like':
        product.likes += 1
    elif action == 'unlike' and product.likes > 0:
        product.likes -= 1
    else:
        return JsonResponse({'error': 'Invalid action'}, status=400)
    product.save()
    return JsonResponse({'likes': product.likes})

@require_http_methods(["GET", "POST"])
@csrf_exempt
def post_comments_api(request, post_id):
    product = get_object_or_404(Product, pk=post_id)

    if request.method == "GET":
        comments = product.comments.all().order_by('-created_at')
        comments_data = [
            {
                'id': c.id,
                'author': c.author.username if c.author else 'Anonymous',
                'text': c.text,
                'created_at': c.created_at.strftime('%Y-%m-%d %H:%M')
            } for c in comments
        ]
        return JsonResponse({'comments': comments_data})

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get('text', '').strip()
            if not text:
                return JsonResponse({'error': 'Empty comment'}, status=400)

            user = request.user if request.user.is_authenticated else None
            comment = Comment.objects.create(product=product, author=user, text=text)
            comment_data = {
                'id': comment.id,
                'author': comment.author.username if comment.author else 'Anonymous',
                'text': comment.text,
                'created_at': comment.created_at.strftime('%Y-%m-%d %H:%M')
            }
            return JsonResponse(comment_data, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)