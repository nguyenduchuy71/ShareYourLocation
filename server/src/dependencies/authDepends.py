from fastapi import Depends, Request, HTTPException
from sqlalchemy.orm import Session

from auth.config import SESSION_COOKIE_NAME
from auth.exception import AuthException
from auth.utils import AuthUtil
from db.database import get_db
from models.userModel import User
from repositories.userRepository import UserRepository
from services.authService import AuthService


class AuthenDepens:
    @staticmethod
    def getAuthDepends(dbSession: Session = Depends(get_db)):
        userRepo = UserRepository(dbSession)
        return AuthService(userRepo)

    @staticmethod
    def checkAuthenDepends(request: Request, dbSession: Session = Depends(get_db)):
        session = request.cookies.get(SESSION_COOKIE_NAME)
        if not session:
            raise HTTPException(status_code=401, detail="Not authenticated")
        userId = AuthUtil.verifySession(session)
        if not userId:
            raise HTTPException(status_code=403, detail="Invalid session")
        if dbSession.query(User).filter(User.id == userId).first() is None:
                raise AuthException.credentialException()
        return userId
