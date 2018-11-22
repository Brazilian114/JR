import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PicksummaryPage } from './picksummary';

@NgModule({
  declarations: [
    PicksummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(PicksummaryPage),
  ],
})
export class PicksummaryPageModule {}
