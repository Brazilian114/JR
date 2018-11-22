import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationOrderPage } from './reservationorder';

@NgModule({
  declarations: [
    ReservationOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationOrderPage),
  ],
})
export class ReservationOrderPageModule {}
