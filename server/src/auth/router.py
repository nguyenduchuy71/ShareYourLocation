from fastapi import APIRouter, Depends, status, Request, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from db.database import get_db
from auth.schema import Token
from users.schema import user
from users.models import User
from users.controller import UserController
from auth.utils import AuthUtil
from log.logger import logger
from auth.config import SESSION_COOKIE_NAME

router = APIRouter(tags=['Authentication'])

@router.post('/login')
def login(response: JSONResponse, user_credentials: user.UserLogin, db: Session = Depends(get_db)):
    try:
        user_info = db.query(User).filter(User.email == user_credentials.email).first()
        if not user_info:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Email incorrect"}
            )
        if not AuthUtil.verify(user_credentials.password, user_info.hashedPassword):
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Password incorrect"}
            )
        # access_token = AuthUtil.createAccessToken(data={"user_id": user_info.id})
        session = AuthUtil.createSession(data={"user_id": user_info.id})
        logger.info(f'login> {session}')
        response.set_cookie(SESSION_COOKIE_NAME, session, httponly=True, samesite="strict")
        return Token(token='', userId=user_info.id, token_type="Bearer")
    except Exception as error:
        logger.error(error)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )

@router.post('/signup')
def signup(response: JSONResponse, user_credentials:user.UserCreate, db:Session = Depends(get_db)):
    try:
        userInfo = db.query(User).filter(User.email == user_credentials.email).first()
        if userInfo:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Email already registered"}
            )
        userInfo = UserController.createUser(db, user=user_credentials)
        # access_token = AuthUtil.createAccessToken(data={"user_id": userInfo.id})
        session = AuthUtil.createSession(data={"user_id": userInfo.id})
        response.set_cookie(SESSION_COOKIE_NAME, session, httponly=True, samesite="strict")
        return Token(token='', userId=userInfo.id, token_type="Bearer")
    except Exception as error:
        logger.error(error)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )

@router.get("/session")
async def get_session(request: Request):
    session = request.cookies.get(SESSION_COOKIE_NAME)
    logger.info(f'session: {request.cookies}')
    if not session:
        raise HTTPException(status_code=403, detail="Not authenticated")
    user_data = AuthUtil.verifySession(session)
    logger.info(f'session > user: {user_data}')
    if not user_data:
        raise HTTPException(status_code=403, detail="Invalid session")
    return {"user_id": user_data["user_id"]}

@router.get("/logout")
async def logout(response: JSONResponse):
    response.delete_cookie(SESSION_COOKIE_NAME)
    return {"message": "Logged out!"}
