import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MaterialModule } from '../shared/material.module';
import { EventListComponent } from './event-list/event-list.component';
import { HeaderComponent } from './header/header.component';


import { FlexLayoutModule } from '@angular/flex-layout';

const date = new Date();
const dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

const routes: Routes = [
  { path: '', component: SidenavComponent, children: [
    { path: ':language/:date', component: EventListComponent},
    { path: ':language/:date/:eventId', component: MainContentComponent },
    { path: '', redirectTo: 'en/' + dateString }
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes) ,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [HeaderComponent, SidenavComponent, MainContentComponent, EventListComponent]
})
export class CalendarModule { }
