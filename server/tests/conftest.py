import app.database as D
from app.config import settings

from sqlalchemy_utils import database_exists, drop_database, create_database
if database_exists(settings.db_url):
    drop_database(settings.db_url)
create_database(settings.db_url)

import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture(scope='session')
def client():
    with TestClient(app) as c:
        yield c

@pytest.fixture(scope='session')
def db():
    with D.session() as sess:
        yield sess