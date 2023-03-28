import { Component, OnInit } from '@angular/core';
import { Model } from '../models/model';
import { AbstractRepository } from '../services/abstract-repository';
import { ModelService } from '../services/model.service';
import { OperationUtils } from '../utils/operation-utils';

@Component({
  selector: 'app-table-models',
  templateUrl: './table-models.component.html',
  styleUrls: ['./table-models.component.css'],
})
export class TableModelsComponent implements OnInit {
  models: Model[];
  
  // models = [
  //   {fieldString: "Value",fieldNumber:3, fieldDate:'2021-07-21'},
  //   {fieldString: "Value 4",fieldNumber:4, fieldDate:'2021-07-21'},
  //   {fieldString: "Value 5",fieldNumber:5, fieldDate:'2021-07-21'},
  // ]

  constructor(private modelService: ModelService) {
    this.modelService.findAll().subscribe(m => this.models = m._embedded.models);
  }

  ngOnInit(): void {
    this.modelService.findAll().subscribe(m => this.models = m._embedded.models);
  }

  delete(id: number) {
    this.modelService.deleteById(id).subscribe();
    this.models = this.models.filter( m => m.id != id);
    console.log(this.models);
  }
}
