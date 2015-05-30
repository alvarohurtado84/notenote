from django.contrib import admin

from poster.models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):

    list_display = ('written_by', '_content', 'is_published', 'created_at',
                    'modified_at')

    def is_published(self, obj):
        return bool(obj.published_at)
    is_published.boolean = True

    def _content(self, obj):
        if len(obj.content) > 80:
            return "%s..." % obj.content[:80]
        else:
            return obj.content
