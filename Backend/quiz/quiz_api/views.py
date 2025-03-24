from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Quiz, Question
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import QuizSerializer, QuestionSerializer, RegisterUserSerializer

# Create your views here.

class QuizAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        quiz_id = request.GET.get('quizId')
        print("Quiz ID:", quiz_id)
        if not quiz_id:
            quizzes = Quiz.objects.all()
            quiz_data = QuizSerializer(quizzes, many=True)
            return Response(quiz_data.data, status=status.HTTP_200_OK)
        else:
            quizzes = Quiz.objects.get(id=quiz_id)
            questions = Question.objects.filter(quizId = quiz_id)
            quiz_data = QuizSerializer(quizzes).data
            quiz_data["questions"] = QuestionSerializer(questions, many=True).data
        
        return Response(quiz_data, status=status.HTTP_200_OK)
        
    
    def post(self, request):
        print(request)
        data = {
            'title' : request.data.get('title'),
            'description' : request.data.get('description'),
            'createdBy' : request.user.id
        }

        serializer = QuizSerializer(data = data, partial = True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):

        quiz_instance = Quiz.objects.get(id = request.data.get('id'), createdBy = request.user.id)

        if not quiz_instance:
            return Response(
                {'res' : 'Quiz with {0} quiz Id does not exist!!'.format(request.data.get('id'))},
                status.HTTP_400_BAD_REQUEST
            )

        data = {
            'title': request.data.get('title'),
            'createdBy': request.user.id
        }

        serializer = QuizSerializer(quiz_instance, data = data, partial = True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        quiz_instance = Quiz.objects.get(id = request.data.get('id'))

        if not quiz_instance:
            return Response(
                {'res' : 'Quiz with {0} ID does not exist!!'.format(request.data.get('id'))},
                status.HTTP_400_BAD_REQUEST
            )
        
        quiz_instance.delete()
        return Response({'res' : 'Quiz Deleted!!'}, status=status.HTTP_200_OK)

class QuestionAPIVIew(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        question_id = request.GET.get('question_id')
        print(question_id)
        questions = Question.objects.filter(id = question_id)
        serializer = QuestionSerializer(questions, many = True)
        # print(questions.question_id)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def post(self, request):
        data = {
            'quizId' : request.data.get('quizId'),
            'question': request.data.get('question'),
            'option1' : request.data.get('option1'),
            'option2' : request.data.get('option2'),
            'option3' : request.data.get('option3'),
            'option4' : request.data.get('option4'),
            'correctOption' : request.data.get('correctOption'),
        }

        serializer = QuestionSerializer(data = data, partial = True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        print("Request Data:", request.data)  # Debugging
        print("From request.data:", request.data.get('questionId'))
        print("From request.GET:", request.GET.get('questionId'))

        # Get questionId from request body or query parameter
        question_id = request.data.get('questionId') or request.GET.get('questionId')

        if not question_id:
            return Response({"error": "questionId is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            questions_instance = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response(
                {'error': f'Question with ID {question_id} does not exist!'},
                status=status.HTTP_404_NOT_FOUND
            )

        data = {
            'quizId': request.data.get('quizId'),
            'question': request.data.get('question'),
            'option1': request.data.get('option1'),
            'option2': request.data.get('option2'),
            'option3': request.data.get('option3'),
            'option4': request.data.get('option4'),
            'correctOption': request.data.get('correctOption'),
        }

        serializer = QuestionSerializer(questions_instance, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        print("Serializer Errors:", serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request):
        question_id = request.GET.get("question_id")  # Extract from query parameters
        if not question_id:
            return Response({"error": "question_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            question = Question.objects.get(id=question_id)
            question.delete()
            return Response({"message": "Question deleted successfully"}, status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class RegisterUserView(APIView):
    def post(self, request):
        serializer = RegisterUserSerializer(data = request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User created successfully",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_200_OK)