from fastapi import APIRouter, Depends, status, Request, HTTPException, Response
from sqlalchemy.orm import Session
from models.userModel import User
from auth.utils import AuthUtil
from schema.authSchema import Auth
from services.authService import AuthService
from dependencies.authDepends import AuthenDepens
from log.logger import logger
from auth.config import SESSION_COOKIE_NAME

router = APIRouter(tags=['Authentication'])

@router.post('/login')
def signIn(response: Response, userCredentials: Auth, authService: AuthService = Depends(AuthenDepens.getAuthDepends)):
    try:
        res = authService.signIn(userCredentials)
        if 'id' not in res:
            raise HTTPException(status_code=400, detail=res['message'])
        userInfo = {"userId": res['id']}
        session = AuthUtil.createSession(data=userInfo)
        response.set_cookie(key=SESSION_COOKIE_NAME, value=session, httponly=True)
        return userInfo
    except HTTPException as httpError:
        logger.error(httpError)
        raise httpError
    except Exception as error:
        logger.error(error)
        return Response(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )

@router.post('/signup')
def signUp(response: Response, userCredentials: Auth, authService: AuthService = Depends(AuthenDepens.getAuthDepends)):
    try:
        res = authService.signUp(userCredentials)
        if 'id' not in res:
            raise HTTPException(status_code=400, detail=res['message'])
        userInfo = {"userId": res['id']}
        session = AuthUtil.createSession(data=userInfo)
        response.set_cookie(key=SESSION_COOKIE_NAME, value=session, httponly=True)
        return userInfo
    except HTTPException as httpError:
        logger.error(httpError)
        raise httpError
    except Exception as error:
        logger.error(error)
        return Response(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )

@router.get("/session")
async def getSession(request: Request):
    try:
        session = request.cookies.get(SESSION_COOKIE_NAME)
        if not session:
            raise HTTPException(status_code=401, detail="Not authenticated")
        userId = AuthUtil.verifySession(session)
        if not userId:
            raise HTTPException(status_code=403, detail="Invalid session")
        return {"userId": userId}
    except HTTPException as httpError:
        logger.error(httpError)
        raise httpError
    except Exception as error:
        logger.error(error)
        return Response(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(SESSION_COOKIE_NAME)
    return {"message": "Logged out!"}
