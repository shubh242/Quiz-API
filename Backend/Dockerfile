FROM python:3.13-slim

# Create app directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project
COPY . .

# Expose port 8000 for Django
EXPOSE 8000

# Run migrations & start the server
CMD ["python", "manage.py", "migrate", "--noinput"]
# Start the Django dev server (not recommended in production, but for demonstration):
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
