import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';
import { EditAccomodationComponent } from './edit-accomodation/edit-accomodation.component';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { EditFormComponent } from './edit-form/edit-form.component';
import { AddAvailComponent } from './add-avail/add-avail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    AccountComponent,
    EditAccomodationComponent,
    ViewReservationComponent,
    LoginComponent,
    EditFormComponent,
    AddAvailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
