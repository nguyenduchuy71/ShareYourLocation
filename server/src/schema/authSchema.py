from pydantic import BaseModel
from typing import Optional

class Auth(BaseModel):
    email: str
    password: str
