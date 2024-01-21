import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';

const routes: Routes = [
  {path: "register", component: RegistrationComponent},
  {path: "account", component: AccountComponent},
  {path: "login", component: LoginComponent},
  {path: "reservations", component: ViewReservationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
