import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, Content, IonicPage } from 'ionic-angular';

import { Keyboard } from '@ionic-native/keyboard';

import { Service } from '../../services/service';

@IonicPage(
  {name:'LocationinvquePage',
  segment: 'Locationinvque'}
)

@Component({
  selector: 'page-locationinvque',
  templateUrl: 'locationinvque.html'
})
export class LocationinvquePage {
  @ViewChild('focusInputWH') InputWH;
  @ViewChild('focusInputLoc') InputLoc;
  @ViewChild(Content) content: Content;

  data_listPallet:any;
  oWH:any;
  oLoc:any;
  constructor(public navCtrl: NavController, private service: Service, private modalCtrl: ModalController, private keyboard: Keyboard) {

  }
  ionViewDidEnter(){
    setTimeout(()=>{
        this.keyboard.close();
          this.InputWH.setFocus();
    },0);
    setTimeout(()=>{
        this.keyboard.close();
    },100);
  }
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }
  doGetWH(){
    let profileModal = this.modalCtrl.create("WarehousemodalPage");
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oWH = data.warehouse;

          setTimeout(()=>{
              this.keyboard.close();
              this.InputLoc.setFocus();
          },0);
          setTimeout(()=>{
              this.InputLoc.setFocus();
              this.keyboard.close();
          },200);
        }else{

        }
      });
  }
  doGetLocationAll(oWH){
    let profileModal = this.modalCtrl.create("LocationmodalPage", { oWH: oWH });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oLoc = data.destLoc;

          this.doGetListPalletInLocation(oWH, this.oLoc);
        }else{

        }
      });
  }

  doGetListPalletInLocation(oWH, oLoc){
    this.service.get_ListPalletInLocation(oWH, oLoc).then((res)=>{
      this.data_listPallet = res;
      console.log(this.data_listPallet);
    })
  }
  doClear(){
    this.data_listPallet = [];
    this.oWH = "";
    this.oLoc = "";
  }
}
