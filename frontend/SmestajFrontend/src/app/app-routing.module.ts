import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';
import { EditAccomodationComponent } from './edit-accomodation/edit-accomodation.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { AddAvailComponent } from './add-avail/add-avail.component';

const routes: Routes = [
  {path: "register", component: RegistrationComponent},
  {path: "account", component: AccountComponent},
  {path: "login", component: LoginComponent},
  {path: "reservations", component: ViewReservationComponent},
  {path: "edit", component: EditAccomodationComponent},
  {path: "edit-form", component: EditFormComponent},
  {path: "add-form", component: AddAvailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
