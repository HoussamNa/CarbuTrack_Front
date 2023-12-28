import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCarComponent } from './add-car/add-car.component';
import { AddConsumptionComponent } from './add-consumption/add-consumption.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'add-consumption', component: AddConsumptionComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'LOGIN', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
