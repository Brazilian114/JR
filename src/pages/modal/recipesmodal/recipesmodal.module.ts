import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipesmodalPage } from './recipesmodal';

@NgModule({
  declarations: [
    RecipesmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipesmodalPage),
  ],
})
export class RecipesmodalPageModule {}
