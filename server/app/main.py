import re, requests, pdb
from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import models as M
from .database import SessionLocal, engine

engine.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
M.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()


@app.get("/feed/{uid}")
def feed_get(uid: str, db: Session = Depends(get_db)):
    user = db.query(M.MLASub).get(uid)
    if not user:
        return HTTPException(status_code=401, detail="Not authorized")
    feed = db.query(M.MLAUrl).filter_by(key='patreon_feed').first()
    # xml = requests.get(feed.url).json()
    with open("./tests/feed.xml", "r") as f:
        xml = f.read()
    pdb.set_trace()
    # images
    xml = re.sub(r'http.*patreonusercontent.*\/(.*\.(jpg|mp3))\?token.*(?!($|\s|"|<))', r"\1", xml)
    # mp3s
    xml = re.sub(r"", xml, "$1")
    return xml