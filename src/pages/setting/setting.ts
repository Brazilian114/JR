import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@IonicPage(
  {name:'SettingPage',
  segment: 'Setting'}
)
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  oURL:string;
  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.get('_url').then((res)=>{
      console.log(res);
      this.oURL = res;
    })
  }
  doURL(oURL){
    this.storage.set('_url', oURL);
    this.storage.get('_url').then((res)=>{
      console.log(res);
    })
    this.reload();
  }
  doClearURL(){
    this.storage.remove('_url')
    this.storage.get('_url').then((res)=>{
      console.log(res);
    })
    this.reload();
  }
  reload(){
    this.navCtrl.pop();
  }
}
