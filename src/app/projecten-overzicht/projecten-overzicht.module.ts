import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectenContainerComponent } from './projecten-container/projecten-container.component';
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedModule } from "../shared/shared.module";
import { ProjectSquareComponent } from "../shared/project-square/project-square.component";



@NgModule({
  declarations: [
    ProjectenContainerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
  exports: [
    ProjectenContainerComponent
  ]
})
export class ProjectenOverzichtModule { }
