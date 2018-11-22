import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperationBranchPage } from './operationBranch';

@NgModule({
  declarations: [
    OperationBranchPage,
  ],
  imports: [
    IonicPageModule.forChild(OperationBranchPage),
  ],
})
export class OperationBranchPageModule {}
