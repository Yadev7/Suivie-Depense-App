import { Injectable, Query, UploadedFile } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Depense } from 'src/typeorm/entities/Depense';
import { CreateDepenseParams } from 'src/utils/types';

@Injectable()
export class DepensesService {

    constructor(@InjectRepository(Depense) private  depenseRepository: Repository<Depense>,) {}

    fetchDepense(){
        return this.depenseRepository.find();
    }

    createDepense(DepensesDetails: CreateDepenseParams){
        const newProject = this.depenseRepository.create({ ...DepensesDetails });
        return this.depenseRepository.save(newProject);
    }

    deleteDepense(id:number) {
        return this.depenseRepository.delete({ id })
    }

    updateDepense(id:number, DepensesDetails: CreateDepenseParams){
        return this.depenseRepository.update({ id },{...DepensesDetails});
    }

    getDepenseById(id:number){
        return this.depenseRepository.findOneBy({ id });
    }

    uploadFile(@UploadedFile() file: Express.Multer.File, @Query() dataUrl: any) {
        const response = {
          originalname: file.originalname,
          filename: file.filename,
        };
        return response;
      }

    uploadAudio(@UploadedFile() file: Express.Multer.File) {
        const response = {
          originalname: file.originalname,
          filename: file.filename,
        };
        return response;
      }


}
