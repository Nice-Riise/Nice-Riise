from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, Category, Listing, Comment, Bid


def newListing(request, id):
    objectsInList = Listing.objects.get(pk=id)
    isItemInWatchlist = request.user in objectsInList.watchlist.all()
    allComments = Comment.objects.filter(newListing=objectsInList)
    isOwner = request.user.username == objectsInList.owner.username

    return render(request, "auctions/newListing.html", {
        "newListing": objectsInList,
        "isItemInWatchlist": isItemInWatchlist,
        "allComments": allComments,
        "isOwner": isOwner

    })


def endAuction(request, id):
    objectsInList = Listing.objects.get(pk=id)
    objectsInList.activeStatus = False
    objectsInList.save()
    isOwner = request.user.username == objectsInList.owner.username
    isItemInWatchlist = request.user in objectsInList.watchlist.all()
    allComments = Comment.objects.filter(newListing=objectsInList)

    return render(request, "auctions/newListing.html", {
        "newListing": objectsInList,
        "isItemInWatchlist": isItemInWatchlist,
        "allComments": allComments,
        "isOwner": isOwner,
        "update": True,
        "message": "Your auction is closed"

    })


def addBid(request, id):
    newBid = request.POST['newBid']
    objectsInList = Listing.objects.get(pk=id)
    isItemInWatchlist = request.user in objectsInList.watchlist.all()
    allComments = Comment.objects.filter(newListing=objectsInList)
    isOwner = request.user.username == objectsInList.owner.username
    if int(newBid) > objectsInList.price.bid:
        updateBid = Bid(user=request.user, bid=int(newBid))
        updateBid.save()
        objectsInList.price = updateBid
        objectsInList.save()

        return render(request, "auctions/newListing.html", {
            "newListing": objectsInList,
            "message": "Bid Recived",
            "update": True,
            "isItemInWatchlist": isItemInWatchlist,
            "allComments": allComments,
            "isOwner": isOwner
        })
    else:
        return render(request, "auctions/newListing.html", {
            "newListing": objectsInList,
            "message": "Bid Failed",
            "update": False,
            "isItemInWatchlist": isItemInWatchlist,
            "allComments": allComments,
            "isOwner": isOwner
        })


def addComment(request, id):
    activeUser = request.user
    objectsInList = Listing.objects.get(pk=id)
    message = request.POST['newComment']
    newComment = Comment(
        author=activeUser,
        newListing=objectsInList,
        message=message)

    newComment.save()

    return HttpResponseRedirect(reverse("newListing", args=(id, )))


def watchlistSite(request):
    activeUser = request.user
    listings = activeUser.userWatchlist.all()
    return render(request, "auctions/watchlistSite.html", {
        "listings": listings
    })

# add and remove from watchlist


def removeFromWatchlist(request, id):
    objectsInList = Listing.objects.get(pk=id)
    activeUser = request.user
    objectsInList.watchlist.remove(activeUser)
    return HttpResponseRedirect(reverse("newListing", args=(id, )))


def addToWatchlist(request, id):
    objectsInList = Listing.objects.get(pk=id)
    activeUser = request.user
    objectsInList.watchlist.add(activeUser)
    return HttpResponseRedirect(reverse("newListing", args=(id, )))


def index(request):
    activeListings = Listing.objects.filter(activeStatus=True)
    allCategories = Category.objects.all()
    return render(request, "auctions/index.html", {
        "listings": activeListings,
        "categories": allCategories,
    })


def sortCategories(request):

    if request.method == "POST":
        getCategory = request.POST['category']
        category = Category.objects.get(categoryName=getCategory)
        activeListings = Listing.objects.filter(
            activeStatus=True, category=category)
        allCategories = Category.objects.all()
        return render(request, "auctions/index.html", {
            "listings": activeListings,
            "categories": allCategories,
        })


def createListing(request):
    if request.method == "GET":
        allCategories = Category.objects.all()
        return render(request, "auctions/create.html", {
            "categories": allCategories
        })
    else:
        # Get input from user
        title = request.POST["title"]
        description = request.POST["description"]
        image = request.POST["image"]
        price = request.POST["price"]
        category = request.POST["category"]

        # Get user info
        currentUser = request.user

        # get complete listing info
        categoryData = Category.objects.get(categoryName=category)

        # new Bid
        bid = Bid(bid=int(price), user=currentUser)
        bid.save()

        # New user listing
        newListing = Listing(
            title=title,
            description=description,
            image=image,
            price=bid,
            category=categoryData,
            owner=currentUser
        )

        # save new listing in database
        newListing.save()

        # return to indexpage
        return HttpResponseRedirect(reverse(index))


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")
