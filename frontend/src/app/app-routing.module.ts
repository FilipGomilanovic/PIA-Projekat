import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { ParticipantComponent } from './participant/participant.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UnregisteredComponent } from './unregistered/unregistered.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { WorkshopComponent } from './workshop/workshop.component';

const routes: Routes = [
  {path: '', component: UnregisteredComponent},
  {path: 'participant', component: ParticipantComponent},
  {path: 'organizer', component: OrganizerComponent},
  {path: 'administrator', component: AdministratorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'loginAdmin', component: LoginAdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'test', component: FileUploadComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'workshop', component: WorkshopComponent},
  {path: 'user-settings', component: UserSettingsComponent},
  {path: 'change-password', component: ChangePasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
