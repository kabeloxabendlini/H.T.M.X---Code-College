# main_app/models.py
from django.db import models
from cloudinary.models import CloudinaryField
from django.core.validators import FileExtensionValidator


class Person(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    major = models.CharField(max_length=100, blank=True, null=True)
    profile_image = models.ImageField(upload_to="profiles/", blank=True, null=True)

    # Separate field for images (will show previews)
    image = CloudinaryField(
        'image',
        resource_type='image',  # This will show previews
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png', 'gif', 'webp'])],
        blank=True,
        null=True
    )
    
    # Edited field to use Cloudinary
    document = CloudinaryField(
        'document',
        resource_type='raw',  # Use 'raw' for documents like pdf, docx, txt, images
        validators=[FileExtensionValidator(['pdf', 'doc', 'docx', 'txt', 'jpg', 'png'])],
        blank=True,
        null=True
    )


    def __str__(self):
        return self.name

