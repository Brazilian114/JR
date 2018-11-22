import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PackingPage } from './packing';

@NgModule({
  declarations: [
    PackingPage,
  ],
  imports: [
    IonicPageModule.forChild(PackingPage),
  ],
})
export class PackingPageModule {}
