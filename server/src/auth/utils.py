from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from db import database
from models.userModel import User
from log.logger import logger
from auth.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY, SESSION_COOKIE_NAME
from itsdangerous import URLSafeSerializer
from auth.exception import AuthException
from jose.exceptions import ExpiredSignatureError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
serializer = URLSafeSerializer(SECRET_KEY)

class AuthUtil:
    @staticmethod
    def handleHashPassWord(password: str):
        return pwd_context.hash(password)

    @staticmethod
    def verify(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def createAccessToken(data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encode_jwt

    @staticmethod
    def createSession(data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encode_jwt

    @staticmethod
    def verifySession(session) -> str:
        try:
            payload = jwt.decode(session, SECRET_KEY, algorithms=[ALGORITHM])
            userId = payload.get("userId")
            if userId is None:
                raise AuthException.credentialException()
            return userId
        except ExpiredSignatureError:
            raise ExpiredSignatureError
        except JWTError:
            raise HTTPException(
                status_code=403, detail="Invalid token or token is expired"
            )
        except Exception as error:
            raise error
