from pydantic import BaseModel

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    username: str
    avatar: str

class User(UserBase):
    id: str
    username: str
    avatar: str

    class Config:
        from_attributes = True

class UserLogin(UserBase):
    password: str
