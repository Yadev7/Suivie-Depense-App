import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from 'src/projects/dtos/CreateProject.dto';
import { ProjectService } from 'src/projects/services/projects/projects.service';

@Controller('projects')
export class ProjectsController {

    constructor(private readonly ProjectService: ProjectService) { }

    @Get()
    getProject() {
        return this.ProjectService.fetchProject()
    }

    @Get(':id')
    getProjectById(@Param('id', ParseIntPipe) id:number){
        return this.ProjectService.getProjetById(id)
    }

    @Post()
      async createProject(@Body() createProjectDto: CreateProjectDto) {
       await this.ProjectService.createProject(createProjectDto)
        return await this.getProject()
    }

    

    @Delete(':id')
    async deleteProjectById(@Param('id', ParseIntPipe) id:number){
        await this.ProjectService.deleteProject(id)
    }


    @Put(':id')
    async updateProjectById(
        @Param('id', ParseIntPipe) id:number,
        @Body() createProjectDto: CreateProjectDto,){
        await this.ProjectService.updateProject(id, createProjectDto)
        return this.getProject()
    }

}
