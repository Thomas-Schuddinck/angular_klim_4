import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectTemplate } from '../../types/project-template-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectTemplateService } from 'src/app/services/project-template.service';
import { ApplicationDomain } from 'src/app/types/applicationDomain.model';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { ProductTemplate } from 'src/app/types/product-template-model';
import { delay } from 'q';



@Component({
  selector: 'app-edit-project-template',
  templateUrl: './edit-project-template.component.html',
  styleUrls: ['./edit-project-template.component.css']
})

export class EditProjectTemplateComponent implements OnInit {
  @Input() template: ProjectTemplate;
  public projecttemplate: FormGroup;
  public isCreate: boolean;
  public domains: ApplicationDomain[] = [];
  productTemplates: ProductTemplate[];
  geselecteerdeProductTemplates: ProductTemplate[];
  geselecteerdeDomainApplication: ApplicationDomain;
  constructor(private _fb: FormBuilder,
              private _projecttemplateDataService: ProjectTemplateService,
              private _projectDataService: ProjectService) {


  }

  ngOnInit() {
    console.log(this.template);
    this.setForm();
    this._projectDataService.getApplicationDomains$().subscribe(ad => this.domains = ad);
    this._projecttemplateDataService.getProductTemplates$().subscribe(pt => this.productTemplates = pt);
    this.projecttemplate.get('productTemplates').valueChanges.subscribe(pt => this.geselecteerdeProductTemplates = pt);
  }
  onSubmit() {
    this.template.name = this.projecttemplate.value.name;
    this.template.descr = this.projecttemplate.value.descr;
    this.template.image = this.projecttemplate.value.image;
    this.template.productTemplates.length = 0;
    this.productTemplates.map(v => this.template.productTemplates.push(v)) ;
    this.template.applicationDomainId = this.projecttemplate.value.applicationDomain;
    this._projecttemplateDataService.updateProjectTemplate(this.template.projectTemplateId, this.template);
    this.template.budget = this.projecttemplate.value.budget;
    this.template.maxScore = this.projecttemplate.value.maxScore;


  }
  setForm() {
    this.geselecteerdeDomainApplication = this.domains.find(d => d.id === this.template.applicationDomainId);
    this.geselecteerdeProductTemplates = this.template.productTemplates;
    this.projecttemplate = this._fb.group({
      name: [this.template.name, [Validators.required, Validators.minLength(6)]],
      image: [this.template.image, Validators.required],
      descr: [ this.template.descr, [Validators.required, Validators.minLength(6)]],
      applicationDomain: [this.geselecteerdeDomainApplication , Validators.required],
      productTemplates: [this.productTemplates, Validators.required],
      budget: [this.template.budget, Validators.required],
      maxScore: [this.template.maxScore, Validators.required]
      });

  }
  compareFn(product: ProductTemplate, product2: ProductTemplate) {
    return product && product2 ? product.productTemplateId === product2.productTemplateId : product === product2;
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

}
