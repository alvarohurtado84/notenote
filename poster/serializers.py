from rest_framework import serializers

from poster.models import Post


class PostSerializer(serializers.ModelSerializer):  # serializers.HyperlinkedModelSerializer):

    written_by = serializers.CharField()

    class Meta:
        model = Post
        fields = ('content', 'written_by', 'published_at')
