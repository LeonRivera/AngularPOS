import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModelsComponent } from './table-models/table-models.component';
import { FormModelsComponent } from './form-models/form-models.component';
import { PrimeNgComponentsModule } from './modules/prime-ng-components/prime-ng-components.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormProductsComponent } from './form-products/form-products.component';
import { TableProductsComponent } from './table-products/table-products.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SellProductsComponent } from './sell-products/sell-products.component';


@NgModule({
  declarations: [
    AppComponent,
    TableModelsComponent,
    FormModelsComponent,
    FormProductsComponent,
    TableProductsComponent,
    HeaderComponent,
    FooterComponent,
    SellProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgComponentsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [DialogService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
