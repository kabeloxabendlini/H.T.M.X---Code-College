# main_app/forms.py
from django import forms
from .models import Person

class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ['name', 'email', 'phone', 'major', 'profile_image']

image = forms.FileField(
        widget=forms.FileInput(attrs={
            'class': 'file-input file-input-bordered w-full',
            'accept': 'image/*'
        }),
        required=False,
        help_text='Upload a profile image (JPG, PNG, GIF, WEBP)'
    )
    
document = forms.FileField(
        widget=forms.FileInput(attrs={
            'class': 'file-input file-input-bordered w-full',
            'accept': '.pdf,.doc,.docx,.txt'
        }),
        required=False,
        help_text='Upload a document (PDF, DOC, DOCX, TXT)'
    )



