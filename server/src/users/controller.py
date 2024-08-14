from sqlalchemy.orm import Session
from users.schema import user
from auth.utils import AuthUtil
from users.models import User

class UserController:
    
    @staticmethod
    def getUserByEmail(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def getUserById(db: Session, user_id: str):
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def getAllUsers(db: Session, skip: int = 0, limit: int = 100, user_id=None):
        return db.query(User).filter(User.id != user_id).offset(skip).limit(limit).all()

    @staticmethod
    def createUser(db: Session, user: user.UserCreate):
        hashed_password = AuthUtil.handleHashPassWord(user.password)
        newUser = User(email=user.email, hashedPassword=hashed_password, username=user.email)
        db.add(newUser)
        db.commit()
        db.refresh(newUser)
        return newUser
