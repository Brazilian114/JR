import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickbytaskPage } from './pickbytask';

@NgModule({
  declarations: [
    PickbytaskPage,
  ],
  imports: [
    IonicPageModule.forChild(PickbytaskPage),
  ],
})
export class PickbytaskPageModule {}
