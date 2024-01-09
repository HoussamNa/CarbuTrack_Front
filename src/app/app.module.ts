import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddCarComponent } from './add-car/add-car.component';
import { AddConsumptionComponent } from './add-consumption/add-consumption.component';
import { SettingsComponent } from './settings/settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'primeng/chart';
import { Chart1Component } from './chart1/chart1.component';
import { Chart2Component } from './chart2/chart2.component';
import { Chart3Component } from './chart3/chart3.component';
import { FormsModule } from '@angular/forms';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    AddCarComponent,
    AddConsumptionComponent,
    SettingsComponent,
    Chart1Component,
    Chart2Component,
    Chart3Component,
    DeleteConfirmationComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    NgxChartsModule,
    ChartModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    AppRoutingModule,
    MatSnackBarModule, 
    // AuthModule.forRoot({
    //   domain: 'dev-m6ufepys0ol5g70y.us.auth0.com',
    //   clientId: 'cQJjvXG4HAEt1DgK1VrMIxNfbGvoUL4p',
    //   authorizationParams: {
    //     redirect_uri: window.location.origin
    //   }
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
