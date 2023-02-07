FROM python:3.10.9-alpine3.17

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY ./requirements/base.txt .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r base.txt

COPY . /app

CMD ["python", "src/main.py"]
