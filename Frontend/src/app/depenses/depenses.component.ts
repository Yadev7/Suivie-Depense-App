import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepensesService } from './depenses.service';
import { Depense } from './depense';

import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { ProjetsService } from '../projets/projets.service';


import { AudioRecordingService } from './audio-recording-service';

@Pipe({ name: 'urlFile' })
export class UrlFilePipe implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

@Pipe({ name: 'urlAudio' })
export class UrlAudioPipe implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}



interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    moduleId: module.id,
    templateUrl: './depenses.component.html',
    styleUrls: ['./depenses.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class DepenseComponent implements OnInit {
    displayType = 'list';
    @ViewChild('addDepensetModal') addDepensetModal!: ModalComponent;
    @ViewChild('editDepensetModal') editDepensetModal!: ModalComponent;
    @ViewChild('deleteDepenseModal') deleteDepenseModal!: ModalComponent;

    params!: FormGroup;
    filterdDepensesList: any[] = [];
    search: string = '';
    depense = new Depense();
    selectedFile1!: File;
    selectedFile2!: File;
    file: any;
    myDoc: any;
    myAudio: any;
    selectedFile: any;
    selectedaudio: any;
    recordedAudio: any;
    selectedFiles: any[] = [];
    projet_list: any[] = [];

    isRecording = false;
    audioURL: string | null = null;
    @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

    constructor(private audioRecordingService: AudioRecordingService, private cd: ChangeDetectorRef, public fb: FormBuilder, private serviceDepenses: DepensesService, private http: HttpClient, private serviceProjet: ProjetsService) {}

    depenses: any = [];
    projects: any = [];

    currentDate!: string;

    initForm() {
        this.params = this.fb.group({
            id: [0],
        });
    }

    async ngOnInit() {
            this.currentDate = this.todayDate();
            this.audioRecordingService.audioBlob$.subscribe(blob => {
            this.audioURL = window.URL.createObjectURL(blob);
            this.audioPlayer.nativeElement.src = this.audioURL;
            this.cd.detectChanges();
          });
        this.projects = await this.serviceProjet.getProjetsList();
        this.depenses = await this.serviceDepenses.getDepensesList();
        this.filterdDepensesList = this.depenses;
        return this.filterdDepensesList;
    }


todayDatee(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day;
  }



    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
    }

    onAudioSelected(event: any) {
        this.selectedaudio = event.target.files[0];
        console.log(this.selectedaudio);
    }

    onRecordedAudioSelected(event: any) {
        this.recordedAudio = event.target.files[0];
        console.log(this.recordedAudio);
    }

        startRecording() {
            this.isRecording = true;
            this.audioRecordingService.startRecording();
        }

        stopRecording() {
            this.isRecording = false;
            this.audioRecordingService.stopRecording();

        }

       // Method to send the recorded audio to the backend
    async filteredByProject(keyFilterProject: any) {
                 await this.serviceDepenses.getDepensesList()
                  this.depenses = this.filterdDepensesList.filter(dep =>
                     dep.projet_ref == keyFilterProject.value
                //    console.log(keyFilterProject.value)
                    //   console.log(dep.projet_ref)
                    )
                    console.log(this.projects)
                }

    async OnSubmit() {
        if (
            this.depense.typeDep &&
            this.depense.dateDep &&
            this.depense.description &&
            this.depense.montant &&
            this.selectedFile &&
            this.selectedFile.name !== '' &&
            this.selectedaudio &&
            this.selectedaudio.name !== '' &&
            this.depense.projet_ref

        ) {
            // Proceed with form submission
            if (this.selectedFile) {
                this.selectedFiles.push(this.selectedFile);
            }

            if (this.selectedaudio) {
                this.selectedFiles.push(this.selectedaudio);
            }

            if (this.recordedAudio) {
                this.selectedFiles.push(this.recordedAudio);
            }

            // console.log(this.selectedFiles);
            const formData = new FormData();
            for (let i = 0; i < this.selectedFiles.length; i++) {
                formData.append('files', this.selectedFiles[i], this.selectedFiles[i].name);
            }

            this.http.post('http://localhost:3002/depenses/upload', formData).subscribe(async (data: any) => {
                const myFiles = data;
                console.log(myFiles);
                for (let p of myFiles.data) {
                    if (p.mimetype == 'application/pdf') {
                        this.depense.docJustificatif = p.filename;
                    } else {
                        this.depense.audioExplicatif = p.filename;
                    }
                }
                await this.serviceDepenses.addDepense(this.depense);
                this.depenses = await this.serviceDepenses.getDepensesList();
                this.filterdDepensesList = this.depenses;
                this.addDepensetModal.close();
                this.showMessage('Dépense ajoutée avec succès !!!');
            });

            this.http.post('http://localhost:3002/depenses/record', this.recordedAudio).subscribe(async (data: any) => {
                 const myFiles = data;
                 console.log('myfile:',myFiles);
                 for (let p of myFiles.data) {
                      if (p.mimetype == 'application/wav') {
                this.depense.recordedAudio = p.filename;

                console.log('depense:',this.depense);
                await this.serviceDepenses.addDepense(this.depense);
                this.depenses = await this.serviceDepenses.getDepensesList();
                this.filterdDepensesList = this.depenses;
                }
            }
           })

        } else {
            this.showMessageInvalid('Veuillez remplir tous les champs !!!');
        }
    }

    showMessageInvalid(msg = '', type = 'error') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }

    async RemoveDepense(depense: any) {
        await this.serviceDepenses.deleteDepense(depense);
        this.depenses = await this.serviceDepenses.getDepensesList();
        this.filterdDepensesList = this.depenses;
        this.showMessage('Depense Supprimé avec succes !!!');
        return this.filterdDepensesList;
    }

    showDialogDeleteForm(dep: any) {
        this.deleteDepenseModal.open();
        this.depense = dep;
    }

    OpenAddModalForm() {
        this.addDepensetModal.open();
        this.depense = new Depense();
        this.initForm();
    }

    todayDate(): string {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        return formattedDate;
    }

    async updateDepense(depense: any) {
        await this.serviceDepenses.updateDepense(depense.id, depense);
        this.depenses = await this.serviceDepenses.getDepensesList();
        this.filterdDepensesList = this.depenses;
        this.editDepensetModal.close();
        this.showMessage('Depense Modifier avec succes !!!');
        return this.filterdDepensesList;
    }

    showDialogEditForm(dep: any) {
        this.editDepensetModal.open();
        this.depense = { ...dep }; // Create a copy to avoid direct changes
    }

    openEditModal(dep: any) {
        this.showDialogEditForm(dep);
    }

    searchDepenses() {
        this.filterdDepensesList = this.depenses.filter((d: any) => d.typeDep.toLowerCase().includes(this.search.toLowerCase()));
    }

    showMessage(msg = '', type = 'success') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }


}
