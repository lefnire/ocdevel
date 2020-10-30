from sqlalchemy import text, String, Column, Integer, ForeignKey, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from .database import Base

# use this in explicit sql queries instead of "now()". SQLAlchemy models will handle
# it automatically via datetime.utcnow, but engine.execute("now()") will not be utc
utcnow = "TIMEZONE('utc', CURRENT_TIMESTAMP)"
# https://dev.to/zchtodd/sqlalchemy-cascading-deletes-8hk
parent_cascade = dict(cascade="all, delete", passive_deletes=True)
child_cascade = dict(ondelete="cascade")


# TODO should all date-cols be index=True? (eg sorting, filtering)
def DateCol(default=True, update=False):
    args = {}
    if default: args['server_default'] = text(utcnow)
    if update: args['onupdate'] = text(utcnow)
    return Column(TIMESTAMP(timezone=True), index=True, **args)


def IDCol():
    return Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v4()"))


def FKCol(fk, **kwargs):
    return Column(UUID(as_uuid=True), ForeignKey(fk, **child_cascade), **kwargs)


class MLASub(Base):
    __tablename__ = "mla_subs"
    id = IDCol()
    email = Column(String, unique=True, index=True)
    expires = Column(Integer, server_default="3")
    expire_start = DateCol()
    created_at = DateCol()
    updated_at = DateCol(update=True)


class MLAUrl(Base):
    __tablename__ = "mla_urls"
    id = IDCol()
    key = Column(String, unique=True, index=True)
    url = Column(String, nullable=False)
    created_at = DateCol()
    updated_at = DateCol(update=True)
