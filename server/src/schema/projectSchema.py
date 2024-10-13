from typing import Any

from pydantic import BaseModel


class ProjectSchema(BaseModel):
    name: str
    description: str
    
    class Config:
        from_attributes = True

class ProjectInfo(ProjectSchema):
    id: str
    userId: str
    createdTime: Any

class ProjectCreate(ProjectSchema):
    code: str

class ProjectJoin(BaseModel):
    id: str
    code: str
