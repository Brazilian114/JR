import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../services/service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data_logins:any;
  data_user:any;
  oGroup:any;
  oCus_name:any;
  constructor(public navCtrl: NavController, public storage: Storage, private service : Service) {
    this.storage.get('_user').then((res) => {
      this.data_logins = res;
      console.log(this.data_logins);
      this.doGetUser(this.data_logins);
    });
  }
  doGetUser(oClient){
    this.service.Get_User(oClient).then((res)=>{
      this.data_user = res;
      console.log(this.data_user);
      this.oGroup = this.data_user["0"].user_group;
      this.oCus_name = this.data_user["0"].customer_name;
    })
  }
  menuOpened() {
    this.storage.get('_user').then((res) => {
      this.data_logins = res;
      console.log(this.data_logins);
    });
  }
}
