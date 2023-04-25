from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create", views.createListing, name="create"),
    path("sortCategories", views.sortCategories, name="sortCategories"),
    path("newListing/<int:id>", views.newListing, name="newListing"),
    path("removeFromWatchlist/<int:id>",
         views.removeFromWatchlist, name="removeFromWatchlist"),
    path("addToWatchlist/<int:id>",
         views.addToWatchlist, name="addToWatchlist"),
    path("watchlistSite", views.watchlistSite, name="watchlistSite"),
    path("addComment/<int:id>", views.addComment, name="addComment"),
    path("addBid/<int:id>", views.addBid, name="addBid"),
    path("endAuction/<int:id>", views.endAuction, name="endAuction"),
]
