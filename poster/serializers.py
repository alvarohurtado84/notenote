from rest_framework import serializers

from poster.models import Post


class PostSerializer(serializers.ModelSerializer):  # serializers.HyperlinkedModelSerializer):

    username = serializers.CharField(source='written_by.username',
                                     read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'content', 'written_by', 'published_at', 'username', )
