import requests
from database import session
from sqlalchemy import text
from typing import Union
from pydantic import UUID4
import boto3
import hashlib

DEBUG = is_dev()
def ga(uid: Union[str, UUID4], category: str, action: str):
    uid_ = str(uid).encode()  # to bytes
    uid_ = hashlib.sha256(uid_).hexdigest()
    url = "https://ssl.google-analytics.com/"
    url += "debug/collect" if DEBUG else "collect"
    res = requests.post(url, params=dict(
        v=1,
        tid=vars.GA,
        cid=uid_,
        t='event',
        ec=category,
        ea=action
    ))
    # if DEBUG: print(res.json())

    if action in ('register', 'like', 'dislike', 'therapist', 'notes'):
        with session() as sess:
            if sess.execute(text("""
            select is_superuser su from users where id=:uid
            """), dict(uid=uid)).fetchone().su:
                # don't notify of my own or Lisa's entries
                return
        send_mail('tylerrenelle@gmail.com', 'action', dict(category=category, action=action))

url = "http://localhost:3002" if is_dev() else "https://gnothiai.com"
def send_mail(email, type, data):
    if is_dev(): return
    if type == 'forgot-password':
        subject = "Gnothi reset password"
        body = f"Click this link to reset your password: {url}/reset-password?token={data}"
    elif type == 'welcome':
        subject = "Welcome to Gnothi"
        body = f"Thank you for registering a Gnothi account! Start journaling away."
    elif type == 'action':
        subject = f"Gnothi: {data['category']}/{data['action']}"
        body = subject
    else: return

    ses = boto3.client('ses')
    ses.send_email(
        Source=vars.EMAIL_SES_EMAIL_SOURCE,
        Destination={'ToAddresses': [email]},
        Message={
            'Subject': {'Data': subject},
            'Body': {
                'Text': {'Data': body}
            }
        }
    )
