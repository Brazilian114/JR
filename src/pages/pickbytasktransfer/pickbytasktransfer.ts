import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Content, AlertController, Platform, IonicPage  } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Service } from '../../services/service';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage(
  {name:'PickbytaskTransferPage',
  segment: 'PickbytaskTransfer'}
)
@Component({
  selector: 'page-pickbytasktransfer',
  templateUrl: 'pickbytasktransfer.html'
})
export class PickbytaskTransferPage {
    @ViewChild('focusInputScanWo') myInputScanWo;
    @ViewChild('focusInputScanCodeItem') myInputScanCodeItem;
    @ViewChild('focusInputQty') myInputQty;
    @ViewChild('focusInputLocation_Confirm') myInputLocation_Confirm;
    @ViewChild('focusInputPallet_Confirm') myInputPallet_Confirm;
    @ViewChild(Content) content: Content;
    oClient:string = "GTP";
    oWo:string;
    oStatus:string;
    oItem:string;
    oItemNo:string;
    oDesItem:string;
    oUOM:string;
    oQty:string;
    oOrderNo:string;
    oQtyPick:string;
    oPallet:string;
    oPalletCon:string;
    oDate:any;
    data_item:any;
    loader:any;
    oSup:string;
    oTaskNo:string;
    oActivity:string;
    oColor:string;
    data_checkWo:any;
    data_Wo_byItem:any;
    data_movement:any;
    data_checkTask:any;
    data_closePick:any;
    data_StatusCheck:any;
    oUsername:string;
    oLocFr:string;
    oLocTo:string;
    oZoneFr:string;
    oZoneTo:string;
    oWarehouseFr:string;
    oWarehouseTo:string;
    oReasonCode:string = "";
    oLocation_confirm:string;
  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private storage: Storage, private keyboard: Keyboard, private alertCtrl: AlertController, public platform: Platform) {
        this.storage.get('_user').then((res)=>{
          this.oUsername = res;
        })
  }
  doClick(){
    this.updateScroll();
  }
  ionViewDidEnter(){
    this.platform.ready().then(() => {
      this.keyboard.disableScroll(true);
    });
    setTimeout(()=>{
        this.barcodeOnClick();
        this.myInputScanWo.setFocus();
    },0);
    setTimeout(()=>{
        this.barcodeOnClick();
    },200);
  }
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }
  doGetWo(oClient, oWo){
    let frag = 1;
    let profileModal = this.modalCtrl.create("WomodalPage", { oClient: oClient, oWo:oWo , oUsername: this.oUsername, frag: frag });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log("ข้อมูลหลังเลือก Dialog WO",data); //"'ข้อมูลหลังเลือก Dialog WO'+"oWo ก่อนส่งเข้า service",oWo
        if(data != undefined){
          this.oWo = data.wo_no;
          console.log(this.oWo); 
          if(this.oWo != ""){
            this.doGetDetailWorkOrder(this.oWo, this.oUsername);
          }else{
            this.presentToast('ไม่พบ Work Order', false, 'bottom');
          }
        }else{

        }
      });
  }
  doGetitemWObyTask(oWo){
    let frag = 1;
    let profileModal = this.modalCtrl.create("itemWObyTaskPage", { oWo: oWo, oUsername: this.oUsername, frag: frag });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oSup = data.customer_name;
          this.oItem = data.itemNo;
          this.oDesItem = data.description;
          this.oQty = data.qty;
          this.oUOM = data.uom;
          this.oLocFr = data.location_from;
          this.oLocTo = data.location_to;
          this.oPallet = data.pallet_from;
          this.oDate = data.delivery_date;
          this.oTaskNo = data.task_no;
          this.oActivity = data.activity;
          this.oWarehouseFr = data.warehouse_from;
          this.oWarehouseTo = data.warehouse_to;
          this.oZoneFr = data.zone_from;
          this.oZoneTo = data.zone_dest;
          this.oQtyPick = data.qty;
          setTimeout(()=>{
              this.myInputPallet_Confirm.setFocus();
          },0);
          setTimeout(()=>{
              this.myInputPallet_Confirm.setFocus();
          },500);
        }else{

        }
      });
  }
  onKeyup(){
    console.log(this.oWo)
    let barcode=this.oWo;
     this.doGetDetailWorkOrder(barcode, this.oUsername);
  }

  doGetDetailWorkOrder(oWo,oUsername){
    if(oWo == undefined){
      this.presentToast('กรุณากรอก Work Order', false, 'bottom');
    }else{
        console.log("oWo ก่อนส่งเข้า service",oWo);
      this.service.get_Detail_Tranfer_WorkOrder(oWo,oUsername).then((res)=>{
        this.data_item = res;
        console.log(this.data_item);
          if(this.data_item.length <= 0){
            let alert = this.alertCtrl.create({
              title: 'Success',
              subTitle: 'All Pick tasks for Work order '+oWo+' Completed. Work Order has been successfully Closed.',
              buttons: [ {
                  text: 'ตกลง',
                  handler: data => {
                    this.doClear();
                  }
                }]
            });
            alert.present();
        }else{
          this.oSup = this.data_item["0"].customer_name;
          this.oOrderNo = this.data_item["0"].order_no
          this.oItem = this.data_item["0"].item_no;
          this.oTaskNo = this.data_item["0"].task_no;
          this.oActivity = this.data_item["0"].activity;
          this.oDesItem = this.data_item["0"].description;
          this.oQty = this.data_item["0"].qty;
          this.oUOM = this.data_item["0"].uom;
          this.oLocFr = this.data_item["0"].location_from;
          this.oLocTo = this.data_item["0"].location_to;
          this.oDate = this.data_item["0"].delivery_date;
          this.oPallet = this.data_item["0"].pallet_from;
          this.oStatus = this.data_item["0"].status;
          this.oWarehouseFr = this.data_item["0"].warehouse_from;
          this.oWarehouseTo = this.data_item["0"].warehouse_to;
          this.oZoneFr = this.data_item["0"].zone_from;
          this.oZoneTo = this.data_item["0"].zone_dest;
          this.oQtyPick = this.data_item["0"].qty;

          setTimeout(()=>{
              this.myInputPallet_Confirm.setFocus();
          },0);
          setTimeout(()=>{
              this.myInputPallet_Confirm.setFocus();
              this.updateScroll();
          },500);

        }
      })
    }
  }
  doPalletChange(){
    setTimeout(() => {
        this.myInputScanCodeItem.setFocus();
    }, 0)
    setTimeout(() => {
        this.updateScroll();
    }, 200)
  }
  enterItem(){
    setTimeout(() => {
        this.myInputQty.setFocus();
    }, 0)
    setTimeout(() => {
        this.updateScroll();
    }, 200)
  }
  doGetDetailWorkOrder_ByItem(oClient, oWo, oItemNO){
    this.service.get_detail_workorder_by_item(oWo, oItemNO, this.oUsername).then((res)=>{
      this.data_Wo_byItem = res;
      console.log(this.data_Wo_byItem);

      if(this.data_Wo_byItem.length <= 0){
        // this.presentToast('ไม่พบ Item', false, 'bottom');
        this.oStatus = "";
        this.oQtyPick = "";
      }else{
            this.oStatus = this.data_Wo_byItem["0"].status;
            this.oQtyPick = this.data_Wo_byItem["0"].qty;
            this.doGetWoStockMovement(oClient, oWo, this.oUsername);
      }
    })
  }
  doGetWoStockMovement(oClient, oWO, oMaker){
    this.service.get_wo_stockmovement(oClient, oWO, oMaker).then((res)=>{
      this.data_movement = res;
      console.log(this.data_movement);
      this.myInputLocation_Confirm.setFocus();
    })
  }
  doClosePickTaskTransfer(oWo, oTaskNo, oActNO, oQtyPick, oReasonCode, oLocTo, oUOM){
    this.service.closePickTaskTranfer(oWo, oTaskNo, oActNO, oQtyPick, oUOM, oReasonCode, oLocTo, this.oUsername).then((res)=>{
      this.data_closePick = res;
      console.log(this.data_closePick);
      // this.presentToast(this.data_closePick["0"].sqlmsg, false, 'bottom');
      if(this.data_closePick["0"].sqlstatus == "0"){
        this.doGetDetailWorkOrder(oWo,this.oUsername);
        this.oLocation_confirm = "";
        this.oPalletCon = "";
      }else{
        this.doClear();
      }
    })
  }
  doPickItem(oLocFr, oLocTo, oWo, oTaskNo, oActivity, oQtyPick, oPallet, oPalletCon, oItem, oItemNo, oLocation_confirm, oUOM){
    if(oPallet != oPalletCon){
      this.presentToast('โปรดระบุเลข Pallet ให้ตรงกัน', false, 'bottom');
    }else if(oLocFr != oLocation_confirm){
      this.presentToast('โปรดระบุเลข Location ให้ตรงกัน', false, 'bottom');
    }else if(oQtyPick == "" || oQtyPick == undefined){
      this.presentToast('โปรดระบุจำนวน', false, 'bottom');
    }else{
      console.log("statusLocation",this.oWarehouseFr, this.oZoneFr, oLocFr, this.oWarehouseTo, this.oZoneTo, oLocTo)
      this.service.statusLocation(this.oWarehouseFr, this.oZoneFr, oLocFr, this.oWarehouseTo, this.oZoneTo, oLocTo).then((res)=>{
        this.data_StatusCheck = res;
        console.log(this.data_StatusCheck);
        if(this.data_StatusCheck == 0){
          this.doClosePickTaskTransfer(oWo, oTaskNo, oActivity, oQtyPick, this.oReasonCode, oLocTo, oUOM);
        }
      })
    }
  }
  doClear(){
    this.oWo = "";
    this.oItem = "";
    this.oQty = "";
    this.oUOM = "";
    this.oDate = "";
    this.oDate = "";
    this.oStatus = "";
    this.data_item = "";
    this.oSup = "";
    this.oTaskNo = "";
    this.oActivity = "";
    this.oColor = "";
    this.oQtyPick = "";
    this.oItemNo = "";
    this.oOrderNo = "";
    this.oLocFr = "";
    this.oLocTo = "";
    this.oPallet = "";
    this.oPalletCon = "";
    this.oDesItem = "";
    this.oLocation_confirm = "";

    setTimeout(()=>{
      this.myInputPallet_Confirm.setFocus();
    },200);
  }
  doClearDetail(){
    this.oItem = "";
    this.oDesItem = "";
    this.oQty = "";
    this.oUOM = "";
    this.oDate = "";
    this.oDate = "";
    this.oStatus = "";
    this.data_item = "";
    this.oSup = "";
    this.oTaskNo = "";
    this.oActivity = "";
    this.oColor = "";
  }
  doBack(){
      this.navCtrl.setRoot("HomePage");
  }
  barcodeOnClick(){
    setTimeout(()=>{
      this.keyboard.close();
    },0);
    setTimeout(()=>{
      this.keyboard.close();
    },200)
  }
  clickInput(){
    setTimeout(()=>{
      this.keyboard.show();
    },0);
    setTimeout(()=>{
      this.keyboard.show();
    },200)
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
}
