from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from .views import QuizAPIView, QuestionAPIVIew

# router = DefaultRouter()
# router.register(r'quizzes', QuizAPIView.as_view(), basename='quiz')
# router.register(r'questions', QuestionAPIVIew.as_view(), basename='question')

urlpatterns = [
    path('quizzes/', QuizAPIView.as_view()),
    path('questions/', QuestionAPIVIew.as_view())
]