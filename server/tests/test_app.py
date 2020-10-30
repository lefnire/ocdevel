import pytest, pdb
import datetime as dt
import app.models as M
from app.config import settings
import xml.etree.ElementTree as ET
from uuid import uuid4

@pytest.fixture(scope='session')
def users(client, db):
    db.add(M.MLAUrl(id="patreon_feed", url=settings.patreon_feed))
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

    # ensure feed.xml present # TODO call this for fresh testing
    # client.get("/feed/download")
    for item in ET.parse("feed.xml").findall("channel/item"):
        guid = item.find("guid").text
        db.add(M.MLAUrl(id=guid, url=f"https://mla.ocdevel.com/feed/item/{guid}"))
    db.commit()

    return users

def test_feed(client, users):
    res = client.get("/feed/doesnt_exist")
    assert res.status_code == 422

    res = client.get(f"/feed/{str(uuid4())}")
    assert res.status_code == 401

    res = client.get(f"/feed/{users[0]['id']}")
    assert res.status_code == 200
    assert 'patreonusercontent' not in res.content.decode('utf-8')

    res = client.get(f"/feed/{users[1]['id']}")
    assert res.status_code == 401

    res = client.get(f"/feed/{users[2]['id']}")
    assert res.status_code == 200