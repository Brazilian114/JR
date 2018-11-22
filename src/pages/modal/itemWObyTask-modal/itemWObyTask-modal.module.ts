import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { itemWObyTaskPage } from './itemWObyTask-modal';

@NgModule({
  declarations: [
    itemWObyTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(itemWObyTaskPage),
  ],
})
export class itemWObyTaskPageModule {}
