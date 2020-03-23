import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Platform, AlertController,NavParams, Content, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Service } from '../../services/service';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage(
  {name:'PickbytaskPage',
  segment: 'Pickbytask'}
)
@Component({
  selector: 'page-pickbytask',
  templateUrl: 'pickbytask.html'
})
export class PickbytaskPage {
    @ViewChild('focusInputScanWo') myInputScanWo;
    @ViewChild('focusInputScanCodeItem') myInputScanCodeItem;
    @ViewChild('focusInputQty') myInputQty;
    @ViewChild('focusInputLocation_Confirm') myInputLocation_Confirm;
    @ViewChild('focusInputPalletTo') myInputPalletTo;
    @ViewChild('focusInputPalletConfirm') myInputPalletConfirm;
    @ViewChild(Content) content: Content;
    oClient:any;
    oWo:any;
    oStatus:any;
    oItem:any;
    oItemNo:any;
    oDesItem:any;
    oUOM:any;
    oQty:any;
    oQtyNew:any;
    oQtyPackUOM:any;
    oLocation:any;
    oLocation_confirm:any;
    oPalletFrom:any;
    oPalletFromConfirm:any;
    oPalletTo:any;
    oDate:any;
    data_item:any;
    loader:any;
    oSupId:any;
    oSup:any;
    oTaskNo:any;
    oActivity:any;
    oColor:any;
    oRoute:any;
    data_item_stock:any;
    data_new_pallet:any;
    data_checkWo:any;
    data_Wo_byItem:any;
    data_movement:any;
    data_checkTask:any;
    data_closePick:any;
    data_wo:any;
    oUsername:any;
  constructor( public navParams: NavParams,public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController, private toastCtrl: ToastController
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
        // this.myInputScanWo.setFocus();
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
  doGetWo(oClient){
    let profileModal = this.modalCtrl.create("WomodalPage", { oClient: oClient, oUsername: this.oUsername });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log("data",data);
        if(data != undefined){
          this.oWo = data.wo_no;
          this.oSup = data.customer_name;
          this.oSupId = data.customer;
          this.doGetDetailWorkOrder(this.oWo, this.oUsername);
        
        }else{

        }

      });
  }
  doGetitemWObyTask(oWo){
    let profileModal = this.modalCtrl.create("itemWObyTaskPage", { oWo: oWo, oUsername: this.oUsername });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
        this.oItem = data.itemNo;
        this.oDesItem = data.description;
        this.oQty = data.qty;
        this.oUOM = data.uom;
        this.oLocation = data.location_from;
        this.oPalletFrom = data.pallet_from;
        this.oDate = data.delivery_date;
        this.oTaskNo = data.task_no;
        this.oActivity = data.activity;
        this.oQtyPackUOM = data.QTY_Dec;
        this.oRoute = data.route;
        setTimeout(()=>{
            this.myInputPalletConfirm.setFocus();
        },0);
        setTimeout(()=>{
            this.myInputPalletConfirm.setFocus();
        },500);
      }else{

      }
      });
  }
  onKeyup(oClient){
    console.log(this.oWo)
    console.log(this.oClient)
    
    let barcode=this.oWo;
    this.service.get_wo(oClient, barcode, this.oUsername).then((res)=>{
      this.data_wo = res;
      this.oSup = this.data_wo["0"].customer_name;
      this.oSupId = this.data_wo["0"].customer;
      console.log(this.data_wo);
    })
     this.doGetDetailWorkOrder(barcode, this.oUsername);
  }
  doGetClient(){
    let profileModal = this.modalCtrl.create("CilentmodelPage");
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        this.oClient = data.client_no;
      });
  }

  doGetDetailWorkOrder(oWo, oUser){
    this.service.get_detail_workorder(oWo, oUser).then((res)=>{
      this.data_item = res;
      console.log("this.data_item",this.data_item);
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

        this.oItem = this.data_item["0"].item_no;
        this.oTaskNo = this.data_item["0"].task_no;
        this.oActivity = this.data_item["0"].activity;
        this.oDesItem = this.data_item["0"].description;
        this.oQty = this.data_item["0"].qty;
        this.oUOM = this.data_item["0"].uom;
        this.oColor = this.data_item["0"].item_color;
        this.oLocation = this.data_item["0"].location_from;
        this.oDate = this.data_item["0"].delivery_date;
        this.oPalletFrom = this.data_item["0"].pallet_from;
        this.oStatus = this.data_item["0"].status;
        this.oQtyPackUOM = this.data_item["0"].QTY_Dec;
        this.oRoute = this.data_item["0"].route;
        this.GetDetailStock(this.oClient, this.oItem,"",this.oUOM)
        setTimeout(()=>{
            this.myInputPalletConfirm.setFocus();
        },0);
        setTimeout(()=>{
            this.myInputPalletConfirm.setFocus();
            this.updateScroll();
        },500);

      }
    })
  }

  doGetDetailWorkOrder_ByItem(oClient, oWo, oItemNO){
    this.service.get_detail_workorder_by_item(oWo, oItemNO, this.oUsername).then((res)=>{
      this.data_Wo_byItem = res;
      console.log(this.data_Wo_byItem);

      if(this.data_Wo_byItem.length <= 0){
        // this.presentToast('ไม่พบ Item', false, 'bottom');
        this.oStatus = "";
        this.oQtyNew = "";
      }else{
            this.oStatus = this.data_Wo_byItem["0"].status;
            this.oQtyNew = this.data_Wo_byItem["0"].qty;
            this.doGetWoStockMovement(oClient, oWo, this.oUsername);
      }
    })
  }
  GetDetailStock(oClient,oItem, oGrade, oUOM){
    console.log(oClient,oItem, oGrade, oUOM);
    this.service.Get_ItemLocationsGrade_order_lot(oClient,oItem, oGrade, oUOM).then((res)=>{
      this.data_item_stock = res;
      console.log(this.data_item_stock);

      // console.log(this.data_item_stock.length);
      // var total = 0;
      // for(let i=0; i < this.data_item_stock.length ; i++){
      //   var qty = +this.data_item_stock[i].qty;
      //   total = total + qty;
      //
      //   console.log(total);
      // }
      // this.oQty = total;
    })
  }
  doGetWoStockMovement(oClient, oWO, oMaker){
    this.service.get_wo_stockmovement(oClient, oWO, oMaker).then((res)=>{
      this.data_movement = res;
      console.log(this.data_movement);
    })
  }
  doPickItem(oLocation, oPalletFrom, oPalletFromConfirm, oLocation_confirm, oWo, oTaskNo, oActivity, oUOM, oQtyNew, oQty){
    
    console.log(oQtyNew," ",oQty["0"]);
    
    if(oLocation != oLocation_confirm)
    {
        this.presentToast('โปรดกรอก Location ให้ตรงกัน', false, 'bottom');
    }
    else if(oLocation_confirm == "" || oLocation_confirm == undefined)
    {
        this.presentToast('โปรดกรอก Location', false, 'bottom');
    }
    else if(oPalletFrom != oPalletFromConfirm)
    {
        this.presentToast('โปรดกรอก Pallet ให้ตรงกัน', false, 'bottom');
    }
    else if(oQtyNew == "" || oQtyNew == undefined || oQtyNew == 0)
    {
        this.presentToast('โปรดกรอก Qty', false, 'bottom');
    }
    /*else if(oQtyNew  > oQty)
    {
        this.presentToast('จำนวนไม่ควรเกิน '+ oQty, false, 'bottom');
    }
    else if(typeof oQtyNew  != "number")
    {
        this.presentToast('กรุณากรอกตัวเลข '+ oQty, false, 'bottom');
    }*/
    else
    {
      this.oPalletTo = oPalletFromConfirm;
      this.doClosePickTask(oWo, oTaskNo, oActivity, oQtyNew, "", this.oUsername, oUOM, this.oPalletTo,oQty);
    }
  }
  doCheckPrePick(oWo, oPallet, oPalletFromConfirm, oTaskNo, oActivity, oUom, oQty){
    console.log(oUom);
    this.service.check_task(oWo, oPallet, oTaskNo, oActivity, oUom, oQty, this.oUsername).then((res)=>{
      this.data_checkTask = res;
      console.log(this.data_checkTask);

      if(this.data_checkTask.length > 0){
        if(this.data_checkTask["0"].sqlstatus == "0"){
          if(oPallet != oPalletFromConfirm){
            //this.presentToast('โปรดกรอก Pallet ให้ตรงกัน', false, 'bottom');
            this.Alert('Error', 'โปรดกรอก Pallet ให้ตรงกัน');
            this.oPalletFromConfirm = "";
            this.myInputPalletConfirm.setFocus();
          }else{
            setTimeout(()=>{
                this.myInputLocation_Confirm.setFocus();
            },0);
            setTimeout(()=>{
                this.myInputLocation_Confirm.setFocus();
                this.updateScroll();
            },200);
          }

        }else{
         
      }
    }else{
        this.presentToast('ไม่พบข้อมูล', false, 'bottom');
    }
    })
  }
  doLocation(oLocation, oLocation_confirm, oQty){
    if(oLocation != oLocation_confirm){
      this.Alert('Error', 'โปรดกรอก Location ให้ตรงกัน');
    }else{
      this.oQtyNew = oQty;

      setTimeout(()=>{
          this.myInputLocation_Confirm.setFocus();
      },0);
      setTimeout(()=>{
          this.myInputLocation_Confirm.setFocus();
          this.updateScroll();
      },200);
    }
  }
  doClosePickTask(oWo, oTaskNo, oActNO, oQtyPick, oReasonCode, oMaker, oUOM, oPalletTo,oQty){
    this.service.close_picktask(oWo, oTaskNo, oActNO, oQtyPick, oReasonCode, this.oUsername, oUOM, oPalletTo).then((res)=>{
      this.data_closePick = res;
      console.log(this.data_closePick);
      if(this.data_closePick.length < 0){
        this.presentToast('completed', false, 'bottom');
      }
      else if(this.data_closePick["0"].sqlstatus == "0"){
        this.doGetDetailWorkOrder(oWo, this.oUsername);
        this.doClearInput();
        this.presentToast(this.data_closePick["0"].sqlmsg, false, 'bottom');
        setTimeout(()=>{
            this.myInputPalletConfirm.setFocus();
        },0);
        setTimeout(()=>{
            this.myInputPalletConfirm.setFocus();
            this.updateScroll();
        },500);
      }else{
        //this.doClear(); 
        if(this.data_checkTask["0"].sqlstatus["0"] = "-32"){
            this.presentToast('จำนวนไม่ควรเกิน '+ oQty, false, 'bottom');
          }else{
            this.presentToast(this.data_checkTask["0"].sqlmsg["0"], false, 'bottom');
          }
       
      }
    })
  }

  doClear(){
    this.oWo = "";
    this.oItem = "";
    this.oDesItem = "";
    this.oQty = "";
    this.oUOM = "";
    this.oLocation = "";
    this.oDate = "";
    this.oDate = "";
    this.oStatus = "";
    this.oLocation_confirm = "";
    this.data_item = "";
    this.oSup = "";
    this.oTaskNo = "";
    this.oActivity = "";
    this.oColor = "";
    this.oQtyNew = "";
    this.oItemNo = "";
    this.oPalletTo = "";
    this.oPalletFrom = "";
    this.oPalletFromConfirm = "";
    this.oRoute = "";
    this.oQtyPackUOM = "";
    this.data_item_stock = [];
  }
  doClearInput(){
    this.oQtyNew = "";
    this.oPalletTo = "";
    this.oLocation_confirm = "";
    this.oPalletFromConfirm = "";
  }
  doClearDetail(){
    this.oItem = "";
    this.oDesItem = "";
    this.oQty = "";
    this.oUOM = "";
    this.oLocation = "";
    this.oDate = "";
    this.oDate = "";
    this.oStatus = "";
    this.oLocation_confirm = "";
    this.data_item = "";
    this.oSup = "";
    this.oTaskNo = "";
    this.oActivity = "";
    this.oColor = "";
  }
  doGetNewPallet(oClient){
    if(oClient != ""){
      console.log("N",oClient);
      this.service.get_new_pallet(oClient).then((res)=>{
        this.data_new_pallet = res;
        console.log(this.data_new_pallet)
        this.oPalletTo = this.data_new_pallet.Column1;
      })
    }
  }
  barcodeOnClick(){
    setTimeout(()=>{
      this.keyboard.close();
      this.myInputScanWo.setFocus();
    },0);
    setTimeout(()=>{
      this.myInputScanWo.setFocus();
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
  Alert(title, subTitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [ {
          text: 'ตกลง',
          handler: data => {

          }
        }]
    });
    alert.present();
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
