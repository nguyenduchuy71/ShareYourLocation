from fastapi import Depends
from sqlalchemy.orm import Session

from db.database import get_db
from repositories.projectRepository import ProjectRepository
from services.projectService import ProjectService


def getProjectDepends(dbSession: Session = Depends(get_db)):
    projectRepo = ProjectRepository(dbSession)
    return ProjectService(projectRepo)
