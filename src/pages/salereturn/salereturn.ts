import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams, AlertController, Content, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Service } from '../../services/service';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage(
  {name:'SaleReturnPage',
  segment: 'SaleReturn'}
)
@Component({
  selector: 'page-salereturn',
  templateUrl: 'salereturn.html'
})
export class SaleReturnPage {
  @ViewChild('focusInputBarcode') InputBarcode;
  @ViewChild('focusInputQty') InputQty;
  @ViewChild(Content) content: Content;

  data_uom:any;
  data_item:any;
  data_reason:any;
  data_closesalereturn:any;
  user_detail:any;
  oItem_Barcode:any;
  oClient:any = "JRFB2550";
  oUsername:any;
  oBranch:any;
  oBranchName:any;
  oLine_no:any;
  oUom:any;
  oQty:any;
  oDoc_no:any;
  oRemark:any = "";
  oSource:any = "HANDHELD";
  oMarker:any;
  rUpdate:any;
  oCustomer_id:any;
  oReason:any;
  oStatus:any;
  loader:any;
  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController
    , private toastCtrl: ToastController, private navParams: NavParams, private storage: Storage
    , private alertCtrl: AlertController, private keyboard: Keyboard) {

      this.storage.get('_user').then((res) => {
        this.oUsername = res;
        this.doGetBranch(this.oUsername);
      });
      this.oDoc_no = navParams.get('doc_no');
      this.oCustomer_id = navParams.get('customer');
      this.oStatus = navParams.get('status');
      console.log(this.oDoc_no, this.oCustomer_id);

      this.doGetReasonReturnCode();
  }
    doGetUOM(oClient, oItem_Barcode){
      console.log(oItem_Barcode);
      this.service.get_UOM_Branch_Return(oClient, oItem_Barcode).then((res)=>{
        this.data_uom = res;
        this.oUom = this.data_uom["0"].item_packing;
        console.log(this.data_uom);

        setTimeout(()=>{
            this.keyboard.close();
              this.InputQty.setFocus();
        },0);
        setTimeout(()=>{
              this.InputQty.setFocus();
            this.keyboard.close();
        },1000);
      })
    }
    doUpdateReservation(oClient, oDoc_no, oBranch, oLine_no, oItem_Barcode, oUom, oQty, oReason){
      if(oLine_no == undefined || oLine_no == ""){
        oLine_no = "0";
        if(oItem_Barcode == undefined || oItem_Barcode == ""){
          this.presentToast('โปรดกรอก Barcode', false, 'bottom');
        }else if(oQty == undefined || oQty == ""){
          this.presentToast('โปรดกรอก Qty', false, 'bottom');
        }else{
        this.service.update_sale_return_detail(oClient, oDoc_no, this.oBranch, oLine_no, oItem_Barcode, oUom, oQty, this.oRemark, this.oSource, this.oUsername, oReason).then((res)=>{
          this.rUpdate = res;
          console.log(this.rUpdate);
          if(this.rUpdate["0"].sqlStatus == "0"){
            // this.presentToast(this.rUpdate["0"].sqlMessage, false, 'bottom');
            this.doGetSaleReturnDetail(this.oClient, this.oBranch, this.oDoc_no);
            this.doClear();
            setTimeout(()=>{
                this.keyboard.close();
                  this.InputBarcode.setFocus();
            },0);
            setTimeout(()=>{
                  this.InputBarcode.setFocus();
                this.keyboard.close();
            },500);
          }else{
            this.Alert('Error', this.rUpdate["0"].sqlMessage);
          }
        })
      }
      }else{
          if(oItem_Barcode == undefined || oItem_Barcode == ""){
            this.presentToast('โปรดกรอก Barcode', false, 'bottom');
          }else if(oQty == undefined || oQty == ""){
            this.presentToast('โปรดกรอก Qty', false, 'bottom');
          }else{
          this.service.update_sale_return_detail(oClient, oDoc_no, this.oBranch, oLine_no, oItem_Barcode, oUom, oQty, this.oRemark, this.oSource, this.oUsername, oReason).then((res)=>{
            this.rUpdate = res;
            console.log(this.rUpdate);
            if(this.rUpdate["0"].sqlStatus == "0"){
              // this.presentToast(this.rUpdate["0"].sqlMessage, false, 'bottom');
              this.doGetSaleReturnDetail(this.oClient, this.oBranch, this.oDoc_no);
              this.doClear();
              setTimeout(()=>{
                  this.keyboard.close();
                    this.InputBarcode.setFocus();
              },0);
              setTimeout(()=>{
                    this.InputBarcode.setFocus();
                  this.keyboard.close();
              },500);
            }else{
              this.Alert('Error', this.rUpdate["0"].sqlMessage);
            }
          })
        }
      }
    }

    doDeleteReservation(oClient, oDoc_no, oBranch, oLine_no, oItem_Barcode, oUom, oQty, oReason){
      let alert = this.alertCtrl.create({
        title: 'Delete',
        subTitle: "คุณต้องการลบรายการนี้ใช่หรือไม่",
        buttons: [ {
            text: 'ยกเลิก',
            handler: data => {

            }
          },
          {
            text: 'ตกลง',
            handler: data => {
              if(oLine_no == undefined || oLine_no == "0" || oLine_no == ""){
                  this.presentToast('โปรดเลือกรายการ', false, 'bottom');
              }else{
                this.service.delete_sale_return_detail(oClient, oDoc_no, this.oBranch, oLine_no, oItem_Barcode, oUom, oQty, this.oRemark, this.oSource, this.oUsername, oReason).then((res)=>{
                  this.rUpdate = res;
                  if(this.rUpdate["0"].sqlStatus == "0"){
                    // this.presentToast(this.rUpdate["0"].sqlMessage, false, 'bottom');
                    this.doGetSaleReturnDetail(this.oClient, this.oBranch, this.oDoc_no);
                    this.doClear();
                    setTimeout(()=>{
                        this.keyboard.close();
                          this.InputBarcode.setFocus();
                    },0);
                    setTimeout(()=>{
                          this.InputBarcode.setFocus();
                        this.keyboard.close();
                    },500);
                  }else{
                    this.Alert('Error', this.rUpdate["0"].sqlMessage);
                  }
                })
              }
            }
          }
        ]
      });
      alert.present();
    }
    Close_Sale_Return(oClient, oBranch, oDoc_no){
      this.service.Close_Sale_Return(oClient, oBranch, oDoc_no, this.oUsername).then((res)=>{
        this.data_closesalereturn = res;
        console.log(this.data_closesalereturn);
        if(this.data_closesalereturn["0"].sqlStatus != 0){
          this.Alert('Error', this.data_closesalereturn["0"].sqlMessage);
        }else{
          this.Alert('Success', this.data_closesalereturn["0"].sqlMessage);
          this.oStatus = "CLOSED";
        }
      })
    }
    doGetSaleReturnDetail(oClient, oBranch, oDoc_no){
      this.service.get_SaleReturnDetail(oClient, oBranch, oDoc_no).then((res)=>{
        this.data_item = res;
        console.log(this.data_item);
      })
    }
    doReturnOrderDetail(line_no, item_barcode, item_description, uom, qty, item_no, reason_code){

      console.log(item_barcode);
      this.doGetUOM(this.oClient, item_barcode);
      this.doGetReasonReturnCode();
      this.oLine_no = line_no;
      this.oItem_Barcode = item_barcode;
      this.oQty = qty;
      setTimeout(()=>{
              this.oUom = uom;
              this.oReason = reason_code;
      },1000);

    }
    doClear(){
      this.oLine_no = "";
      this.oItem_Barcode = "";
      this.oUom = "";
      this.oQty = "";
    }
    doGetBranch(oClient){
      this.service.get_Branch(oClient).then((res)=>{
        this.oBranchName = res.username;
        this.oBranch = res.customer_code;
        console.log(this.oBranch, this.oBranchName);
        this.doGetSaleReturnDetail(this.oClient, this.oBranch, this.oDoc_no);
      })
    }
    doGetReasonReturnCode(){
      this.service.getReasonReturnCode().then((res)=>{
        this.data_reason = res;
        console.log(this.data_reason);
        this.oReason = this.data_reason["0"].reason_code;

      })
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
