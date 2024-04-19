import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'urlFile'
})
export class UrlPdfPipe implements PipeTransform {
  apiUrl: string = environment.api;
  transform(value: any,): string {
      if (value.docJustificatif) {
        return `${this.apiUrl}/files/fichiers/${value.docJustificatif}`
      }
    return 'fffff';
  }

}
