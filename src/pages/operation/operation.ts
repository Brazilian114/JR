import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';

import { Network } from '@ionic-native/network';

@IonicPage(
  {name:'OperationPage',
  segment: 'Operation'}
)

@Component({
  selector: 'page-operation',
  templateUrl: 'operation.html'
})
export class OperationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private network: Network, private toastCtrl: ToastController) {

  }
  doCheckIn(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("CheckinPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doCheckInOther(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("CheckinotherPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doPutaway(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("PutawayPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doPickbytask(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("PickbytaskPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doPicksummary(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("PicksummaryPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doItemrelocation(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("ItemrelocationPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doStockadjustmentPage(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("StockadjustmentPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doPalletrelocationPage(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("PalletrelocationPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doLocationinvquePage(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("LocationinvquePage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    };
  }
  doLocationrelocationPage(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("LocationrelocationPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doStockcountPage(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("StockcountPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doIteminvquePage(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("IteminvquePage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doPickbytaskTransfer(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("PickbytaskTransferPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doPickbyorder(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("PickbyorderPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doReplenishment(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("ReplenishmentPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doLoadToTruck(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("LoadtotruckPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doLoadToTruckPack(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("LoadtotruckPackCartonPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doReceiptCheckinReturn(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("ReceiptCheckinReturnPage");
    }else if(this.network.type === 'none'){
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }else{
      this.presentToast('Please Check your network and try again', false, 'bottom');
    }
  }
  doCheckPallet(){
    if(this.network.type !== 'none'){
      this.navCtrl.push("CheckpalletPage");
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
