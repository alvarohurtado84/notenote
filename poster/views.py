from rest_framework import viewsets

from poster.models import Post
from poster.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """API endpoint that allows Posts to be viewed."""

    queryset = (
        Post.objects.exclude(published_at=None).order_by('-published_at')
    )
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        request.data["written_by"] = request.user.pk
        return super(PostViewSet, self).create(request, *args, **kwargs)
