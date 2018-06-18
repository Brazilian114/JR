import { Component } from '@angular/core';
import { NavController, NavParams, ToastController  } from 'ionic-angular';


import { SaleReturnHeaderPage } from '../salereturnheader/salereturnheader';
import { CheckinOrderPage } from '../checkinorder/checkinorder';
import { ReservationOrderPage } from '../reservationorder/reservationorder';

import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-operationBranch',
  templateUrl: 'operationBranch.html'
})
export class OperationBranchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private network: Network, private toastCtrl: ToastController) {

  }
  doReservationOrder(){
    if(this.network.type !== 'none'){
      this.navCtrl.push(SaleReturnHeaderPage);
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doCheckinOrder(){
    if(this.network.type !== 'none'){
      this.navCtrl.push(CheckinOrderPage);
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doOrdering(){
    if(this.network.type !== 'none'){
      this.navCtrl.push(ReservationOrderPage);
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
