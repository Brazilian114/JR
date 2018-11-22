import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleorderPage } from './saleorder';

@NgModule({
  declarations: [
    SaleorderPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleorderPage),
  ],
})
export class SaleorderPageModule {}
