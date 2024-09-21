from typing import Any
from sqlalchemy.orm import Session
from models.projectModel import Project

class ProjectRepository:
    def __init__(self, dbSession: Session):
        self.dbSession = dbSession
    
    def save(self, project: Project) -> Project:
        self.dbSession.add(project)
        self.dbSession.commit()
        self.dbSession.refresh(project)
        return project

    def getProjectById(self, id: str) -> Project:
        return self.dbSession.query(Project).filter(Project.id == id).first()

    def getAllProjects(self, userId: str):
        return self.dbSession.query(Project).filter(Project.userId == userId).all()

    def deleteProject(self, id: str):
        self.dbSession.query(Project).filter(Project.id == id).delete()
        return self.dbSession.commit()

    def joinProject(self, project: Any):
        return self.dbSession.query(Project).filter(Project.id == project.id).filter(Project.code == project.code).first()
