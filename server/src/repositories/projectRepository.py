from typing import Any

from fastapi_cache import FastAPICache
from fastapi_cache.decorator import cache
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from models.projectModel import Project
from .config import EXPIRE


class ProjectRepository:
    def __init__(self, dbSession: Session):
        self.dbSession = dbSession
    
    async def save(self, project: Project) -> Project:
        try:
            self.dbSession.add(project)
            self.dbSession.commit()
            self.dbSession.refresh(project)
            # Invalidate cache after saving a new project
            await FastAPICache.clear(namespace="project")
            return project
        except SQLAlchemyError as e:
            self.dbSession.rollback()
            raise e

    @cache(expire=EXPIRE, namespace="project")
    def getProjectById(self, id: str) -> Project:
        return self.dbSession.query(Project).filter(Project.id == id).first()

    @cache(expire=EXPIRE, namespace="project")
    def getAllProjects(self, userId: str, limit: int = 10, offset: int = 0):
        return self.dbSession.query(Project).filter(Project.userId == userId).limit(limit).offset(offset).all()

    async def deleteProject(self, id: str) -> int:
        rows_deleted = self.dbSession.query(Project).filter(Project.id == id).delete()
        self.dbSession.commit()
        # Invalidate cache after deleting a project
        await FastAPICache.clear(namespace="project")
        return rows_deleted

    def joinProject(self, project: Any) -> Project:
        return self.dbSession.query(Project).filter(Project.id == project.id).filter(Project.code == project.code).first()
