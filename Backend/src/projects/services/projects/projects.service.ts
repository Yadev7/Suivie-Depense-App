import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/typeorm/entities/Project';
import { CreateProjectParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {

    constructor(@InjectRepository(Project) private  projectRepository: Repository<Project>,) {}

    fetchProject(){
        return this.projectRepository.find();
    }

     createProject(ProjectDetails: CreateProjectParams){
        const newProject = this.projectRepository.create({ ...ProjectDetails });
        return this.projectRepository.save(newProject);
    }

    deleteProject(id:number) {
        return this.projectRepository.delete({ id })
    }

    updateProject(id:number, ProjectDetails: CreateProjectParams){
        return this.projectRepository.update({ id },{...ProjectDetails});
    }

    getProjetById(id:number){
        return this.projectRepository.findOneBy({ id });
    }

}
