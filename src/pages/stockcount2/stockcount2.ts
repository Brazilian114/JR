import { Component } from '@angular/core';
import { NavController, ToastController, ModalController, IonicPage} from 'ionic-angular';

import { Service } from '../../services/service';

@IonicPage(
  {name:'Stockcount2Page',
  segment: 'Stockcount2'}
)

@Component({
  selector: 'page-stockcount2',
  templateUrl: 'stockcount2.html'
})
export class Stockcount2Page {
    data_warehouse:any;
    data_new_pallet:any;
    oClient:any;
    oStk:any;
    oZone:any;
    oItem:any;
    oDes:any;
    oLoc:any;
    oPallet:any;
    listWH:any;
    listGrade:any;
    listUOM:any;
    listExp:any = new Date().toISOString();
    listMfg:any = new Date().toISOString();
    listRcpt:any = new Date().toISOString();
  constructor(public navCtrl: NavController, private service: Service, private toastCtrl: ToastController, private modalCtrl: ModalController) {

  }

  doGetStk(oClient){
    if(this.oClient == undefined){
      this.presentToast('โปรดระบุ Client.', false, 'bottom');
    }else{
    let profileModal = this.modalCtrl.create("StkmodalPage", { oClient: oClient });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oStk = data.stocktake_ref;
        }else{

        }
      });
    }
  }
  doGetLocation(oClient, oWarehouse, oStockRef, oLocation){
    if(oClient == undefined || oClient == ""){
      this.presentToast('โปรดระบุ Client.', false, 'bottom');
    }else if(oStockRef == undefined || oStockRef == ""){
      this.presentToast('โปรดระบุ StockRef.', false, 'bottom');
    }else if(oWarehouse == undefined || oWarehouse == ""){
      this.presentToast('โปรดระบุ Warehouse.', false, 'bottom');
    }else{
      if(oLocation == undefined){
        oLocation = "";
      let profileModal = this.modalCtrl.create("LocationmodalPage", { oClient: oClient, oWH: oWarehouse, oStockRef: oStockRef, oLocation: oLocation });
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log(data);
        if(data != undefined){
          this.oLoc = data.destLoc;
          this.oZone = data.zone;
        }else{

        }
        });
      }
    }
  }
  doGetWarehouse(oClient){
    this.service.get_ClientWarehouse(oClient).then((res)=>{
      this.data_warehouse = res;
      console.log(this.data_warehouse);
    })
  }
  doGetNewPallet(oClient){
    if(oClient != ""){
      console.log(oClient);
      this.service.get_new_pallet(oClient).then((res)=>{
        this.data_new_pallet = res;
        console.log(this.data_new_pallet)
        this.oPallet = this.data_new_pallet.Column1;
      })
    }
  }
  doGetUOM(oClient, oItemNO){
    this.service.get_UOM(oClient, oItemNO).then((res)=>{
      this.listUOM = res;
      console.log(this.listUOM);
    })
  }
  doGetGrade(){
    this.service.get_Grade().then((res)=>{
      this.listGrade = res;
      console.log(this.listGrade);
    })
  }
  doGetItemNo(oClient){
    let profileModal = this.modalCtrl.create("ItemNomodalPage", { oClient: oClient });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
      if(data != undefined){
        this.oItem = data.itemNo;
        this.oDes = data.description;

        this.doGetUOM(oClient, this.oItem);
        this.doGetGrade();
      }else{

      }
      });
  }
  doClear(){
    this.oClient = "";
    this.oStk = "";
    this.oZone = "";
    this.oItem = "";
    this.oDes = "";
    this.oLoc = "";
    this.listWH = [];
    this.listGrade = [];
    this.listUOM = [];
  }
  doPage1(){
    this.navCtrl.setRoot("StockcountPage");
  }
  doMain(){
    this.navCtrl.setRoot("OperationPage");
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
