import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OptionComponent } from './option/option.component';
import { IPOComponent } from './ipo/ipo.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { OptionsAggregatedComponent } from './options-aggregated/options-aggregated.component';
import { IpoDetailComponent } from './ipo-detail/ipo-detail.component';
import { GainersandlosersComponent } from './gainersandlosers/gainersandlosers.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'option', component: OptionComponent },
  { path: 'option/aggregated', component: OptionsAggregatedComponent },
  { path: 'ipo', component: IPOComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'gainersandlosers', component: GainersandlosersComponent },
  { path: 'ipo/detail/:', component: IpoDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
	
}
