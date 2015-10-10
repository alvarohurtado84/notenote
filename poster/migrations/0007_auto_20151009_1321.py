# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.text import slugify


def save_post(apps, schema_editor):
    Post = apps.get_model("poster", "Post")
    for post in Post.objects.all():
        if not post.slug:
            post.slug = slugify(post.content)
        post.save()


class Migration(migrations.Migration):

    dependencies = [
        ('poster', '0006_auto_20150704_1237'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='slug',
            field=models.SlugField(default=''),
            preserve_default=False,
        ),
        migrations.RunPython(save_post),
        migrations.AlterUniqueTogether(
            name='post',
            unique_together=set([('slug', 'written_by')]),
        ),
    ]
