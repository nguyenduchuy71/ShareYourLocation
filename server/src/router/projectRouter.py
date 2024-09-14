from fastapi import APIRouter, Depends, status, Request, HTTPException, Response
from auth.utils import AuthUtil
from schema.projectSchema import ProjectSchema
from services.projectService import ProjectService
from dependencies.projectDepends import getProjectDepends
from log.logger import logger
from auth.config import SESSION_COOKIE_NAME
from models.projectModel import Project

router = APIRouter(
    prefix="/project",
    tags=["Project"],
    responses={404: {"description": "Not found"}})

@router.post('/create')
def createProject(request: Request, project: ProjectSchema, projectService:ProjectService = Depends(getProjectDepends)):
    try:
        session = request.cookies.get(SESSION_COOKIE_NAME)
        if not session:
            raise HTTPException(status_code=401, detail="Not authenticated")
        userId = AuthUtil.verifySession(session)
        if not userId:
            raise HTTPException(status_code=403, detail="Invalid session")
        projectInfo = projectService.createProject(project=project, userId=userId)
        return projectInfo
    except HTTPException as httpError:
        logger.error(httpError)
        raise httpError
    except Exception as error:
        logger.error(error)
        return Response(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )

@router.get('/')
def getAllProjects(request: Request, projectService:ProjectService = Depends(getProjectDepends)):
    try:
        session = request.cookies.get(SESSION_COOKIE_NAME)
        if not session:
            raise HTTPException(status_code=401, detail="Not authenticated")
        userId = AuthUtil.verifySession(session)
        logger.info(f'userId: {userId}')
        if not userId:
            raise HTTPException(status_code=403, detail="Invalid session")
        listProject = projectService.getAllProjects(userId=userId)
        return listProject
    except HTTPException as httpError:
        logger.error(httpError)
        raise httpError
    except Exception as error:
        logger.error(error)
        return Response(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )
