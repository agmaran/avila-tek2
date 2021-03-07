from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_founder = models.BooleanField(default=False)
    is_voter = models.BooleanField(default=False)


class Product(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=100)
    logo = models.URLField()
    image1 = models.URLField()
    image2 = models.URLField()
    image3 = models.URLField()
    link = models.URLField()
    date = models.DateField(auto_now_add=True)
    founder = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="my_products", null=True)
    votes = models.ManyToManyField(User, related_name="voted_products")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "logo": self.logo,
            "image1": self.image1,
            "image2": self.image2,
            "image3": self.image3,
            "link": self.link,
            "votes": len(self.votes.all())
        }
