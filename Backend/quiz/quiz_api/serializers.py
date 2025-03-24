from rest_framework import serializers
from .models import Quiz, Question
from django.contrib.auth.models import User

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ['id', 'quizId','question', 'option1', 'option2', 'option3', 'option4', 'correctOption']

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, data):
        user = User.objects.create_user(
            username=data['username'],
            email = data.get('email', ''),
            password = data['password']
        )

        return user