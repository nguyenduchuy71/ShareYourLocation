from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from auth.schema import TokenData
from db import database
from users.models import User
from log.logger import logger
from auth.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY, SESSION_COOKIE_NAME
from itsdangerous import URLSafeSerializer

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
    def getCurrentUser(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
        def verifyAccessToken(session, credentials_exception):
            try:
                token = serializer.loads(session)
                payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
                id: str = payload.get("user_id")
                if id is None:
                    raise credentials_exception
                return TokenData(id=str(id))
            except JWTError:
                raise credentials_exception
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
        session = request.cookies.get(SESSION_COOKIE_NAME)
        if not session:
            raise HTTPException(status_code=403, detail="Not authenticated")
        user_data = verifyAccessToken(session)
        if db.query(User).filter(User.id == user_data.id).first() is None:
            raise credentials_exception
        return user_data

    @staticmethod
    def createSession(data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return serializer.dumps({"token": encode_jwt})

    @staticmethod
    def verifySession(session):
        try:
            token = serializer.loads(session)
            logger.info('verifySession:', token)
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            id: str = payload.get("user_id")
            if id is None:
                raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
            return TokenData(id=str(id))
        except Exception:
            return None
