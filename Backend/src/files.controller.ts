import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/sys/auth.guard';

 //@UseGuards(JwtAuthGuard)
@Controller('files')
export class FilesController {
  @Get(':fichiers/:file')
  seeUploadedFile(@Res() res,@Param('fichiers') fichiers, @Param('file') file,) {
    let racine = 'fichiers/' ;
    return res.sendFile(file, { root: racine });
  }
}