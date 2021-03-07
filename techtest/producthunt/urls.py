from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("products/<str:date>", views.products, name="products"),
    path("newproduct", views.newproduct, name="newproduct"),
    path("product/<str:id>", views.product, name="product"),
    path("vote", views.vote, name="vote"),
    path("unvote", views.unvote, name="unvote"),
]