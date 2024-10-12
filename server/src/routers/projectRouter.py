from fastapi import APIRouter, Depends, status, HTTPException, Response

from dependencies.authDepends import AuthenDepens
from dependencies.projectDepends import getProjectDepends
from log.logger import logger
from schema.projectSchema import ProjectCreate, ProjectJoin
from services.projectService import ProjectService

router = APIRouter(
    prefix="/project",
    tags=["Project"],
    responses={404: {"description": "Not found"}})

@router.post('/create')
async def createProject(project: ProjectCreate,
                  userInfo: str = Depends(AuthenDepens.checkAuthenDepends),
                  projectService: ProjectService = Depends(getProjectDepends)):
    try:
        projectInfo = await projectService.createProject(project=project, userId=userInfo)
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
async def getAllProjects(userInfo: str = Depends(AuthenDepens.checkAuthenDepends),
                projectService:ProjectService = Depends(getProjectDepends)):
    try:
        return await projectService.getAllProjects(userId=userInfo)
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
async def deleteProject(id: str, userInfo: str = Depends(AuthenDepens.checkAuthenDepends),
                  projectService:ProjectService = Depends(getProjectDepends)):
    try:
        await projectService.deleteProject(id=id)
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

@router.post('/join')
def joinProject(project: ProjectJoin, userInfo: 
                str = Depends(AuthenDepens.checkAuthenDepends),
                projectService:ProjectService = Depends(getProjectDepends)):
    try:
        projectQuery = projectService.joinProject(project=project)
        if projectQuery is None:
            raise HTTPException(status_code=404, detail=f"Student with id = {project.id} does not exist.")
        return Response(
            status_code=status.status.HTTP_200_OK,
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
