from pydantic import BaseModel


class UserSchema(BaseModel):
    id: str
    email: str
    username: str
    avatar: str
    
    class Config:
        from_attributes = True
