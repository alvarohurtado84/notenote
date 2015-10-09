from django.db import models
from django.utils.text import slugify

from nuser.models import User


class Post(models.Model):
    """Stores every article that will be written by the users."""

    content = models.TextField()
    slug = models.SlugField(unique=False)

    written_by = models.ForeignKey(User)

    who = models.CharField(max_length=100, null=True, blank=True)
    where = models.CharField(max_length=100, null=True, blank=True)
    when = models.CharField(max_length=100, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ("slug", "written_by")

    def save(self, *args, **kwargs):
        """Set slug with a slug created using content (or others)."""

        if not self.slug:
            self.slug = slugify(self.content)

            if self.who:
                self.slug = "-".join([self.slug, slugify(self.who)])

            if self.where:
                self.slug = "-".join([self.slug, slugify(self.where)])

            if self.when:
                self.slug = "-".join([self.slug, slugify(self.when)])

        return super(Post, self).save(*args, **kwargs)
