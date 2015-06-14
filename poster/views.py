from rest_framework import viewsets
from rest_framework.exceptions import MethodNotAllowed

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

    def update(self, request, *args, **kwargs):

        if self.get_object().written_by != request.user:
            # This user is not allowed to update this post
            raise MethodNotAllowed(
                request.method,
                detail='This user is not allowed to update this post.'
            )

        request.data["written_by"] = request.user.pk
        return super(PostViewSet, self).update(request, *args, **kwargs)
