import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickbyorderPage } from './pickbyorder';

@NgModule({
  declarations: [
    PickbyorderPage,
  ],
  imports: [
    IonicPageModule.forChild(PickbyorderPage),
  ],
})
export class PickbyorderPageModule {}
