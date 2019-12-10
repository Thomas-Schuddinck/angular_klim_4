import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectTemplate } from '../../types/projectTemplate.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApplicationDomain } from 'src/app/types/applicationDomain.model';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { delay } from 'q';
import {TemplateService} from '../../services/template.service';
import {ProductTemplate} from '../../types/productTemplate.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-project-template',
  templateUrl: './add-project-template.component.html',
  styleUrls: ['./add-project-template.component.css']
})

export class AddProjectTemplateComponent implements OnInit {

  public projecttemplate: FormGroup;
  public domains: ApplicationDomain[] = [];
  public productTemplates: ProductTemplate[];
  public geselecteerdeProductTemplates: ProductTemplate[];

  public error: String = "assets/images/error.svg";
  public correct: String = "assets/images/correct.svg";

  public productFotoSrc = '';

  constructor(private router: Router,
              private _fb: FormBuilder,
              private _projecttemplateDataService: TemplateService,
              private _projectDataService: ProjectService) {


  }

  ngOnInit() {
    this._projectDataService.getApplicationDomains$().subscribe(ad => this.domains = ad);
    this._projecttemplateDataService.getProductTemplates$().subscribe(pt => this.productTemplates = pt);

    this.setForm();
    this.projecttemplate.get('productTemplates').valueChanges.subscribe(pt => this.geselecteerdeProductTemplates = pt);
  }

  setForm() {
    this.projecttemplate = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(6)]],
      applicationDomain: [this.domains, Validators.required],
      productTemplates: [this.productTemplates, Validators.required],
      budget: [0, Validators.required],
      maxScore: [0, Validators.required]
    });
  }

  save() {
    const p = new ProjectTemplate();
    p.name = this.projecttemplate.value.name;
    p.descr = this.projecttemplate.value.description;
    p.image = this.projecttemplate.value.image;
    this.productTemplates.map(v => p.productTemplates.push(v));
    p.applicationDomainId = this.projecttemplate.value.applicationDomain.id;
    p.budget = this.projecttemplate.value.budget;
    p.maxScore = this.projecttemplate.value.maxScore;
    this._projecttemplateDataService.addNewProjecttemplate(p)
    .subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/projecttemplates');
    });
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'is verplicht';
    } else if (errors.minlength) {
      return `moet minstens ${
        errors.minlength.requiredLength
        } karakters bevatten (heeft ${errors.minlength.actualLength})`;
    }
  }

  showDefaultImage() {
    this.productFotoSrc = 'assets/images/image-not-found.png';
  }

}
