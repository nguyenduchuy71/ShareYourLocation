from fastapi import Depends, APIRouter, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from users.schema.user import User, UserCreate, UserUpdate
from log.logger import logger
from db.database import get_db
from auth.utils import AuthUtil
from users.controller import UserController
# from broker.producer_service import send_require_add_friend

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=User)
def createUser(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = UserController.getUserByEmail(db, email=user.email)
        if db_user:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Email already registered"}
            )
        return UserController.createUser(db=db, user=user)
    except Exception as error:
        logger.error(error)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )

@router.get("/", response_model=list[User])
def getAllUsers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        users = UserController.getAllUsers(db, skip=skip, limit=limit)
        return users
    except Exception as error:
        logger.error(error)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )

@router.get("/{user_id}", response_model=User)
def getUserById(user_id: int, db: Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        return current_user
    except Exception as error:
        logger.error(error)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )
