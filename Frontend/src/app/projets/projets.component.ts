import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetsService } from './projets.service';
import { Project } from './projet';
import { DepensesService } from '../depenses/depenses.service';
import { Depense } from '../depenses/depense';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';

import { ActivatedRoute } from '@angular/router';
import { AudioRecordingService } from '../depenses/audio-recording-service';
@Component({
    moduleId: module.id,
    templateUrl: './projets.component.html',
    styleUrls: ['./projets.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class ProjetComponent {
    displayType = 'list';
    @ViewChild('addProjetModal') addProjetModal!: ModalComponent;
    @ViewChild('editProjetModal') editProjetModal!: ModalComponent;
    @ViewChild('deleteProjetModal') deleteProjetModal!: ModalComponent;
    @ViewChild('showDepensesList') showDepensesList!: ModalComponent;
    @ViewChild('addDepensetModal') addDepensetModal!: ModalComponent;


    params!: FormGroup;
    filteredProjectsList: any[] = [];
    filterdDepensesList: any[] = [];
    search: string = '';
    projet = new Project();
    depenses: any = [];
    depense = new Depense();
    users = this.serviceUser.getUsersList();
    donutChart: any;
    formattedDateDebut = this.projet.date_debut;
    DateDebut = this.formattedDateDebut.toISOString().split('T')[0];
    pr: any;
    formattedDateFin = this.projet.date_fin;
    DateFin = this.formattedDateFin.toISOString().split('T')[0];
    isRecording = false;
    currentDate!: string;
    selectedFile: any;
    selectedaudio: any;
    audioURL: string | null = null;

    constructor(private audioRecordingService: AudioRecordingService, private route: ActivatedRoute, public fb: FormBuilder, private serviceProjet: ProjetsService, private serviceUser: UsersService, private serviceDepenses: DepensesService) {}
    projets: any = [];

    todayDate(): string {
        const today = new Date();
        // Format the date as 'YYYY-MM-DD' for the input type 'date'
        const formattedDate = today.toISOString().split('T')[0];
        return formattedDate;
    }




    startRecording() {
        this.isRecording = true;
        this.audioRecordingService.startRecording();
    }

    stopRecording() {
        this.isRecording = false;
        this.audioRecordingService.stopRecording();

    }



    initForm() {
        this.params = this.fb.group({
            id: [0],
            nomProject: ['', Validators.required],
            description: ['', Validators.required],
            // date_debut: ['', Validators.required],
            // date_fin: ['', Validators.required],
            // phase_project: ['', Validators.required],
            // tauxRealisation: ['', Validators.required],
            location: [''],
        });
    }

    async ngOnInit() {
        this.currentDate = this.todayDate();
        let userid = localStorage.getItem('userId');
        this.projets = await this.serviceProjet.getProjetsList();
        this.filteredProjectsList = this.projets;
        this.initForm();
        this.depenses = await this.serviceDepenses.getDepensesList();
        this.projets = await this.serviceProjet.getProjetsList();
        this.filteredProjectsList = this.projets;
        return this.filteredProjectsList;
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


    async OnSubmit() {
        if (this.isFormValid()) {
            await this.serviceProjet.addProjet(this.projet);
            this.projets = await this.serviceProjet.getProjetsList();
            this.filteredProjectsList = this.projets;
            console.log(this.filteredProjectsList);
            this.addProjetModal.close();
            this.showMessageValid('Projet Ajouté avec Succes !!!');
        } else {
            // Handle invalid form data here, such as showing an error message
            this.showMessageInvalid('Veuillez remplir tous les champs !!!');
        }
    }


    async AddDepenses() {
        this.depenses = await this.serviceDepenses.getDepensesList();
        console.log(this.depenses);
        this.showDepensesList.open();
    }



    showMessageValid(msg = '', type = 'success') {
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

    isFormValid(): String {
        return this.projet.nomProject &&
         this.projet.description
        //   this.DateDebut &&
        //   this.DateFin &&
        //   this.projet.tauxRealisation &&
        //   this.projet.phase_project;
    }

    async RemoveProjet(projet: any) {
        await this.serviceProjet.deleteProjet(projet);
        this.projets = await this.serviceProjet.getProjetsList();
        this.filteredProjectsList = this.projets;
        this.showMessageValid('Projet Supprimé avec Succes !!!');
        return this.filteredProjectsList;
    }

    showDialogDeleteForm(pr: any) {
        this.deleteProjetModal.open();
        this.projet = pr;
        console.log(this.projet.id);
    }


    showDepensesModal(pr: any) {
        this.showDepensesList.open();
        this.ShowDepensesForProject(pr);
    }

    async ShowDepensesForProject(pr: any) {
         this.depenses = await (await this.serviceDepenses.getDepensesList()).filter(d =>
              d.projet_ref == pr.ref
        )
      }

      async onDateFinChange() {
        const startDate = new Date(this.projet.date_debut);
        const endDate = new Date(this.projet.date_fin);

        // Calculate the difference in milliseconds
        const differenceInMs = endDate.getTime() - startDate.getTime();

        // Convert milliseconds to days
        const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

        // Set the duration value
        this.projet.duration = differenceInDays;

        //     // Get today's date and the selected date
        const today = new Date();
        const selectedDate = new Date(this.projet.date_fin);

    //     // Compare the selected date with today's date
        if (selectedDate <= today) {
            // If the selected date is today or in the past, update phase_project to "Complet"
            this.projet.phase_project = "Complet";
        }
        else {
            // If the selected date is in the future, update phase_project to "En Cours" or any other appropriate value
            this.projet.phase_project = "En Cours";
        }
    }



    showDialogEditForm(pr: any) {
        this.editProjetModal.open();
        this.projet = { ...pr }; // Create a copy to avoid direct change
    }

    openEditModal(pr: any) {
        this.showDialogEditForm(pr);
    }



    async updateProjet() {
        await this.serviceProjet.updateProjets(this.projet.id, this.projet);
        this.projets = await this.serviceProjet.getProjetsList();
        this.filteredProjectsList = this.projets;
        this.editProjetModal.close();
        this.showMessageValid('Projet Modifier avec Succes !!!');
        return this.filteredProjectsList;
    }

    OpenAddDepenseModalForm() {
        this.addDepensetModal.open();
    }

    OpenAddModalForm() {
        this.addProjetModal.open();
        this.projet = new Project();
        this.initForm();
    }

    searchProjects() {
        this.filteredProjectsList = this.projets.filter((d: any) => d.nomProject.toLowerCase().includes(this.search.toLowerCase()));
    }
}
