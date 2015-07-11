# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('poster', '0005_auto_20150609_1838'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='when',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='post',
            name='where',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='post',
            name='who',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
    ]
