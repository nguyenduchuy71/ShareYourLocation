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
