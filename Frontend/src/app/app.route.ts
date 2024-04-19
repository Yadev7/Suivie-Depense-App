import { Routes } from '@angular/router';

// dashboard
// import { IndexComponent } from './index';
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';
import { ProjetComponent } from './projets/projets.component';
import { DepenseComponent } from './depenses/depenses.component';
import { BoxedSigninComponent } from './auth/pages/boxed-signin/boxed-signin';
import { BoxedSignupComponent } from './auth/pages/boxed-signup/boxed-signup';
import { ProfileComponent } from './users/profile';
import { UserAccountSettingsComponent } from './users/user-account-settings';
import { RevenusComponent } from './revenus/revenus.component';

export const routes: Routes = [

    {
        path: '',
        component: AuthLayout,
        children: [
            // dashboard
            { path: '', component: BoxedSigninComponent, title: 'Suivi Depenses | Connection' },
            { path: 'auth/boxed-signup', component: BoxedSignupComponent, title: 'Suivi Depenses | Inscription' },
           {
               path: '',
               component: AppLayout,
               children: [
                { path:'projets', component: ProjetComponent, title: 'Suivi Depenses | Liste de Projets' },
                { path:'depenses', component: DepenseComponent, title: 'Suivi Depenses | Liste de Depenses' },
                { path:'revenus', component: RevenusComponent, title: 'Suivi Depenses | Liste de Revenus' },
                // { path:'users/profile', component: ProfileComponent, title: 'Suivi Depenses | Profile' },
                { path:'users/user-account-settings', component: UserAccountSettingsComponent, title: 'Suivi Depenses | Profile' },
               ]
           },


        ],
    },

    {
        path: 'auth/boxed-signin',
        component: AuthLayout,
        children: [
            // auth
            { path: '', component: BoxedSigninComponent, title: 'Suivi Depenses | Connection' },
        ],
    },
];
