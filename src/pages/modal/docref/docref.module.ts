import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocrefPage } from './docref';

@NgModule({
  declarations: [
    DocrefPage,
  ],
  imports: [
    IonicPageModule.forChild(DocrefPage),
  ],
})
export class DocrefPageModule {}
