import datetime
from sqlalchemy import Boolean, Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from db.database import Base
from common.helper import Helper

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(Helper.generate_uuid()))
    email = Column(String, unique=True, index=True)
    hashedPassword = Column(String)
    username = Column(String, index=True, default="")
    avatar = Column(String, default="https://github.com/shadcn.png")
    createdTime = Column(DateTime, default=datetime.datetime.utcnow)
    role = Column(String, default="user")
    projects = relationship("Project", back_populates="user")
