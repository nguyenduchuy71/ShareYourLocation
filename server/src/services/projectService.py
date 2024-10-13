import json
from typing import Any

from models.projectModel import Project
from repositories.projectRepository import ProjectRepository
from schema.projectSchema import ProjectInfo, ProjectCreate, ProjectJoin


class ProjectService:
    def __init__(self, projectRepo: ProjectRepository):
        self.projectRepo = projectRepo
    
    async def createProject(self, project: ProjectCreate, userId:str) -> Project:
        newProject = Project(name=project.name, description=project.description, code=project.code, userId=userId)
        return json.loads(ProjectInfo.from_orm(await self.projectRepo.save(newProject)).json())

    async def getAllProjects(self, userId:str):
        listProject = await self.projectRepo.getAllProjects(userId)
        return [json.loads(ProjectInfo.from_orm(project).json()) for project in listProject]

    async def deleteProject(self, id: str):
        await self.projectRepo.deleteProject(id)

    def joinProject(self, project: ProjectJoin):
        return self.projectRepo.joinProject(project=project)
