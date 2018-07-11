import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule'},
  { path: 'about', component: AboutComponent},
  { path: '', redirectTo: 'calendar', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
