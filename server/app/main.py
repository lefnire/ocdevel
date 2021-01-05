import re, requests, pdb, os
from typing import List
from pydantic import UUID4
from fastapi import Depends, FastAPI, HTTPException, Response
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import xml.etree.ElementTree as ET

from . import models as M
from .database import SessionLocal, engine

engine.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
M.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()


@app.get("/health")
def health_get():
    return {"ok": True}


@app.get("/mla/download")
def feed_download(db: Session = Depends(get_db)):
    feed = db.query(M.MLAUrl).get('patreon_feed')
    res = requests.get(feed.url)
    with open("feed.xml", "wb") as f:
        f.write(res.content)

@app.get("/mla/{uid}")
def feed_get(uid: UUID4, db: Session = Depends(get_db)):
    sub = M.MLASub.get_sub(uid, db)
    if not sub:
        raise HTTPException(status_code=401, detail="Not authorized")

    if not os.path.exists("feed.xml"):
        feed_download(db)
        
    root = ET.parse("feed.xml").getroot()
    channel = root.find("./channel")
    itunes = "{http://www.itunes.com/dtds/podcast-1.0.dtd}"
    img = "https://ssl-static.libsyn.com/p/assets/c/0/d/4/c0d48476e148c6e1/width_400_art.jpg"
    channel.find(f"{itunes}image").set("href", img)
    channel.find("image/url").text = img
    for item in channel.findall('item'):
        item_id = item.find("guid").text
        url = f"https://api.ocdevel.com/mla/{uid}/{item_id}"
        item.find("enclosure").set("url", url)
    xml = ET.tostring(root, encoding='utf8', method='xml')
    return Response(content=xml, media_type="application/xml")

@app.get("/mla/{uid}/{guid}")
def feed_get(uid: UUID4, guid: str, db: Session = Depends(get_db)):
    sub = M.MLASub.get_sub(uid, db)
    if not sub:
        raise HTTPException(status_code=401, detail="Not authorized")

    url = db.query(M.MLAUrl.url).filter_by(id=guid).scalar()
    return RedirectResponse(url)

