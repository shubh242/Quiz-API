from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

class APITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_home_endpoint(self):
        """Test if the API root endpoint is accessible."""
        url = reverse("http://127.0.0.1:8000/")  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_quiz_list(self):
        """Test if the quiz list API returns a response."""
        url = reverse("http://127.0.0.1:8000/quiz/quizzes/")  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)