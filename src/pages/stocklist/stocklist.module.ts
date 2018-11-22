import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockListPage } from './stocklist';

@NgModule({
  declarations: [
    StockListPage,
  ],
  imports: [
    IonicPageModule.forChild(StockListPage),
  ],
})
export class StockListPageModule {}
