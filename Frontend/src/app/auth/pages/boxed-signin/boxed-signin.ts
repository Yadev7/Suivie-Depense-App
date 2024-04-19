import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/auth/auth.service';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SignInService } from './boxed-signin.service';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './boxed-signin.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})

export class BoxedSigninComponent implements OnInit {
    form: FormGroup;
    submitted = false;
    email = '';
    password = '';
    _formBuilder: any;
    // passwordTextType: boolean;
    authSevice: any;
    storeData: any;
    store: any;


        constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
            this.form = this.formBuilder.group({
              email: ['', [Validators.required, Validators.email]],
              password: ['', Validators.required]
            });
          }
    ngOnInit(): void {
                 const userId = localStorage.getItem("userId");
    }

    get f() {
        return this.form.controls;
      }

    async onSubmit() {

        this.submitted = true;
        if (this.form.invalid) {
          return;
        }

        const result = await this.authService.login(this.form.value);
        
        if (result) {
          this.showMessage("Connexion Réussie", "success");
          this.router.navigate(['/projets']);
        } else {
            this.showMessage("Connexion Echouée", "error");
        }

      }

      showMessage(msg = '', type = 'danger') {
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







