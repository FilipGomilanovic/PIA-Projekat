import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { ParticipantComponent } from './participant/participant.component';
import { RegisterComponent } from './register/register.component';
import { UnregisteredComponent } from './unregistered/unregistered.component';

const routes: Routes = [
  {path: '', component: UnregisteredComponent},
  {path: 'participant', component: ParticipantComponent},
  {path: 'organizer', component: OrganizerComponent},
  {path: 'administrator', component: AdministratorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'loginAdmin', component: LoginAdminComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
