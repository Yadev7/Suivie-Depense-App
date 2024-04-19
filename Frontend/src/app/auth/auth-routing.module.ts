import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxedSigninComponent } from './pages/boxed-signin/boxed-signin';
import { BoxedSignupComponent } from './pages/boxed-signup/boxed-signup';

export const COMPONENTS = [BoxedSigninComponent, BoxedSignupComponent];

export const PAGES = [BoxedSigninComponent, BoxedSignupComponent];

export const SERVICES = [];

const routes: Routes = [
  {
    path: '',
    component: BoxedSigninComponent,
    children: [
       { path: '', redirectTo: 'boxed-signin', pathMatch: 'full' },
       { path: '', component: BoxedSigninComponent },
       { path: 'boxed-signin', component: BoxedSigninComponent, data: { returnUrl: window.location.pathname } },
       { path: 'boxed-signup', component: BoxedSignupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
