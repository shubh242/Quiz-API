FROM python:3.13-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/

WORKDIR /app/quiz

EXPOSE 8000

CMD ["python", "manage.py", "runserver"]