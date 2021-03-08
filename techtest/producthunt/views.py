import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from .models import User, Product
from django.views.decorators.csrf import csrf_exempt
import mimetypes
from urllib.request import urlopen

def is_url_image(url):    
    mimetype,encoding = mimetypes.guess_type(url)
    return (mimetype and mimetype.startswith('image'))

def check_url(url):
    """Returns True if the url returns a response code between 200-300,
       otherwise return False.
    """
    try:
        headers = {
            "Range": "bytes=0-10",
            "User-Agent": "MyTestAgent",
            "Accept": "*/*"
        }
        response = urlopen(url)
        return response.code in range(200, 209)
    except Exception:
        return False

def is_image_and_ready(url):
    return is_url_image(url) and check_url(url)

def index(request):
    return render(request, "producthunt/index.html")


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
            return render(request, "producthunt/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "producthunt/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        is_founder = False
        is_voter = False
        if request.POST["user_type"] == "founder":
            is_founder = True
        elif request.POST["user_type"] == "voter":
            is_voter = True
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "producthunt/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(
                username, email, password)
            user.is_founder = is_founder
            user.is_voter = is_voter
            user.save()
        except IntegrityError:
            return render(request, "producthunt/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "producthunt/register.html")


def products(request, date):
    products = Product.objects.filter(date=date)
    products = products.order_by("-votes").all()
    if request.user.is_authenticated:
        voted_products = request.user.voted_products.all()
        return JsonResponse({'products': [product.serialize() for product in products], 'voted_products': [product.serialize() for product in voted_products]}, safe=False)
    else:
        return JsonResponse({'products': [product.serialize() for product in products], 'voted_products': None}, safe=False)


@csrf_exempt
def newproduct(request):
    data = json.loads(request.body)
    if data.get("name") == "" or data.get("description") == "" or data.get("logo") == "" or data.get("image1") == "" or data.get("link") == "":
        return JsonResponse({
            "error": "You are missing some required fields."
        })
    elif is_image_and_ready(data.get("logo")) and is_image_and_ready(data.get("image1")) and (data.get("image2") == "" or is_image_and_ready(data.get("image2"))) and (data.get("image3") == "" or is_image_and_ready(data.get("image3"))):
        product = Product(
            name=data.get("name"), description=data.get("description"), logo=data.get("logo"), image1=data.get("image1"), image2=data.get("image2"), image3=data.get("image3"), link=data.get("link"), founder=request.user
        )
        product.save()
        return JsonResponse({"message": "Product created sucessfully."})
    else:
         return JsonResponse({
            "error": "One or more of the provided image URLs is not valid. The URL should end with an image file extension and exist."
        })


def product(request, id):
    product = Product.objects.get(pk=id)
    return JsonResponse({'product': product.serialize()})


@csrf_exempt
def vote(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        product = Product.objects.get(pk=data.get("product_id"))
        user = User.objects.get(pk=request.user.id)
        product.votes.add(user)
        products = Product.objects.filter(date=data.get("date"))
        products = products.order_by("-votes").all()
        voted_products = user.voted_products.all()
        return JsonResponse({'products': [product.serialize() for product in products], 'voted_products': [product.serialize() for product in voted_products]}, safe=False)
    else:
        return JsonResponse({'error': "user not authenticated"})


@csrf_exempt
def unvote(request):
    data = json.loads(request.body)
    product = Product.objects.get(pk=data.get("product_id"))
    user = User.objects.get(pk=request.user.id)
    product.votes.remove(user)
    products = Product.objects.filter(date=data.get("date"))
    products = products.order_by("-votes").all()
    voted_products = user.voted_products.all()
    return JsonResponse({'products': [product.serialize() for product in products], 'voted_products': [product.serialize() for product in voted_products]}, safe=False)
