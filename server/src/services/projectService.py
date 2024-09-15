import json
from typing import Any
from fastapi import status
from repositories.projectRepository import ProjectRepository
from models.projectModel import Project
from schema.projectSchema import ProjectSchema, ProjectInfo, ProjectCreate
from auth.utils import AuthUtil
from log.logger import logger

class ProjectService:
    def __init__(self, projectRepo: ProjectRepository):
        self.projectRepo = projectRepo
    
    def createProject(self, project: ProjectCreate, userId:str) -> Project:
        newProject = Project(name=project.name, description=project.description, code=project.code, userId=userId)
        return json.loads(ProjectSchema.from_orm(self.projectRepo.save(newProject)).json())

    def getAllProjects(self, userId:str):
        listProject = self.projectRepo.getAllProjects(userId)
        return [json.loads(ProjectInfo.from_orm(project).json()) for project in listProject]

    def deleteProject(self, id: str):
        self.projectRepo.deleteProject(id)
