import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';

import { Network } from '@ionic-native/network';

@IonicPage(
  {name:'OperationBranchPage',
  segment: 'OperationBranch'}
)
@Component({
  selector: 'page-operationBranch',
  templateUrl: 'operationBranch.html'
})
export class OperationBranchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private network: Network, private toastCtrl: ToastController) {

  }
  doReservationOrder(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("SaleReturnHeaderPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doCheckinOrder(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("CheckinOrderPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doOrdering(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("ReservationOrderPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
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
}
