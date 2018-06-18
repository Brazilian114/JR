import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../../services/service';

@Component({
  selector: 'page-cilentmodel',
  templateUrl: 'cilentmodel.html'
})
export class CilentmodelPage {
  data_client:any;
  oUsername:any;
  loader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController , private storage: Storage) {
       this.storage.get('_user').then((res)=>{
         this.oUsername = res;
         console.log(this.oUsername);

             this.doGetClient(this.oUsername);
       })

  }
  doSelectClient(client_no){
    // let nav = this.app.getRootNav();
    // nav.setRoot(CheckinPage, {client_no: client_no});

    let data = { 'client_no': client_no };
    this.viewCtrl.dismiss(data);
    // console.log(data);
  }
  doGetClient(oUsername){
    this.presentLoading();
    this.service.get_client(oUsername).then((res)=>{
      this.data_client = res;
      console.log(this.data_client);
      this.finishLoding();
    })
  }
  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content:"Loading..."
    });
    // this.loader.present();
    this.loader.present().then(() => {});
  };
  finishLoding(){
    this.loader.dismiss();
  }
  dismiss() {
     let data = { 'foo': 'bar' };
     this.viewCtrl.dismiss(data);

   }
}
