import json
from fastapi import status
from models.userModel import User
from repositories.userRepository import UserRepository
from schema.authSchema import Auth
from schema.userSchema import UserSchema
from auth.utils import AuthUtil

class AuthService:
    def __init__(self, userRepo: UserRepository):
        self.userRepo = userRepo
    
    def signIn(self, userInfo: Auth):
        user = self.userRepo.getUserByEmail(userInfo.email)
        if not user:
            return {"message": f"User {userInfo.email} not found"}
        if not AuthUtil.verify(userInfo.password, user.hashedPassword):
            return {"message": f"Password incorrect"}
        return json.loads(UserSchema.from_orm(user).json())

    def signUp(self, userInfo: Auth):
        user = self.userRepo.getUserByEmail(userInfo.email)
        if user:
            return {"message": "Email is existed"}
        hashedPassword = AuthUtil.handleHashPassWord(userInfo.password)
        newUser = User(username=userInfo.email, email=userInfo.email, hashedPassword=hashedPassword)
        return json.loads(UserSchema.from_orm(self.userRepo.save(newUser)).json())
