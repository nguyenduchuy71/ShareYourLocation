import datetime
from sqlalchemy import Boolean, Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from db.database import Base
from common.helper import Helper

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=lambda: str(Helper.generate_uuid()))
    name = Column(String)
    description = Column(String, default="")
    code = Column(String, default="")
    createdTime = Column(DateTime, default=datetime.datetime.utcnow)

    userId = Column(String, ForeignKey("users.id"), index=True)
    user = relationship("User", back_populates="projects")
