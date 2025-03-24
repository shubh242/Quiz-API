from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Quiz(models.Model):
    title = models.CharField(max_length=255) 
    description = models.CharField(max_length=255, blank=True) 
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Question(models.Model):
    quizId = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    option1 = models.CharField(max_length=255)
    option2 = models.CharField(max_length=255)
    option3 = models.CharField(max_length=255)
    option4 = models.CharField(max_length=255)
    correctOption = models.CharField(max_length=255)

    def __str__(self):
        return self.question
