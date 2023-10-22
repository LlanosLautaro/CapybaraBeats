from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.CreateSongView.as_view(), name='create-song'),
    path('list/', views.SongListView.as_view(), name='song-list'),
    path('song/<int:id>/', views.SongDetailView.as_view(), name='song-detail'),
]
