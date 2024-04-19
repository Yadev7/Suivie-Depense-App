import { Injectable, Query, UploadedFile } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Revenu } from 'src/typeorm/entities/Revenu';
import { CreateRevenuParams } from 'src/utils/types';

@Injectable()
export class RevenusService {

    constructor(@InjectRepository(Revenu) private  revenuRepository: Repository<Revenu>,) {}

    fetchRevenus(){
        return this.revenuRepository.find();
    }

    createRevenus(RevenusDetails: CreateRevenuParams){
        const newRevenu = this.revenuRepository.create({ ...RevenusDetails });
        return this.revenuRepository.save(newRevenu);
    }

    getRevenuById(id: number){
        return this.revenuRepository.findOneBy({ id });
    }

    deleteRevenu(id:number){
        return this.revenuRepository.delete({id})
    }

    updateRevenu(id:number, RevenusDetails: CreateRevenuParams){
        return this.revenuRepository.update({ id }, { ...RevenusDetails })
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
