import { ApplicationDomain } from './applicationDomain.model';
import { Product } from './product.model';
import { Group } from './group.model';
import { EvaluationCriterea } from './evaluationCriterea.model';

export class Project {
  private _id: number;
  private _name: string;
  private _descr: string;
  private _image: string;
  private _budget: number;
  private _schoolYear: number;
  private _applicationDomainId: number;
  private _closed = false;
  private _applicationDomain: ApplicationDomain;
  private _products: Product[] = [];
  private _groups: Group[] = [];
  private _evaluationCritereas: EvaluationCriterea[] = [];
  private _classRoomId: number;

  static fromJSON(json: any): Project {
    const p = new Project();
    p._id = json.projectId;
    p._name = json.projectName;
    p._descr = json.projectDescr;
    p._image = json.projectImage;
    p._budget = json.projectBudget;
    p._schoolYear = json.eSchoolYear;

    if (json.applicationDomain !== null) {
      p._applicationDomain = ApplicationDomain.fromJSON(json.applicationDomain);
    }

    p._classRoomId = json.classRoomId;
    p._closed = !!json.closed;
    p._products = json.products.map(pr => Product.fromJSON(pr));
    p._groups = json.groups.map(g => Group.fromJSONBudget(g, json.projectBudget));
    p._evaluationCritereas = json.evaluationCritereas.map(c => EvaluationCriterea.fromJSON(c));
    return p;
  }

  toJson(): any {
    return {
      projectId: this._id,
      projectName: this._name,
      projectDescr: this._descr,
      projectImage: this._image,
      projectBudget: this._budget,
      eSchoolYear: this._schoolYear,
      classRoomId: this._classRoomId,
      applicationDomainId: this._applicationDomainId,
      products: this._products.map(p => p.toJson()),
      groups: this._groups.map(p => p.toJson()),
      evaluationCritereas: this._evaluationCritereas.map(p => p.toJson())
    };
  }


  changeShowClickedAllGroupsFalse() {
    this.groups.forEach(element => {
      element.showClicked = false;
    });
  }


  addProductToProject(p: Product) {
    this.products.push(p);
  }

  removeProduct(p: Product) {
    const index = this.products.indexOf(p);
    this.products.splice(index, 1);
  }

  addGroupToProject(g: Group) {
    this.groups.push(g);
  }

  removeGroup(g: Group) {
    const index = this.groups.indexOf(g);
    this.groups.splice(index, 1);
  }


  addEvaluationCToProject(p: EvaluationCriterea) {
    this.evaluationCritereas.push(p);
  }

  removeEvaluationC(p: EvaluationCriterea) {
    const index = this.evaluationCritereas.indexOf(p);
    this.evaluationCritereas.splice(index, 1);
  }


  // GETTERS AND SETTERS


  get evaluationCritereas(): EvaluationCriterea[] {
    return this._evaluationCritereas;
  }

  set evaluationCritereas(value: EvaluationCriterea[]) {
    this._evaluationCritereas = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get descr(): string {
    return this._descr;
  }

  set descr(value: string) {
    this._descr = value;
  }



  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get closed(): boolean {
    return this._closed;
  }

  set closed(value: boolean) {
    this._closed = value;
  }

  get budget(): number {
    return this._budget;
  }

  set budget(value: number) {
    this._budget = value;
  }

  get schoolYear(): number {
    return this._schoolYear;
  }

  set schoolYear(value: number) {
    this._schoolYear = value;
  }

  get applicationDomain(): ApplicationDomain {
    return this._applicationDomain;
  }

  set applicationDomain(value: ApplicationDomain) {
    this._applicationDomain = value;
  }

  get products(): Product[] {
    return this._products;
  }

  set products(value: Product[]) {
    this._products = value;
  }

  get groups(): Group[] {
    return this._groups;
  }

  set groups(value: Group[]) {
    this._groups = value;
  }

  get applicationDomainId(): number {
    return this._applicationDomainId;
  }

  set applicationDomainId(value: number) {
    this._applicationDomainId = value;
  }

  public get classRoomId(): number {
    return this._classRoomId;
  }
  public set classRoomId(value: number) {
    this._classRoomId = value;
  }
}
