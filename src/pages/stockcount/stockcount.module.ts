import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockcountPage } from './stockcount';

@NgModule({
  declarations: [
    StockcountPage,
  ],
  imports: [
    IonicPageModule.forChild(StockcountPage),
  ],
})
export class StockcountPageModule {}
