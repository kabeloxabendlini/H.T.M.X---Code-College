# main_app/views.py
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Quote

def index(request):
    quotes = Quote.objects.all()
    return render(request, "main_app/index.html", {"quotes": quotes})

# Create
def quote_create(request):
    if request.method == "POST":
        text = request.POST.get("text")
        author = request.POST.get("author")
        quote = Quote.objects.create(text=text, author=author)
        return render(request, "main_app/quote_item.html", {"quote": quote})

# Edit form
def quote_edit(request, pk):
    quote = get_object_or_404(Quote, pk=pk)
    return render(request, "main_app/quote_form.html", {"quote": quote})

# Update
def quote_update(request, pk):
    quote = get_object_or_404(Quote, pk=pk)
    if request.method == "POST":
        quote.text = request.POST.get("text")
        quote.author = request.POST.get("author")
        quote.save()
        return render(request, "main_app/quote_item.html", {"quote": quote})

# Delete
def quote_delete(request, pk):
    quote = get_object_or_404(Quote, pk=pk)
    quote.delete()
    return HttpResponse("")  # HTMX will remove the lic