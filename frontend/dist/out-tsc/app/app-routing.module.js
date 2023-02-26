import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { ParticipantComponent } from './participant/participant.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UnregisteredComponent } from './unregistered/unregistered.component';
const routes = [
    { path: '', component: UnregisteredComponent },
    { path: 'participant', component: ParticipantComponent },
    { path: 'organizer', component: OrganizerComponent },
    { path: 'administrator', component: AdministratorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'loginAdmin', component: LoginAdminComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'test', component: FileUploadComponent },
    { path: 'profile', component: ProfileComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map