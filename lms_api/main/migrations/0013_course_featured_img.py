# Generated by Django 4.1.3 on 2023-02-08 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_remove_teacher_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='featured_img',
            field=models.ImageField(null=True, upload_to='course_imgs/'),
        ),
    ]