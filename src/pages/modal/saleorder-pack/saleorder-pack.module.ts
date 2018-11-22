import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleorderPagePack } from './saleorder-pack';

@NgModule({
  declarations: [
    SaleorderPagePack,
  ],
  imports: [
    IonicPageModule.forChild(SaleorderPagePack),
  ],
})
export class SaleorderPagePackModule {}
