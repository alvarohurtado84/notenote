from rest_framework.routers import Route, DynamicDetailRoute, SimpleRouter


class PostCustomRouter(SimpleRouter):
    """
    A router for read-only APIs, which doesn't use trailing slashes.
    """
    routes = [
        # Will list all the posts and allow creation
        Route(
            url=r'^{prefix}{trailing_slash}$',
            mapping={
                'post': 'create',
                'get': 'list'
            },
            name='{basename}-list',
            initkwargs={'suffix': 'List'}
        ),
        # Will list all the posts of that user
        Route(
            url=r'^{prefix}/(?P<username>[^/]+){trailing_slash}$',
            mapping={'get': 'list'},
            name='{basename}-list-by-user',
            initkwargs={'suffix': 'List by User'}
        ),
        # Detail view for a Post, need 2 fields because slug is not unique
        Route(
            url=r'^{prefix}/(?P<username>[^/]+)/{lookup}{trailing_slash}$',
            mapping={
                'put': 'update',
                'delete': 'destroy',
                'patch': 'partial_update',
                'get': 'retrieve'
            },
            name='{basename}-detail',
            initkwargs={'suffix': 'Detail'}
        ),
        # DynamicDetailRoute(
        #     url=r'^{prefix}/{lookup}/{methodnamehyphen}$',
        #     name='{basename}-{methodnamehyphen}',
        #     initkwargs={}
        # )
    ]