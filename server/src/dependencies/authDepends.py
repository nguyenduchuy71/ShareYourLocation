from fastapi import Depends
from sqlalchemy.orm import Session
from db.database import get_db
from repositories.userRepository import UserRepository
from services.authService import AuthService

def getAuthDepends(dbSession: Session = Depends(get_db)):
    userRepo = UserRepository(dbSession)
    return AuthService(userRepo)
