import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Platform, AlertController, Content, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Service } from '../../services/service';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage(
  {name:'PicksummaryPage',
  segment: 'Picksummary'}
)
@Component({
  selector: 'page-picksummary',
  templateUrl: 'picksummary.html'
})
export class PicksummaryPage {
    @ViewChild('focusInputScanWo') myInputScanWo;
    @ViewChild('focusInputScanCodeItem') myInputScanCodeItem;aa
    @ViewChild('focusInputQty') myInputQty;
    @ViewChild('focusInputLocation_Confirm') myInputLocation_Confirm;
    @ViewChild('focusInputPalletTo') myInputPalletTo;
    @ViewChild('focusInputPalletConfirm') myInputPalletConfirm;
    @ViewChild('focusInputBacodeConfirm') myInputBarcodeConfirm;
    @ViewChild('focusQtyNew') myInputQtyNew;

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
    oQty_Group:any;
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
    oExp:any;
    oProd:any;
    oBacth:any;
    oBatch:any;
    oLot:any;
    oUomNew: any;

    data_new_pallet:any;
    data_checkWo:any;
    data_Wo_byItem:any;
    data_movement:any;
    data_checkTask:any;
    data_closePick:any;
    data_barcodeDetail:any;
    data_wo:any;
    oUsername:any;
    oBarcode_confirm:any;
    oBarcode_confirm_scan_chk:any;

  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private storage: Storage, private keyboard: Keyboard, private alertCtrl: AlertController, public platform: Platform) {
        this.storage.get('_user').then((res)=>{
          this.oUsername = res;
          console.log(this.oUsername)
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
    doGetClient(){
      let profileModal = this.modalCtrl.create("CilentmodelPage");
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log(data);
          this.oClient = data.client_no;
        });
    }
  doGetWo(oClient){
    let profileModal = this.modalCtrl.create("WomodalPage", { oClient: oClient, oUsername: this.oUsername });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oWo = data.wo_no;
          this.oSup = data.customer_name;
          this.oSupId = data.customer;
          this.doGetDetailWorkOrder(this.oWo,this.oClient, this.oUsername);
        }else{

        }

      });
  }
  doGetWoSum(oClient){
    let frag = 3;
    console.log('oClient:',oClient, 'oUsername:', this.oUsername,'frag:', frag);
    let profileModal = this.modalCtrl.create("WomodalPage", { oClient: oClient, oUsername: this.oUsername,frag: frag });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oWo = data.wave_pick_no;
         this.doGetDetailWorkOrder(this.oWo,this.oClient, this.oUsername);
        }else{

        }

      });
  }

  onKeyup(oClient,oWo){
    console.log(this.oWo)
    console.log("onKeyup",this.oUsername)
    let barcode=this.oWo;
    this.service.get_wo_sum(oClient, oWo, this.oUsername).then((res)=>{
      this.data_wo = res;
      console.log("this.data_wo : ",this.data_wo)
      // this.oSup = this.data_wo["0"].customer_name;
      // this.oSupId = this.data_wo["0"].customer;
      // console.log(this.data_wo);
      this.oWo = this.data_wo.wave_pick_no;

      this.doGetDetailWorkOrder(oWo, oClient, this.oUsername);
    })
  }


  doGetitemWObyTask(oWo,oClient){
    let profileModal = this.modalCtrl.create("itemPickSumPage", { oWo: oWo, oClient:oClient, oUsername: this.oUsername });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
        this.oItem = data.item_no;
        this.oDesItem = data.description;
        this.oQty = data.qty;
        this.oUOM = data.uom;
        this.oLocation = data.location_from;
        this.oPalletFrom = data.pallet_from;
        this.oStatus = data.status;
        this.oExp = data.expiry_date;
        this.oProd = data.prod_date;
        this.oBatch = data.batch_no;
        this.oQty_Group=data.qty_uom1+" | "+data.qty_uom2;
        this.oLot = data.lot_no;
        setTimeout(()=>{
            this.myInputLocation_Confirm.setFocus();
        },0);
        setTimeout(()=>{
            this.myInputLocation_Confirm.setFocus();
        },500);
      }else{

      }
      });
  }


  doGetDetailWorkOrder(oWo,oClient, oUsername){
    this.service.get_detail_pick_sum(oWo,oClient,oUsername).then((res)=>{
      this.data_item = res;
      console.log("this.data_item",this.data_item);
        if(this.data_item.length <= 0){
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Work order '+oWo+' นี้ได้ทำการหยิบเสร็จเรียบร้อยแล้ว.',
            buttons: [ {
                text: 'ตกลง',
                handler: data => {
                  this.doClear();
                }
              }]
          });
          alert.present();
      }else{
        this.oQty_Group = "";
        this.oItem = this.data_item["0"].item_no;

        this.oDesItem = this.data_item["0"].description;
        this.oQty_Group=this.data_item["0"].qty_uom1+" | "+this.data_item["0"].qty_uom2;
        this.oQty = this.data_item["0"].qty;
        this.oUOM = this.data_item["0"].uom;
        this.oColor = this.data_item["0"].item_color;
        this.oLocation = this.data_item["0"].location_from;
        this.oPalletFrom = this.data_item["0"].pallet_from;
        this.oStatus = this.data_item["0"].status;
        this.oExp = this.data_item["0"].expiry_date;
        this.oProd = this.data_item["0"].prod_date;
        this.oBatch = this.data_item["0"].batch_no;
        this.oLot = this.data_item["0"].lot_no;
        this.oLocation.toString().trim()
        setTimeout(()=>{
            this.myInputLocation_Confirm.setFocus();
        },0);
        setTimeout(()=>{
            this.myInputLocation_Confirm.setFocus();
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
  doGetWoStockMovement(oClient, oWO, oMaker){
    this.service.get_wo_stockmovement(oClient, oWO, oMaker).then((res)=>{
      this.data_movement = res;
      console.log(this.data_movement);
    })
  }
  doPickItem(oLocation, oPalletFrom, oPalletFromConfirm, oPalletTo, oLocation_confirm, oWo, oTaskNo, oActivity, oUOM, oQtyNew){
    if(oLocation != oLocation_confirm){
        this.presentToast('โปรดกรอก Location ให้ตรงกัน', false, 'bottom');
    }else if(oLocation_confirm == "" || oLocation_confirm == undefined){
        this.presentToast('โปรดกรอก Location', false, 'bottom');
    }else if(oPalletFrom != oPalletFromConfirm){
        this.presentToast('โปรดกรอก Pallet ให้ตรงกัน', false, 'bottom');
    }else if(oPalletTo == "" || oPalletTo == undefined){
        this.presentToast('โปรดกรอก Pallet To', false, 'bottom');
    }else if(oQtyNew == "" || oQtyNew == undefined || oQtyNew == 0){
        this.presentToast('โปรดกรอก Qty', false, 'bottom');
    }
    else{
      this.doClosePickTask(oWo, oTaskNo, oActivity, oQtyNew, "", this.oUsername, oUOM, oPalletTo);
    }
  }

  doPickItemSum(oLocation, oPalletFrom, oPalletFromConfirm , oLocation_confirm, oWo, oUOM, oQtyNew, oItem,  oBacth, oExp, oProd, oLot){
console.log("doPickItemSum_1",oLocation, oPalletFrom, oPalletFromConfirm , oLocation_confirm, oWo, oUOM, oQtyNew, oItem,  oBacth, oExp, oProd, oLot);
    if(oLocation != oLocation_confirm){
        this.presentToast('โปรดกรอก Location ให้ตรงกัน', false, 'bottom');
        this.myInputLocation_Confirm.setFocus();
        this.updateScroll();
    }else if(oLocation_confirm == "" || oLocation_confirm == undefined){
        this.presentToast('โปรดกรอก Location', false, 'bottom');
        this.myInputLocation_Confirm.setFocus();
        this.updateScroll();
    }else if(oPalletFrom != oPalletFromConfirm){
        this.presentToast('โปรดกรอก Pallet ให้ตรงกัน', false, 'bottom');
        this.myInputPalletConfirm.setFocus();
        this.updateScroll();
    }
    else if(oQtyNew == "" || oQtyNew == undefined || oQtyNew == 0){
        this.presentToast('โปรดกรอก Qty', false, 'bottom');
        this.myInputQtyNew.setFocus();
        this.updateScroll();
    }
    else if(oQtyNew > this.oQty){
        this.presentToast('จำนวนไม่ควรเกิน '+this.oQty, false, 'bottom');
        this.myInputQtyNew.setFocus();
        this.updateScroll();
    }
    // else if(oItem != this.oBarcode_confirm_scan_chk){
    //   console.log('oItem',oItem,'this.oBarcode_confirm_scan_chk',this.oBarcode_confirm_scan_chk);
    //     this.presentToast('บาร์โค้ดสินค้าทีแสกน ไม่ตรงกับที่ระบบ Assign!!', false, 'bottom');
    //     this.myInputBarcodeConfirm.setFocus();
    //     this.updateScroll();
    // }
    else{
      console.log("doPickItemSum",oLocation, oPalletFrom, oPalletFromConfirm , oLocation_confirm, oWo, oUOM, oQtyNew, oItem,  oBacth, oExp, oProd, oLot);
      this.service.close_pickSum(oWo, this.oUsername, oQtyNew, oUOM, oPalletFromConfirm, oLocation_confirm, oItem,  oBacth, oExp, oProd, oLot).then((res)=>{
        this.data_closePick = res;
        console.log(this.data_closePick);
        if(this.data_closePick.length < 0){
          this.presentToast(this.data_closePick["0"].sqlmsg, false, 'bottom');
        }
        else if(this.data_closePick["0"].sqlstatus == "0"){
          this.presentToast(this.data_closePick["0"].sqlmsg, false, 'bottom');
          this.doGetDetailWorkOrder(oWo,this.oClient, this.oUsername);

          this.doClearInput();
          setTimeout(()=>{
              this.myInputPalletConfirm.setFocus();
          },0);
          setTimeout(()=>{
              this.myInputPalletConfirm.setFocus();
              this.updateScroll();
          },500);
        }else{
          this.doClear();
        }
      })
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
            this.Alert('Error', 'โปรดกรอก Pallet ให้ตรงกัน');
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
          this.Alert('Error', this.data_checkTask["0"].sqlmsg);
      }
    }else{
        this.presentToast('ไม่พบข้อมูล', false, 'bottom');
    }
    })
  }

doCheckPallet(oPalletFr, oPalletTo, oUOM){
  if(oPalletFr != oPalletTo)
  {
      //this.Alert('Error', 'โปรดกรอก Pallet ให้ตรงกัน')
      this.presentToast('โปรดกรอก Pallet ให้ตรงกัน', false, 'bottom');
      setTimeout(()=>{
          this.myInputPalletConfirm.setFocus();
      },0);

      setTimeout(()=>{
          this.myInputPalletConfirm.setFocus();
          this.updateScroll();
      },500);
      return;
  }else
  this.oUomNew = oUOM;
  setTimeout(()=>{
      this.myInputBarcodeConfirm.setFocus();
  },0);
  setTimeout(()=>{
        this.myInputBarcodeConfirm.setFocus();
      this.updateScroll();
  },500);


}



  doLocation(oLocation, oLocation_confirm, oQty){
    this.oLocation_confirm = oLocation_confirm.toString().trim();
    setTimeout(()=>{
    if(oLocation.toString().trim() != this.oLocation_confirm){
      //this.Alert('Error', 'โปรดกรอก Location ให้ตรงกัน');
      this.presentToast('โปรดกรอก Location ให้ตรงกัน', false, 'bottom');
      setTimeout(()=>{
          this.myInputLocation_Confirm.setFocus();
      },0);
      setTimeout(()=>{
            this.myInputLocation_Confirm.setFocus();
          this.updateScroll();
      },500);
      return;
    }else{
      setTimeout(()=>{
          this.myInputPalletConfirm.setFocus();
      },0);
      setTimeout(()=>{
          this.myInputPalletConfirm.setFocus();
          this.updateScroll();
      },200);
    }
  },1000);
  }

  doChkBarcode(oItem, oBarcode_confirm ){
    if(oBarcode_confirm == "" || oBarcode_confirm == undefined){
      this.Alert('Error', 'โปรดกรอก Barcode!!');
    }else{
      this.service.get_Barcode_Detail(this.oClient, oBarcode_confirm).then((res)=>{
        this.data_barcodeDetail = res;

        if(this.data_barcodeDetail.length <= 0){
            this.oBarcode_confirm = "";
            this.presentToast("ไม่พบบาร์โค้ดสินค้าที่แสกน กรุุณาตรวจสอบ", false, 'bottom');
            this.myInputBarcodeConfirm.setFocus();
            this.updateScroll();
            console.log("ไม่พบบาร์โค้ดสินค้าที่แสกน");
            return;
        }else{
            //this.oBarcode_confirm = this.data_barcodeDetail["0"].item_no;
            this.oBarcode_confirm_scan_chk = this.data_barcodeDetail["0"].item_no;
            console.log("this.oBarcode_confirm_scan_chk",this.oBarcode_confirm_scan_chk);
            console.log("this.data_barcodeDetail",this.data_barcodeDetail);

              setTimeout(()=>{
                  this.myInputBarcodeConfirm.setFocus();
                  console.log("พบ 0");
              },0);
              setTimeout(()=>{
                  this.myInputQtyNew.setFocus();
                  this.updateScroll();
                  console.log("พบ 200");
              },200);
              // this.doGetProductOrther(oClient, this.oItem);
                 this.myInputQtyNew.setFocus();
                 console.log("พบ");
        }
      })
    }
  }


  doClosePickTask(oWo, oTaskNo, oActNO, oQtyPick, oReasonCode, oMaker, oUOM, oPalletTo){
    this.service.close_picktask(oWo, oTaskNo, oActNO, oQtyPick, oReasonCode, this.oUsername, oUOM, oPalletTo).then((res)=>{
      this.data_closePick = res;
      console.log(this.data_closePick);
      if(this.data_closePick.length < 0){
        this.Alert("Warning",this.data_closePick["0"].sqlmsg);
      }
      else if(this.data_closePick["0"].sqlstatus == "0"){
        this.doGetDetailWorkOrder(oWo,this.oClient, this.oUsername);

        this.doClearInput();
        setTimeout(()=>{
            this.myInputPalletConfirm.setFocus();
        },0);
        setTimeout(()=>{
            this.myInputPalletConfirm.setFocus();
            this.updateScroll();
        },500);
      }else{
        this.doClear();
      }
    })
  }

  doClear(){
    this.oWo = "";
    this.oItem = "";
    this.oDesItem = "";
    this.oQty = "";
    this.oQty_Group="";
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
    this.oProd = "";
    this.oExp = "";
    this.oBacth = "";
    this.oBarcode_confirm = "";
    this.oBarcode_confirm_scan_chk = "";
    this.oBatch = "";
    this.oLot = "";
    this.oQty_Group = "";
    this.oUomNew = "";
  }
  doClearInput(){
    this.oQtyNew = "";
    this.oPalletTo = "";
    this.oLocation_confirm = "";
    this.oPalletFromConfirm = "";
    this.oBarcode_confirm="";
    this.oBarcode_confirm_scan_chk = "";
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
  setFilteredLocation_confirm(data) {
     this.oLocation_confirm = data.toUpperCase();
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
