import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { OptionComponent } from './option/option.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IPOComponent } from './ipo/ipo.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { OptionsAggregatedComponent } from './options-aggregated/options-aggregated.component';
import { IpoDetailComponent } from './ipo-detail/ipo-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { AgGridModule } from 'ag-grid-angular';
import { GainersandlosersComponent } from './gainersandlosers/gainersandlosers.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OptionComponent,
    IPOComponent,
    AboutusComponent,
    OptionsAggregatedComponent,
    IpoDetailComponent,
    GainersandlosersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    Ng2SmartTableModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
