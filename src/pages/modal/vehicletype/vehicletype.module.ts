import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicletypePage } from './vehicletype';

@NgModule({
  declarations: [
    VehicletypePage,
  ],
  imports: [
    IonicPageModule.forChild(VehicletypePage),
  ],
})
export class VehicletypePageModule {}
