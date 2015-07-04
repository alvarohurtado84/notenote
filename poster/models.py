from django.db import models

from nuser.models import User


class Post(models.Model):
    """Stores every article that will be written by the users."""

    content = models.TextField()

    written_by = models.ForeignKey(User)

    who = models.CharField(max_length=100, null=True, blank=True)
    where = models.CharField(max_length=100, null=True, blank=True)
    when = models.CharField(max_length=100, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
