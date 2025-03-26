# FROM python:3.13-slim

# # Create app directory
# WORKDIR /app

# # Install dependencies
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the project
# COPY . .

# # Expose port 8000 for Django
# EXPOSE 8000

# # Run migrations & start the server
# CMD ["python", "manage.py", "migrate", "--noinput"]
# # Start the Django dev server (not recommended in production, but for demonstration):
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Use an official Python runtime as the base image
FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the Django settings module
ENV DJANGO_SETTINGS_MODULE=quiz.settings

# Create app directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files into the container
COPY . .

# Expose port 8000 for Gunicorn
EXPOSE 8000

# Run database migrations during container startup
# CMD ["python", "manage.py", "migrate", "--noinput"]

WORKDIR /app/quiz

# Start Gunicorn WSGI server with correct module path
CMD ["gunicorn", "quiz.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]