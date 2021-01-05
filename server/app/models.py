import datetime as dt
from sqlalchemy import text, String, Unicode, Column, Integer, ForeignKey, TIMESTAMP, or_, and_
from sqlalchemy.dialects.postgresql import UUID
from .database import Base


# https://dev.to/zchtodd/sqlalchemy-cascading-deletes-8hk
parent_cascade = dict(cascade="all, delete", passive_deletes=True)
child_cascade = dict(ondelete="cascade")


# TODO should all date-cols be index=True? (eg sorting, filtering)
def DateCol(default=True, update=False):
    args = {}
    if default: args['server_default'] = text("now()")
    if update: args['onupdate'] = text("now()")
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

    @staticmethod
    def get_sub(uid, db):
        return db.execute(text("""
        select * from mla_subs m
        where m.id=:uid and ( 
            m.expires=0 or m.expires is null
            or m.expire_start > now() - interval '1 month' * m.expires)    
        """), dict(uid=uid)).fetchone()


class MLAUrl(Base):
    __tablename__ = "mla_urls"
    id = Column(String, primary_key=True)
    url = Column(String, nullable=False)
    created_at = DateCol()
    updated_at = DateCol(update=True)


### MLG Resources

class Filter(Base):
    __tablename__ = "filters"
    name = Column(Unicode, nullable=False)
    description = Column(Unicode)
    # don't cascade-delete
    default_opt = Column(UUID(as_uuid=True), ForeignKey("filter_opts"))


class FilterOpt(Base):
    __tablename__ = "filter_opts"
    filter_id = FKCol("filters")
    name = Column(Unicode, nullable=False)
    description = column(Unicode)
    icon = Column(Unicode)


class Resource(Base):
    __tablename__ = "resources"
    id = IDCol()
    created_at = DateCol()
    updated_at = DateCol(update=True)
