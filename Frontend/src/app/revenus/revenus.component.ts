import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RevenusService } from './revenus.service';
import { Revenu } from './revenu';
import { HttpClient } from '@angular/common/http';
import { ProjetsService } from '../projets/projets.service';

import { DepensesService } from '../depenses/depenses.service';
import { Project } from '../projets/projet';

import { Pipe, PipeTransform } from '@angular/core';

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
    selector: 'app-revenus',
    templateUrl: './revenus.component.html',
})
export class RevenusComponent implements OnInit {
    projects: any = [];
    projet = new Project();
    constructor(
        private cd: ChangeDetectorRef,
        public fb: FormBuilder,
        private serviceRevenus: RevenusService,
        private http: HttpClient,
        private serviceProjet: ProjetsService,
        private serviceDepenses: DepensesService
    ) {}

    displayType = 'list';
    @ViewChild('addRevenusModal') addRevenusModal!: ModalComponent;
    @ViewChild('editRevenusModal') editRevenusModal!: ModalComponent;
    @ViewChild('deleteRevenusModal') deleteRevenusModal!: ModalComponent;

    params!: FormGroup;
    filterdRevenusList: any[] = [];
    search: string = '';
    revenu = new Revenu();
    selectedFile1!: File;
    selectedFile2!: File;
    file: any;
    myDoc: any;
    myAudio: any;
    selectedFile: any;
    selectedaudio: any;
    selectedFiles: any[] = [];
    projet_list: any[] = [];
    revenus: any[] = [];

    currentDate!: string;

    async ngOnInit() {
        this.currentDate = this.todayDate();
        this.projects = await this.serviceProjet.getProjetsList();
        this.revenus = await this.serviceRevenus.getRevenusList();
        this.filterdRevenusList = this.revenus;
        return this.filterdRevenusList;
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


    todayDate(): string {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        return formattedDate;
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile.name);
    }

    onAudioSelected(event: any) {
        this.selectedaudio = event.target.files[0];
        console.log(this.selectedaudio.name);
    }

    async OnSubmit() {
        if (
            this.revenu.typeRev &&
            this.revenu.montant &&
            this.revenu.dateRevenu &&
            this.revenu.projet_ref &&
            this.revenu.description &&
            this.selectedFile &&
            this.selectedFile.name !== '' &&
            this.selectedaudio &&
            this.selectedaudio.name !== ''
        ) {
            if (this.selectedFile) {
                this.selectedFiles.push(this.selectedFile);
            }

            if (this.selectedaudio) {
                this.selectedFiles.push(this.selectedaudio);
            }

            // console.log(this.selectedFiles);
            const formData = new FormData();
            for (let i = 0; i < this.selectedFiles.length; i++) {
                formData.append('files', this.selectedFiles[i], this.selectedFiles[i].name);
            }

            this.http.post('http://localhost:3002/revenus/upload', formData).subscribe(async (data: any) => {
                const myFiles = data;
                console.log(myFiles);
                if (myFiles && myFiles.data && Array.isArray(myFiles.data)) {
                    for (let p of myFiles.data) {
                        if (p.mimetype == 'application/pdf') {
                            this.revenu.docJustificatif = p.filename;
                        } else {
                            this.revenu.audioExplicatif = p.filename;
                        }
                    }
                } else {
                    console.error('Invalid response from server:', myFiles);
                    // Handle the situation where myFiles.data is undefined or not an array
                }


                await this.serviceRevenus.addRevenu(this.revenu);
                this.revenus = await this.serviceRevenus.getRevenusList();
                this.filterdRevenusList = this.revenus;
                this.addRevenusModal.close();
                this.showMessage('Revenu ajoute avec succes !!!');
            });
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

    showDialogDeleteForm(revenu: any) {
        this.deleteRevenusModal.open();
        this.revenu = revenu;
    }

    OpenAddModalForm() {
        this.addRevenusModal.open();
        this.revenu = new Revenu();
    }

    searchRevenus() {
        this.filterdRevenusList = this.revenus.filter((revenu: any) => revenu.typeRev.includes(this.search));
    }

    async RemoveRevenu(revenu: any) {
        await this.serviceRevenus.deleteRevenu(revenu);
        this.revenus = await this.serviceRevenus.getRevenusList();
        this.filterdRevenusList = this.revenus;
        this.showMessage('Revenu Supprimé avec succes !!!');
        return this.filterdRevenusList;
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

    async updaterevenu(revenu: any) {
        await this.serviceRevenus.updateRevenu(revenu.id, revenu);
        this.revenus = await this.serviceRevenus.getRevenusList();
        this.filterdRevenusList = this.revenus;
        this.editRevenusModal.close();
        this.showMessage('Revenu Modifier avec succes !!!');
        return this.filterdRevenusList;
    }

    showDialogEditForm(rev: any) {
        this.editRevenusModal.open();
        this.revenu = { ...rev }; // Create a copy to avoid direct changes
    }

    openEditModal(rev: any) {
        this.editRevenusModal.open();
        this.revenus = { ...rev };
        this.showDialogEditForm(rev);
    }

    // isFormValid(): String {
    //     return this.revenu.dateRevenu && this.revenu.typeRev && this.revenu.description && this.revenu.montant && this.revenu.projet_ref && this.revenu.docJustificatif &&  this.revenu.audioExplicatif;
    // }
}
