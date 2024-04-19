import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
    moduleId: module.id,
    templateUrl: './boxed-signup.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class BoxedSignupComponent {
    store: any;
    form: FormGroup;
    _formBuilder: any;
    constructor(
        public authService: AuthService, public translate: TranslateService, public storeData: Store<any>, public router: Router, private appSetting: AppService,private formBuilder: FormBuilder) {
            this.form = this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required]
              });
            this.initStore();
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }


    async onSubmit() {
        const result = await this.authService.register(this.form.value);
        // console.log(result);
        if (result) {
            this.router.navigate(['/auth/boxed-signin']);
        }
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ae') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        window.location.reload();
    }
}
