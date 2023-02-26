import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ParticipantComponent } from './participant/participant.component';
import { UnregisteredComponent } from './unregistered/unregistered.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerComponent } from './organizer/organizer.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProfileComponent } from './profile/profile.component';
import { AgmCoreModule } from '@agm/core';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            AdministratorComponent,
            LoginComponent,
            RegisterComponent,
            LoginAdminComponent,
            ParticipantComponent,
            UnregisteredComponent,
            OrganizerComponent,
            FileUploadComponent,
            ProfileComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule,
            ReactiveFormsModule,
            AgmCoreModule.forRoot({
                apiKey: "AIzaSyAEkabTXUnuafbGc5GFXG_P3rBhThxyP6U"
            })
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map