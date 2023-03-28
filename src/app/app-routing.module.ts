import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormModelsComponent } from './form-models/form-models.component';
import { TableModelsComponent } from './table-models/table-models.component';
import { TableProductsComponent } from './table-products/table-products.component';
import { FormProductsComponent } from './form-products/form-products.component';
import { SellProductsComponent } from './sell-products/sell-products.component';

const routes: Routes = [
 {path: '', component: SellProductsComponent},
 {path: 'models', component: TableModelsComponent},
 {path: 'models/form', component: FormModelsComponent},
 {path: 'models/form/:id', component: FormModelsComponent},
 {path: 'products', component: TableProductsComponent},
 {path: 'products/form', component: FormProductsComponent},
 {path: 'products/form/:id', component: FormProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
