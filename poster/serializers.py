from django.conf import settings
from rest_framework import serializers

import bleach

from poster.models import Post


class PostSerializer(serializers.ModelSerializer):  # serializers.HyperlinkedModelSerializer):

    username = serializers.CharField(source='written_by.username',
                                     read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'content', 'written_by', 'published_at', 'username',
                  'where', 'when', 'who')


    def validate_content(self, value):

        return bleach.clean(
            value,
            tags=settings.ALLOWED_TAGS,
            attributes=settings.ALLOWED_ATTRIBUTES,
            styles=settings.ALLOWED_STYLES,
            strip=True
        )
