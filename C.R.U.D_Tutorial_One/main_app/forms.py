# main_app/forms.py
from django import forms
from .models import Person

class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ['name', 'email', 'phone', 'major', 'profile_image']
