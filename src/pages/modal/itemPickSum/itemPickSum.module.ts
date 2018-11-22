import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { itemPickSumPage } from './itemPickSum';

@NgModule({
  declarations: [
    itemPickSumPage,
  ],
  imports: [
    IonicPageModule.forChild(itemPickSumPage),
  ],
})
export class itemPickSumPageModule {}
