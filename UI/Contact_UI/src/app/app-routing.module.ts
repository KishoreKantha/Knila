import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [{
  path: 'contact', loadChildren: () => import('./Components/contact.module').then(m => m.ContactModule)
},
{ path: 'signin', component: SignInComponent, pathMatch: 'full' },
{ path: '', redirectTo: 'signin', pathMatch: 'full' },
{ path: '*', redirectTo: 'signin', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
