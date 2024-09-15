from fastapi import APIRouter, Depends, status, HTTPException, Response
from schema.projectSchema import ProjectCreate
from services.projectService import ProjectService
from dependencies.projectDepends import getProjectDepends
from dependencies.authDepends import checkAuthenDepends
from log.logger import logger
from models.projectModel import Project

router = APIRouter(
    prefix="/project",
    tags=["Project"],
    responses={404: {"description": "Not found"}})

@router.post('/create')
def createProject(project: ProjectCreate,
                  userInfo: str = Depends(checkAuthenDepends),
                  projectService: ProjectService = Depends(getProjectDepends)):
    try:
        projectInfo = projectService.createProject(project=project, userId=userInfo)
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
def getAllProjects(userInfo: str = Depends(checkAuthenDepends),
                projectService:ProjectService = Depends(getProjectDepends)):
    try:
        return projectService.getAllProjects(userId=userInfo)
    except HTTPException as httpError:
        logger.error(httpError)
        raise httpError
    except Exception as error:
        logger.error(error)
        return Response(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )

@router.delete('/{id}')
def deleteProject(id: str, userInfo: str = Depends(checkAuthenDepends),
                  projectService:ProjectService = Depends(getProjectDepends)):
    try:
        projectService.deleteProject(id=id)
        return Response(
            status_code=status.HTTP_204_NO_CONTENT,
        )
    except HTTPException as httpError:
        logger.error(httpError)
        raise httpError
    except Exception as error:
        logger.error(error)
        return Response(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )
