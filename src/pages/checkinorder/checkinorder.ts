import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController, Content, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Service } from '../../services/service';

@IonicPage(
  {name:'CheckinOrderPage',
  segment: 'CheckinOrder'}
)

@Component({
  selector: 'page-checkinorder',
  templateUrl: 'checkinorder.html'
})
export class CheckinOrderPage {
  @ViewChild('focusInputLoadingSummaryNo') InputLoadingSummaryNo;
  @ViewChild('focusInputPackNo') InputPackNo;
  @ViewChild('focusInputBarcode') InputBarcode;
  @ViewChild(Content) content: Content;

  oUsername:string = "";
  oClient:string = "JRFB2550";
  oStatus:string = "DATA ENTRY";
  oPackNo:string = "";
  oBarcode:string = "";
  oLoadingSummaryNo:string = "";
  listUOM:any;
  oQTY:any;

  data_checkin:any;
  data_insBranch:any;
  data_summary:any;
  data_del:any;
  data_confirm:any;
  data_branch:any;
  oSource:string = "HANDHELD";
  oMarker:string;
  oBranch:string = "";
  loader:any;
  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private storage: Storage, private alertCtrl: AlertController) {

      this.storage.get('_user').then((res) => {
        this.oUsername = res;
        this.doGetBranchReceiptCheckinBranchByUser(this.oUsername);
      });

  }
  ionViewDidEnter(){
    setTimeout(()=>{
          this.InputLoadingSummaryNo.setFocus();
    },200);
  }
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }
  doLoadingNo(){
    setTimeout(()=>{
          this.InputPackNo.setFocus();
    },200);
  }
  doGetBranch_Receipt(oClient, oLoadingSummaryNo, oPackingNo, oBranch){
    this.service.Get_Branch_Receipt_Checkin_Detail_In_Packing(oClient, oLoadingSummaryNo, oPackingNo, oBranch).then((res)=>{
      this.data_checkin = res;
      console.log(this.data_checkin);
      if(this.data_checkin.length <= 0){
        // this.Alert('Error', 'ยังไม่มีรายการสินค้า')
        this.oStatus = 'DATA ENTRY';
      }else{
        this.oStatus = this.data_checkin["0"].status["0"];

        setTimeout(()=>{
              this.InputBarcode.setFocus();
        },200);
      }
    })
  }
  doInsBranchReceiptCheckinDetail(oClient, oLoadingSummaryNo, oPackingNo, oBarcode, oStatus, oBranch){
    if(oBarcode == undefined || oBarcode == ""){

    }else{
      this.service.Ins_Branch_Receipt_Checkin_Detail(oClient, oLoadingSummaryNo, oPackingNo, this.oUsername, oBarcode, oStatus, oBranch).then((res)=>{
        this.data_insBranch = res;
        console.log(this.data_insBranch);
        if(this.data_insBranch["0"].sqlStatus == 0){
          this.doClearDetail();
          this.doGetBranch_Receipt(oClient, oLoadingSummaryNo, oPackingNo, oBranch);
        }else{
          this.Alert('Error', this.data_insBranch["0"].sqlMessage);
        }
      })
    }
  }
  doGetBranchReceiptCheckinBranchByUser(oUsername){
    this.service.Get_Branch_Receipt_Checkin_Branch_By_User(oUsername).then((res)=>{
      this.data_branch = res;
      console.log(this.data_branch);

      this.oBranch = this.data_branch["0"].customer_code;
    })
  }
  doSummaryBranch_ReceiptCheckinDetail(oClient, oLoadingSummaryNo, oPackingNo, oBranch){
    this.service.Summary_Branch_Receipt_Checkin_Detail(oClient, oLoadingSummaryNo, oPackingNo, this.oUsername, oBranch).then((res)=>{
      this.data_summary = res;
      console.log(this.data_summary);
      this.doGetBranch_Receipt(oClient, oLoadingSummaryNo, oPackingNo, oBranch);
      this.doClearDetail();
    })
  }
  doDelBranchReceiptCheckinDetail(oClient, oLoadingSummaryNo, oPackingNo, oQty, oItemBarcode, oStatus, oBranch){
    this.service.Del_Branch_Receipt_Checkin_Detail(oClient, oLoadingSummaryNo, oPackingNo, oQty, this.oUsername, oItemBarcode, oStatus, oBranch).then((res)=>{
      this.data_del = res;
      console.log(this.data_del);
      this.doGetBranch_Receipt(oClient, oLoadingSummaryNo, oPackingNo, oBranch);
      this.doClearDetail();
    })
  }
  doConfirmBranchReceiptCheckinDetail(oClient, oLoadingSummaryNo, oPackingNo, oBranch){
    this.service.Confirm_Branch_Receipt_Checkin_Detail(oClient, oLoadingSummaryNo, oPackingNo, this.oUsername, oBranch).then((res)=>{
      this.data_confirm = res;
      console.log(this.data_confirm);
      if(this.data_confirm["0"].sqlStatus == 0){
        this.doGetBranch_Receipt(oClient, oLoadingSummaryNo, oPackingNo, oBranch);
        this.Alert('Success', this.data_confirm["0"].sqlMessage);
      }else{
        this.Alert('Error', this.data_confirm["0"].sqlMessage);
      }
    })
  }
  doReturnItemDetail(item_barcode, description, qty, uom){
    this.oBarcode = item_barcode;
    this.oQTY = qty;
    this.listUOM = uom
  }
  doClear(){
    this.oLoadingSummaryNo = "";
    this.oPackNo = "";
    this.oBarcode = "";
    this.oQTY = "";
    this.listUOM = "";
    this.data_checkin = [];
    this.oStatus = 'DATA ENTRY';

    setTimeout(()=>{
          this.InputLoadingSummaryNo.setFocus();
    },200);
  }
  doClearDetail(){
    this.oBarcode = "";
    this.oQTY = "";
    this.listUOM = "";

    setTimeout(()=>{
          this.InputBarcode.setFocus();
    },200);
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
