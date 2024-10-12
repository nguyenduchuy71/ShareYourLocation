from sqlalchemy.orm import Session

from models.userModel import User


class UserRepository:
    def __init__(self, dbSession: Session):
        self.dbSession = dbSession
    
    def save(self, user:User) -> User:
        self.dbSession.add(user)
        self.dbSession.commit()
        self.dbSession.refresh(user)
        return user

    def getUserByEmail(self, email: str) -> User:
        return self.dbSession.query(User).filter(User.email == email).first()

    def getAll(self) -> list[User]:
        return self.dbSession.query(User).all()
