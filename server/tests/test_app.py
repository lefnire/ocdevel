import pytest
import datetime as dt
import app.models as M
from app.config import settings

@pytest.fixture(scope='session')
def users(db):
    db.add(M.MLAUrl(key="patreon_feed", url=settings.patreon_feed))
    db.commit()
    users = [
        dict(email='new@expires.com', expires=3, expire_start=dt.datetime.now() - dt.timedelta(days=20)),
        dict(email='old@expires.com', expires=3, expire_start=dt.datetime.now() - dt.timedelta(days=120)),
        dict(email='x@permanent.com', expires=0, expire_start=dt.datetime.now() - dt.timedelta(days=360))
    ]
    for u in users:
        u_ = M.MLASub(**u)
        db.add(u_)
        db.commit()
        db.refresh(u_)
        u['id'] = u_.id
    return users

def test_feed(client, users):
    res = client.get(f"/feed/{users[0]['id']}")
    assert res.status_code == 200

    res = client.get(f"/feed/{users[1]['id']}")
    assert res.status_code == 401

    res = client.get(f"/feed/{users[2]['id']}")
    assert res.status_code == 200