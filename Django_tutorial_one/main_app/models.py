# // main_app/models.py 
from django.db import models

class Quote(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=255)
from django.db import models
