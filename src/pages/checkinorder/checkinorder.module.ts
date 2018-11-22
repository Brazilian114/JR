import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinOrderPage } from './checkinorder';

@NgModule({
  declarations: [
    CheckinOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinOrderPage),
  ],
})
export class CheckinOrderPageModule {}
