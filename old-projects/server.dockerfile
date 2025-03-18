FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8
RUN apt-get update -y && apt-get install -y wget
RUN pip install \
    sqlalchemy==1.4.20 \
    sqlalchemy_utils \
    # mutagen \
    psycopg2-binary \
    requests \
    python-box \
    pytest \
    dynaconf

COPY ./server/app /app/app
WORKDIR /app

EXPOSE 80
EXPOSE 443
