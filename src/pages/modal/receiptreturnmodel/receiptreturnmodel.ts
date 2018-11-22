import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../../services/service';

@IonicPage(
  {name:'ReceiptreturnmodelmodelPage',
  segment: 'Receiptreturnmodelmodel'}
)
@Component({
  selector: 'page-receiptreturnmodel',
  templateUrl: 'receiptreturnmodel.html'
})
export class ReceiptreturnmodelmodelPage {


  data_details:any;

  oUsername:any;
  oReceipt:any;
  oClient:any;
  oCustomer:any;
  oRefNo:any;
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController , private storage: Storage, private toastCtrl: ToastController) {
       this.storage.get('_user').then((res)=>{
         this.oUsername = res;
         console.log(this.oUsername);

             // this.doGetClient(this.oUsername);
       })
       this.oClient = navParams.get('oClient');
       this.oCustomer = navParams.get('oCustomer');
       this.oRefNo = navParams.get('oRefNo');

       this.doReceiptReturn(this.oClient, this.oCustomer, this.oRefNo);
  }

  ionViewDidEnter(){

  }

  doReceiptReturn(oClient, oCustomer, oRefNo){
    this.service.get_Receipt_Return_Differ_From_Branch_Return(oClient, oCustomer, oRefNo).then((res)=>{
      this.data_details = res;
      console.log(this.data_details);
    })
  }

  presentToast(key, showCloseButton, position: string) {
    const toast = this.toastCtrl.create({
      message: key,
      showCloseButton: showCloseButton,
      closeButtonText: 'Ok',
      duration: 2000,
      position : position
    });
    toast.present();
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
     this.viewCtrl.dismiss();
   }
}
