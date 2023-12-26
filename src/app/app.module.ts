import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
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


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    AddCarComponent,
    AddConsumptionComponent,
    SettingsComponent,
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
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}