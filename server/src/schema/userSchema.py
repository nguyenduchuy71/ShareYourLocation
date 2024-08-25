from pydantic import BaseModel
from typing import Optional

class UserSchema(BaseModel):
    id: str
    email: str
    username: str
    avatar: str
    
    class Config:
        from_attributes = True
