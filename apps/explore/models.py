# apps/explore/models.py
from django.db import models
from django.contrib.auth.models import User
from apps.create.models import CreateContent

class ExploreComment(models.Model):
    content = models.ForeignKey(CreateContent, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'explore_comment'
        
    def __str__(self):
        return f"{self.user.username} - {self.content.id}"