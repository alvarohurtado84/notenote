# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('poster', '0003_merge'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='content',
            new_name='text',
        ),
        migrations.AlterField(
            model_name='post',
            name='published_at',
            field=models.DateTimeField(null=True, blank=True),
        ),
    ]
