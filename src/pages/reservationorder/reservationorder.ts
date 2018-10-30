import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Service } from '../../services/service';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-reservationorder',
  templateUrl: 'reservationorder.html'
})
export class ReservationOrderPage {
  @ViewChild('focusInputBarcode') InputBarcode;
  @ViewChild('focusInputQty') InputQty;
  @ViewChild(Content) content: Content;

  data_uom:any;
  data_item:any;
  user_detail:any;
  oItem_Barcode:any;
  oClient:any = 'JRFB2550';
  oBranch:any;
  oBranchName:any;
  oLine_no:any;
  oUom:any;
  oQty:any;
  oDate: string = new Date().toISOString();
  oRemark:any = "";
  oSource:any = "HANDHELD";
  oMarker:any;
  rUpdate:any;
  oUsername:any;
  loader:any;

  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController
    , private toastCtrl: ToastController, private storage: Storage, private alertCtrl: AlertController, private keyboard: Keyboard) {

      this.storage.get('_user').then((res) => {
        this.oUsername = res;

        this.doGetBranch(this.oUsername);
      });
      this.oDate = this.oDate.split('T')[0];
  }
  ionViewDidEnter(){
    setTimeout(()=>{
        this.keyboard.close();
          this.InputBarcode.setFocus();
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
    doGetUOM(oClient, oItem_Barcode){
      this.service.get_UOM_Branch(oClient, oItem_Barcode).then((res)=>{
        this.data_uom = res;
        console.log(this.data_uom);
        this.oUom = this.data_uom["0"].uom_stock;
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
    doUpdateReservation(oClient, oBranch, oLine_no, oItem_Barcode, oUom, oQty){
      console.log(oClient, oBranch, oLine_no, oItem_Barcode, oUom, oQty);
      if(oLine_no == undefined || oLine_no == ""){
        oLine_no = "0";
        if(oItem_Barcode == undefined || oItem_Barcode == ""){
          this.presentToast('โปรดกรอก Barcode', false, 'bottom');
        }else if(oQty == undefined || oQty == "" || oQty == 0){
          this.presentToast('โปรดกรอก Qty', false, 'bottom');
        }else{
          this.service.update_reservation_order_detail(oClient, this.oBranch, oLine_no, oItem_Barcode, oUom, oQty, this.oRemark, this.oSource, this.oUsername, "N").then((res)=>{
            this.rUpdate = res;
            console.log(this.rUpdate);
            if(this.rUpdate["0"].sqlStatus == "0"){
              // this.presentToast(this.rUpdate["0"].sqlMessage, false, 'bottom');
              this.doGetReservationOrderDetail(this.oClient, this.oBranch, this.oDate);
              this.doClear();
            }else{
              if(this.rUpdate["0"].sqlStatus == "-2"){
                let alert = this.alertCtrl.create({
                  title: 'Alert',
                  subTitle: this.rUpdate["0"].sqlMessage,
                  buttons: [ {
                      text: 'ยกเลิก',
                      handler: data => {

                      }
                    },
                    {
                      text: 'ตกลง',
                      handler: data => {
                        console.log(oClient, this.oBranch, oLine_no, oItem_Barcode, oUom, oQty, this.oRemark, this.oSource, this.oUsername, "Y");
                        this.service.update_reservation_order_detail(oClient, this.oBranch, oLine_no, oItem_Barcode, oUom, oQty, this.oRemark, this.oSource, this.oUsername, "Y").then((res)=>{
                          this.rUpdate = res;
                          console.log("Test    "+this.rUpdate);
                          if(this.rUpdate["0"].sqlStatus == "0"){
                            // this.presentToast(this.rUpdate["0"].sqlMessage, false, 'bottom');
                            this.doGetReservationOrderDetail(this.oClient, this.oBranch, this.oDate);
                            this.doClear();
                            setTimeout(()=>{
                                this.keyboard.close();
                                  this.InputBarcode.setFocus();
                            },0);
                            setTimeout(()=>{
                                this.keyboard.close();
                            },200);
                          }else{
                            this.Alert('Error', this.rUpdate["0"].sqlMessage);
                          }
                        })
                      }
                    }
                  ]
                });
                alert.present();
              }else{
                this.Alert('Error', this.rUpdate["0"].sqlMessage);
              }
            }
          })

        }
      }else{
          if(oItem_Barcode == undefined || oItem_Barcode == ""){
            this.presentToast('โปรดกรอก Barcode', false, 'bottom');
          }else{
            let alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: this.rUpdate["0"].sqlMessage,
              buttons: [ {
                  text: 'ยกเลิก',
                  handler: data => {

                  }
                },
                {
                  text: 'ตกลง',
                  handler: data => {
                    this.service.update_reservation_order_detail(oClient, this.oBranch, oLine_no, oItem_Barcode, oUom, oQty, this.oRemark, this.oSource, this.oUsername, "N").then((res)=>{
                      this.rUpdate = res;
                      console.log(this.rUpdate);
                      if(this.rUpdate["0"].sqlStatus == "0"){
                        // this.presentToast(this.rUpdate["0"].sqlMessage, false, 'bottom');
                        this.doGetReservationOrderDetail(this.oClient, this.oBranch, this.oDate);
                        this.doClear();
                        setTimeout(()=>{
                            this.keyboard.close();
                              this.InputBarcode.setFocus();
                        },0);
                        setTimeout(()=>{
                            this.keyboard.close();
                        },200);
                      }else{
                        this.Alert('Error', this.rUpdate["0"].sqlMessage);
                      }
                    })
                  }
                }
              ]
            });
            alert.present();
        }
      }
    }

    doDeleteReservation(oClient, oBranch, oLine_no, oItem_Barcode, oUom, oQty){
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
                this.service.delete_reservation_order_detail(oClient, this.oBranch, oLine_no, oItem_Barcode, oUom, oQty, this.oRemark, this.oSource, this.oUsername).then((res)=>{
                  this.rUpdate = res;
                  console.log(this.rUpdate);
                  if(this.rUpdate["0"].sqlStatus == "0"){
                    // this.presentToast(this.rUpdate["0"].sqlMessage, false, 'bottom');
                    this.doGetReservationOrderDetail(this.oClient, this.oBranch, this.oDate);
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

    doGetReservationOrderDetail(oClient, oBranch, oDate){
      this.service.get_ReservationOrderDetail(oClient, oBranch, oDate).then((res)=>{
        this.data_item = res;
        console.log(this.data_item);
      })
    }
    doReturnOrderDetail(line_no, item_barcode, item_description, uom, qty, item_no){
      this.doGetUOM(this.oClient, item_barcode);
      this.oLine_no = line_no;
      this.oItem_Barcode = item_barcode;
      this.oQty = qty;
      setTimeout(()=>{
          this.oUom = uom;
      },400);
    }
    doClear(){
      this.oLine_no = "";
      this.oItem_Barcode = "";
      this.oUom = "";
      this.oQty = "";

      setTimeout(()=>{
          this.keyboard.close();
            this.InputBarcode.setFocus();
      },0);
      setTimeout(()=>{
          this.keyboard.close();
      },500);
    }
    doGetBranch(oClient){
      this.service.get_Branch(oClient).then((res)=>{
        this.oBranchName = res.username;
        this.oBranch = res.customer_code;
        console.log(this.oBranch, this.oBranchName);
        this.doGetReservationOrderDetail(this.oClient, this.oBranch, this.oDate);

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
