# main_app/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.template.loader import render_to_string
from .models import Person
from .forms import PersonForm

def index(request):
    people = Person.objects.all()
    form = PersonForm()
    return render(request, "main_app/index.html", {"people": people, "form": form})

def person_create(request):
    if request.method == "POST":
        form = PersonForm(request.POST, request.FILES)
        if form.is_valid():
            person = form.save()
            html = render_to_string("main_app/person_item.html", {"person": person})
            return HttpResponse(html)
    return HttpResponse("Error creating person", status=400)

def person_update(request, pk):
    person = get_object_or_404(Person, pk=pk)
    if request.method == "POST":
        form = PersonForm(request.POST, request.FILES, instance=person)
        if form.is_valid():
            person = form.save()
            html = render_to_string("main_app/person_item.html", {"person": person})
            return HttpResponse(html)
    return HttpResponse("Error updating person", status=400)

def person_delete(request, pk):
    person = get_object_or_404(Person, pk=pk)
    person.delete()
    return HttpResponse("")

# Edit form
def person_edit(request, pk):
    person = get_object_or_404(Person, pk=pk)
    return render(request, "main_app/person_form.html", {"person": person})
