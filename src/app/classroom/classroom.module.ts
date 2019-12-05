import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalListClassroomsComponent } from './overzicht/horizontal-list-classrooms/horizontal-list-classrooms.component';
import { ClassroomListComponent } from './overzicht/classroom-list/classroom-list.component';
import { ClassroomComponent } from './overzicht/classroom/classroom.component';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import { ClassroomDetailComponent } from './classroomDetail/classroom-detail/classroom-detail.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [HorizontalListClassroomsComponent, ClassroomListComponent, ClassroomComponent, ClassroomDetailComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatTableModule
  ],
  exports: [
    ClassroomListComponent
  ]
})
export class ClassroomModule { }
