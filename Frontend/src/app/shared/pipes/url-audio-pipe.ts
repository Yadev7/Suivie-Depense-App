import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'urlAudio'
})
export class UrlAudioPipe implements PipeTransform {
  apiUrl: string = environment.api;
  transform(value: any,): string {
      if (value.audioExplicatif) {
        return `${this.apiUrl}/files/fichiers/${value.audioExplicatif}`
      }
    return 'fffff';
  }

}
