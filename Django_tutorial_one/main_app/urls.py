# // main_app/urls.py 
# main_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),

    # CRUD
    path('create/', views.quote_create, name='quote_create'),
    path('<int:pk>/edit/', views.quote_edit, name='quote_edit'),
    path('<int:pk>/update/', views.quote_update, name='quote_update'),
    path('<int:pk>/delete/', views.quote_delete, name='quote_delete'),
]