FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8
RUN apt-get update -y && apt-get install -y wget
RUN pip install --no-cache \
    sqlalchemy \
    sqlalchemy_utils \
    # mutagen \
    psycopg2-binary \
    requests \
    python-box \
    pytest \
    dynaconf \
    fastapi-sqlalchemy \
    psycopg2-binary \
    fastapi-jwt-auth

COPY ./server/app /app/app
WORKDIR /app

EXPOSE 80
EXPOSE 443
