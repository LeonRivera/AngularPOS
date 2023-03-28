import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from '../models/model';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-form-models',
  templateUrl: './form-models.component.html',
  styleUrls: ['./form-models.component.css'],
})
export class FormModelsComponent implements OnInit {
  public model: Model = new Model();
  public updating: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modelService: ModelService
  ) {}

  ngOnInit(): void {
    this.updating = this.loadIdParam();
    console.log(this.updating);
  }

  public loadIdParam(): boolean {
    let id = '';
    this.activatedRoute.params.subscribe((params) => {
      id = params['id'];
      if (id) {
        this.modelService.findById(Number(id)).subscribe((model) => {
          model.fieldDate = new Date(model.fieldDate);
          return (this.model = model);
        });
      }
    });
    if (id === undefined) {
      return false;
    } else {
      return true;
    }
  }

  save(): void {
    this.modelService.save(this.model).subscribe();
    this.router.navigate(['/']);
  }

  update(): void {
    console.log(this.model);
    this.modelService.update(this.model).subscribe();
    this.router.navigate(['/']);
  }
}
