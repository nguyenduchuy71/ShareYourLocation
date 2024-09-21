from pydantic import BaseModel
from typing import Optional, Any

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

class ProjectJoin(ProjectSchema):
    id: str
    code: str
