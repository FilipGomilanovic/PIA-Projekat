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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerComponent } from './organizer/organizer.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministratorComponent,
    LoginComponent,
    RegisterComponent,
    LoginAdminComponent,
    ParticipantComponent,
    UnregisteredComponent,
    OrganizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
