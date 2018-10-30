import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Platform, AlertController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Keyboard } from '@ionic-native/keyboard';

import { RecipesmodalPage } from '../modal/recipesmodal/recipesmodal';
import { PomodalPage } from '../modal/pomodal/pomodal';
import { CheckbarcodemodelPage } from '../modal/checkbarcodemodel/checkbarcodemodel';
import { PalletmodelPage } from '../modal/palletmodel/palletmodel';
import { DocrefPage } from '../modal/docref/docref';
import { ReceiptreturnmodelmodelPage } from '../modal/receiptreturnmodel/receiptreturnmodel';

import { Service } from '../../services/service';

@Component({
  selector: 'page-receiptcheckinreturn',
  templateUrl: 'receiptcheckinreturn.html'
})
export class ReceiptCheckinReturnPage {
  @ViewChild('focusInputQty') InputQty;
  @ViewChild('focusInputLoc') InputLoc;
  @ViewChild('focusInputPallet') InputPallet;
  @ViewChild('focusInputBarcode') InputBarcode;
  @ViewChild('focusInputSup') InputSup;
  @ViewChild('focusInputInc') InputInc;
  @ViewChild('focusInputRemark') InputRemark;
  @ViewChild('focusInputSO') InputSO;
  @ViewChild(Content) content: Content;
  data_login:any;
  data_client:any;
  data_pallet_list:any;
  data_new_pallet:any;
  data_pallet_location:any;
  data_zone:any;
  data_supplier:any;
  data_warehouse:any;
  data_book:any;
  data_saveReturn:any;
  data_barcodeDetail:any;
  data_uom:any;
  data_r_detail:any;
  data_pallet_detail:any;
  data_summary:any;
  data_checkin:any;
  data_reverse:any;
  data_receipt:any;
  data_check_receipt:any;
  data_reason:any;
  data_grade:any;
  data_productOther:any;

  oClient:any = "JRFB2550";
  oReceipt:any;
  oDocref:any;
  oCustomer_Header:any;
  oCustomer_Header_Id:any;
  oStatus:any = "DATA ENTRY";
  oPallet:any = null;
  oItem:any = null;
  oCode:any = null;
  oQty:any;
  oDesItem:any;
  oUsername:any;
  oInc:any;
  oName:any;
  oLine:any;
  oBarcode:any;
  oPalletRe:any;
  oReason:any;

  data_station:any;
  oZone:any;
  oCarrier:any;
  oVehicle:any;
  oContainer:any;
  oDate:any = new Date().toISOString();
  oCustomer:any;
  oPo:any = "";
  oSo:any;
  oRemarks:any;
  oRefNo:any;
  oMaker:any;
  oReply:any;
//  oLot:any;
//  oLoc:any;
  oLoc:string = "";
  //oMfg:any;
  //oExpiry:any;
  //oBatch:any;
  // oSize:any;
  // oClass:any;
  // oColor:any;

  oLot:string = "";
  oMfg:string = "";
  oExpiry:string = "";
  oBatch:string = "";
  oSize:string = "";
  oClass:string = "";
  oColor:string = "";


  loader:any;
  listWhses:any;
  listBook:any;
  listType:any = "RETURN";
  listUOM:any;
  listGrade:any = "01";
  listZone:any;
  listStation:any;
  listQty:any = "0";
  isenabled:boolean = false;
  enabled:boolean = false;
  Check : string = 'Header';

  isenabledLot:boolean = false;
  isenabledBatch:boolean = false;
  isenabledExp:boolean = false;
  isenabledMfg:boolean = false;
  isenabledRcpt:boolean = false;
  isenabledSize:boolean = false;
  isenabledColor:boolean = false;
  isenabledClass:boolean = false;

  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private storage: Storage, public platform: Platform, private alertCtrl: AlertController, private keyboard: Keyboard) {

      this.storage.get('_user').then((res)=>{
        this.oUsername = res;
        console.log(this.oUsername);

        if(this.Check == 'Header')
        {
          setTimeout(() => {
            this.doGetBook();
            this.doGetWarehouse(this.oUsername);
            this.doGetReasonReturnCode();
            this.doGetGrade();
          }, 300)
        }
      })
  }
  ionViewDidEnter() {
      this.platform.ready().then(() => {
        this.keyboard.disableScroll(true);
      });
  }
  doClick(){
    this.updateScroll();
  }
  ionViewWillLeave() {
    this.storage.remove('_oLine');
    this.storage.remove('_oItem');
    this.storage.remove('_oReceipt');
  }
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }
  enterRemark(){
      setTimeout(() => {
          this.InputSO.setFocus();
      }, 0)
      setTimeout(() => {
          this.updateScroll();
      }, 200)
  }
  enterSup(){
      setTimeout(() => {
          this.InputInc.setFocus();
      }, 0)
      setTimeout(() => {
          this.updateScroll();
      }, 200)
  }
  doGetReceipt(oClient, listType ,oReceipt, listBook, listWhses){
    this.storage.set('_oReceipt', oReceipt);
    console.log(oClient, "listType : ",listType,"oReceipt :" ,oReceipt, listBook, listWhses);

    if(listType == undefined){
        this.presentToast('โปรดระบุ Type', false, 'bottom');
    }else if(listBook == undefined){
        this.presentToast('โปรดระบุ Book', false, 'bottom');
    }else if(listWhses == undefined){
        this.presentToast('โปรดระบุ Warehouse', false, 'bottom');
    }else{
      let profileModal = this.modalCtrl.create(RecipesmodalPage, { oClient: oClient, oReciptNo: oReceipt, oReceiptType: listType, oBook: listBook});
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log(data);
          if(data == undefined){

          }else{
            if(data.receipt_no == undefined){
              this.storage.get('_oReceipt').then((res)=>{
                this.oReceipt = res;
              })
            }else{
              this.oReceipt = data.receipt_no;
            }
            let date = String(data.date).substr(0,10)
            console.log(this.oReceipt);
            this.oDocref = data.receipt_ref_no;
            this.oCustomer_Header = data.customer;
            this.oStatus = data.status;
            this.oDate = date;
            this.listZone = data.zone;
            this.listStation = data.receipt_station;
            this.listWhses = data.warehouse;
            this.oInc = data.incoming_no;
            this.oRemarks = data.remark01;
              if(this.oReceipt != "" || this.oReceipt != undefined){
                //enable the button
                this.isenabled=true;
                }else{
                //disable the button
                this.isenabled=false;
              }
          }
        });
    }
  }
  doGetPo(oClient,oCustomer_Header,oInc){
    let profileModal = this.modalCtrl.create(PomodalPage, { oClient: oClient, oCustomer_Header: oCustomer_Header, oInc_no: oInc });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oPo = data.po_no;
            setTimeout(()=>{
                this.InputPallet.setFocus();
            },0);
            setTimeout(()=>{
            },200);
        }else{

        }
      });
  }
  doGetBarcode(oClient,oCustomer_Header,oInc){
    let profileModal = this.modalCtrl.create(PomodalPage, { oClient: oClient, oCustomer_Header: oCustomer_Header, oInc_no: oInc });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oBarcode = data.item_barcode;
        }else{

        }
    });
  }
  doGetDocref(oClient, oCustomer_Header,oDocref){
    console.log("oClient",oClient, "oCustomer_Header",oCustomer_Header,"oDocref",oDocref);
    let profileModal = this.modalCtrl.create(DocrefPage, {oClient: oClient, oCustomer_Header: oCustomer_Header ,oDocref: this.oDocref});
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oDocref = data.doc_no;
          this.oCustomer_Header = data.branch;
          setTimeout(()=>{
              this.InputRemark.setFocus();
          },0);
          setTimeout(()=>{
              this.updateScroll();
          },200);
        }else{

        }
      });
  }
  doGetPallet(oClient,oReceipt){
    let profileModal = this.modalCtrl.create(PalletmodelPage, { oClient: oClient, oReceipt: oReceipt });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          if(this.oPallet == "" || this.oPallet == undefined || this.oPallet == null){
            this.oPallet = data.pallet_no;
          }
          if(this.oPo == "" || this.oPo == undefined || this.oPo == null){
            this.oPo = data.client_po_no;
          }
          this.doGetPalletListDetali(oClient,oReceipt,this.oPallet);
        }else{

        }
      });
  }
  doGetPalletListDetali(oClient,oReceipt,oPallet){
    this.service.get_Pallet_List_Detail(oClient,oReceipt,oPallet).then((res)=>{
      this.data_pallet_detail = res;
      console.log(this.data_pallet_detail);
        setTimeout(()=>{
            this.InputBarcode.setFocus();
        },0);
        setTimeout(()=>{
        },200);
    })
  }
  doGetBarcodeDetail(oClient, oReceipt, oDate, oLoc, oPallet, oBarcode, oUOM, oQty, listGrade, listQty, oReason, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass){
    if(listQty == 1){

      this.service.get_Barcode_Detail(oClient, oBarcode).then((res)=>{
        this.data_barcodeDetail = res;
        console.log(this.data_barcodeDetail);
        if(this.data_barcodeDetail.length <= 0){
            this.oName = "";
            this.oQty = 0;
            this.listUOM = "";
            this.presentToast(this.data_barcodeDetail.sqlmsg, false, 'bottom');
        }else{
            this.oName = "";
            this.oName = this.data_barcodeDetail["0"].description;
            this.oItem = this.data_barcodeDetail["0"].item_no;
            this.storage.set('_oItem', this.oItem);
            console.log("this.oItem 320 => ",this.oItem);
            this.doGetUOM(oClient,this.oItem);
            // this.listUOM = this.data_barcodeDetail["0"].item_packing;

            this.doAddDetail(oClient, oReceipt, oDate, oPallet, oBarcode ,this.listUOM, this.oQty, this.listGrade, oLoc, listQty, oReason, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass);
            this.doGetProductOrther(oClient, this.oItem);
            console.log("Testtt",oClient, this.oItem);
            console.log("doAddDetail",oClient, oReceipt, oDate, oPallet, oBarcode ,this.listUOM, this.oQty, this.listGrade, oLoc, listQty, oReason);
        }
      })

    }else{
      this.service.get_Barcode_Detail(oClient, oBarcode).then((res)=>{
        this.data_barcodeDetail = res;
        console.log(this.data_barcodeDetail);
        if(this.data_barcodeDetail.length <= 0){
            this.oName = "";
            this.oQty = 0;
            this.listUOM = "";
            this.presentToast(this.data_barcodeDetail.sqlmsg, false, 'bottom');
        }else{
            this.oName = "";
            this.oName = this.data_barcodeDetail["0"].description;
            this.oItem = this.data_barcodeDetail["0"].item_no;
            this.storage.set('_oItem', this.oItem);

            console.log("this.oItem 346 => ",this.oItem);
            this.doGetUOM(oClient,this.oItem);
            // his.listUOM = this.data_barcodeDetail["0"].item_packing;
            this.doGetProductOrther(oClient, this.oItem);
            console.log("Testtt",oClient, this.oItem);
              setTimeout(()=>{
                  this.InputQty.setFocus();
              },0);
              setTimeout(()=>{
              },200);
        }
      })
    }
  }
  doSaveHeader(oClient, listBook, oReceipt, oDate, oInc, listStation, listWhses, listZone, listType, oContainer, oCustomer_Header, oRemarks, oDocRef, oStatus){
    if(oReceipt == undefined){
      oReceipt = "";
    }if(oContainer == undefined){
      oContainer = "";
    }if(oRemarks == undefined){
      oRemarks = "";
    }if(oStatus == undefined){
      oStatus = "DATA ENTRY";
    }else{
      if(oDocRef == undefined || oDocRef == ""){
        this.presentToast('โปรดระบุ Doc Ref', false, 'bottom');
      }else if(listBook == undefined || listBook == ""){
        this.presentToast('โปรดระบุ Book', false, 'bottom');
      }else if(listWhses == undefined || listWhses == ""){
        this.presentToast('โปรดระบุ Warehouse', false, 'bottom');
      }else{
        console.log(oClient, listBook, oReceipt, oDate, oInc, listStation, listWhses, listZone, listType, oContainer, oCustomer_Header, "", oRemarks, "", oStatus);
        this.service.update_Receipt_Return_Header_NEW(oClient, listBook, oReceipt, oDate, "", listStation, listWhses, listZone, listType, oContainer, oCustomer_Header, "", oRemarks, oDocRef, oStatus, this.oUsername).then((res)=>{
          this.data_saveReturn = res;
          console.log(this.data_saveReturn);
          if(this.data_saveReturn.sqlstatus != "0"){
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: this.data_saveReturn.sqlmsg,
              buttons: [ {
                  text: 'ตกลง',
                  handler: data => {

                  }
                }]
            });
            alert.present();

          }else{
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: this.data_saveReturn.sqlmsg,
            buttons: [ {
                text: 'ตกลง',
                handler: data => {

                }
              }]
          });
          alert.present();

            this.oReceipt = this.data_saveReturn.receipt_no;
            if(this.oReceipt !== "" || this.oReceipt == undefined){
              //enable the button
              this.isenabled=true;
              }else{
              //disable the button
              this.isenabled=false;
            }
          }
        });
      }
    }
  }
  //oClient, oReciptNo, oReceiptDate, oLine, oPallet, oItem, oUOM, oQTY, oGrade, oLocation, oBatch, oLot, oMaker, oBarcode
  doAddDetail(oClient, oReceipt, oDate, oPallet, oBarcode, oUOM, oQty, oGrade, oLoc, listQty, oReason, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass){
  console.log("doAddDetail",oClient, oReceipt, oDate, oPallet, oBarcode, oUOM, oQty, oGrade, oLoc, listQty, oReason, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass);

    // this.oLot = "";
    // this.oBatch = "";
    // this.oExpiry = "";
    // this.oMfg = "";

    console.log("oBarcode 429 = > ",oBarcode);
    if(this.isenabledLot == true && oLot == ""){
        this.presentToast('Please specify Lot No.', false, 'bottom');
    }else if(this.isenabledBatch == true && oBatch == ""){
        this.presentToast('Please specify Batch No.', false, 'bottom');
    }else if(this.isenabledExp == true && oExpiry == ""){
        this.presentToast('Please specify Exp Date.', false, 'bottom');
    }else if(this.isenabledMfg == true && oMfg == ""){
        this.presentToast('Please specify Production Date.', false, 'bottom');
    }else if(this.isenabledSize == true && oSize == ""){
        this.presentToast('Please specify Size.', false, 'bottom');
    }else if(this.isenabledColor == true && oColor == ""){
        this.presentToast('Please specify Color.', false, 'bottom');
    }else if(this.isenabledClass == true && oClass == ""){
        this.presentToast('Please specify Class.', false, 'bottom');
    }else if(oQty == undefined || oQty == ""){
      this.presentToast('โปรดระบุจำนวน Qty ที่ต้องการ', false, 'bottom');
    }else{


    let date = String(oDate).substr(0,10)
    this.storage.get('_oItem').then((res)=>{
      let SesItem = res;
      console.log("SesItem 451 = > ",SesItem);
      if(oLoc == undefined || oLoc == ""){
        this.presentToast('โปรดระบุเลขที่ Loc', false, 'bottom');
      }else if(oPallet == undefined || oPallet == ""){
        this.presentToast('โปรดระบุเลขที่ Pallet', false, 'bottom');
      }else{
        if(listQty != 1){
          console.log('oLine:0 ' +this.oLine)
          if(this.oLine == undefined || this.oLine == ""){
            this.oLine = "";
            if(oBarcode == "" || oBarcode == " " || oBarcode == undefined){
              this.presentToast('โปรดระบุ Barcode', false, 'bottom');
            }else{
              console.log('type:' +oQty)
              console.log('type:' +SesItem)
              this.service.update_receipt_detail_udf(oClient, oReceipt, date, this.oLine, oPallet, SesItem, oUOM, oQty, oGrade, oLoc, this.oBatch, this.oLot, this.oUsername, SesItem, oReason,oExpiry,oMfg).then((res)=>{
                this.data_r_detail = res;
                console.log(this.data_r_detail);
                if(this.data_r_detail.sqlstatus != "0"){
                  this.Alert('Error', this.data_r_detail.sqlmsg+' '+this.data_r_detail.sqlmsg2);
                }else{
                  this.Alert('Success', this.data_r_detail.sqlmsg+' '+this.data_r_detail.sqlmsg2);

                  console.log(oClient,oReceipt,oPallet);
                  this.service.get_Pallet_List_Detail(oClient,oReceipt,oPallet).then((res)=>{
                    this.data_pallet_detail = res;
                    console.log(this.data_pallet_detail);
                    this.oBarcode = "";
                    this.oName = "";
                    this.oQty = 0;
                    this.data_uom = null;
                    setTimeout(()=>{
                        this.InputBarcode.setFocus();
                    },0);
                    setTimeout(()=>{
                        this.InputBarcode.setFocus();
                    },2000);
                  })
                }
              })
            }
          }else{
            console.log('type1:' +oQty)
            this.service.update_receipt_detail_udf(oClient, oReceipt, date, this.oLine, oPallet, SesItem, oUOM, oQty, oGrade, oLoc, this.oBatch, this.oLot, this.oUsername, SesItem, oReason,oExpiry,oMfg).then((res)=>{
              this.data_r_detail = res;
              console.log(this.data_r_detail);
              if(this.data_r_detail.sqlstatus != "0"){
                this.Alert('Eroor', this.data_r_detail.sqlmsg+' '+this.data_r_detail.sqlmsg2);
              }else{
                this.Alert('Success', this.data_r_detail.sqlmsg+' '+this.data_r_detail.sqlmsg2);
                console.log(oClient,oReceipt,oPallet);
                this.service.get_Pallet_List_Detail(oClient,oReceipt,oPallet).then((res)=>{
                  this.data_pallet_detail = res;
                  console.log(this.data_pallet_detail);
                  this.oBarcode = "";
                  this.oName = "";

                  setTimeout(()=>{
                    this.InputBarcode.setFocus();
                  },0);
                  setTimeout(()=>{
                    this.InputBarcode.setFocus();
                  },2000);
                })
              }
            })
          }
        }else{
          console.log('type:2 ' +oQty)
          this.storage.remove('_oLine');
          this.oLine = "";
          console.log('oLine:1 ' +this.oLine)
          if(this.oLine == undefined || this.oLine == ""){
            this.oLine = "";
            console.log('oLine:2 ' +this.oLine)
            if(oBarcode == "" || oBarcode == " " || oBarcode == undefined){
              this.presentToast('โปรดระบุ Barcode', false, 'bottom');
            }else{
              this.service.update_receipt_detail_udf(oClient, oReceipt, date, this.oLine, oPallet, SesItem, oUOM, oQty, oGrade, oLoc, this.oBatch, this.oLot, this.oUsername, SesItem, oReason,oExpiry,oMfg).then((res)=>{
                this.data_r_detail = res;
                console.log(this.data_r_detail);
                if(this.data_r_detail.sqlstatus != "0"){
                  this.Alert('Error', this.data_r_detail.sqlmsg+' '+this.data_r_detail.sqlmsg2);
                }else{
                  this.service.get_Pallet_List_Detail(oClient,oReceipt,oPallet).then((res)=>{
                    this.data_pallet_detail = res;
                    console.log(this.data_pallet_detail);
                    this.oBarcode = "";
                    this.oName = "";
                    this.oQty = 1;
                    this.data_uom = null;
                    setTimeout(()=>{
                      this.InputBarcode.setFocus();
                    },0);
                    setTimeout(()=>{
                      this.InputBarcode.setFocus();
                    },1000);
                  })
                }
              })
            }
          }
        }

      }


    })
    }
  }
  doCheckIn(oClient, oReceipt, oPallet, listType, listBook){
    if(oClient == undefined || oClient == ""){
      this.presentToast('โปรดระบุ Client', false, 'bottom');
    }else if(oReceipt == undefined || oReceipt == ""){
      this.presentToast('โปรดระบุ Receipt', false, 'bottom');
    }else if(oPallet == undefined || oPallet == ""){
      this.presentToast('โปรดระบุ Pallet', false, 'bottom');
    }
    else{
      this.service.Checkin_Receipt_Return_NEW(oClient, oReceipt, this.oUsername).then((res)=>{
        this.data_checkin = res;
        console.log(this.data_checkin);
        if(this.data_checkin["0"].sqlstatus != 0){
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: this.data_checkin["0"].sqlmsg,
            buttons: [ {
                text: 'ตกลง',
                handler: data => {

                }
              }]
          });
          alert.present();
        }else{
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: this.data_checkin["0"].sqlmsg,
            buttons: [ {
                text: 'ตกลง',
                handler: data => {
                  console.log(oClient, oReceipt, listType, listBook);
                  // this.service.get_receipt_detail(oClient, oReceipt, listType, listBook).then((res)=>{
                  //   this.data_receipt = res;
                  //   console.log("test",this.data_receipt);
                  //   // let date = String(this.data_receipt["0"].receipt_date).substr(0,10)
                  //   this.oDocref = this.data_receipt["0"].receipt_ref_no;
                  //   this.oCustomer_Header = this.data_receipt["0"].supplier;
                  //   this.oStatus = this.data_receipt["0"].status;
                  //   this.oDate = this.data_receipt["0"].receipt_date;
                  //   this.listZone = this.data_receipt["0"].zone;
                  //   this.listStation = this.data_receipt["0"].receipt_station;
                  //   this.listWhses = this.data_receipt["0"].warehouse;
                  //   this.oInc = this.data_receipt["0"].incoming_no;
                  // })
                }
              }]
          });
          alert.present();
          this.doClearDetail();
        }
      })
    }
  }
  doReverse(oClient, oReceipt){
    let alert = this.alertCtrl.create({
      title: 'Reverse',
      subTitle: "คุณต้องการย้อนสถานะพาเลตนี้ใช่หรือไม่",
      buttons: [ {
          text: 'ยกเลิก',
          handler: data => {

          }
        },
        {
          text: 'ตกลง',
          handler: data => {

            this.presentLoading();
            this.storage.get('_oReversePallet').then((res)=>{
              let PalletReverse = res;
              if(PalletReverse == undefined || PalletReverse == ""){
                this.presentToast('โปรดเลือก Pallet', false, 'bottom');
                }else{
                  this.service.Reverse_Receipt_Pallet(oClient, oReceipt, PalletReverse, this.oUsername).then((res)=>{
                    this.data_reverse = res;
                    console.log(this.data_reverse);
                    if(this.data_reverse["0"].sqlstatus != 96){
                      let alert = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: this.data_reverse["0"].sqlmsg,
                        buttons: [ {
                            text: 'ตกลง',
                            handler: data => {

                            }
                          }]
                      });
                      alert.present();
                    }else{
                      let alert = this.alertCtrl.create({
                        title: 'Success',
                        subTitle: this.data_reverse["0"].sqlmsg,
                        buttons: [ {
                            text: 'ตกลง',
                            handler: data => {
                              this.doGetPalletList(oClient, oReceipt);
                            }
                          }]
                      });
                      alert.present();
                      this.doGetPalletList(oClient, oReceipt);
                    }
                  })
                }
            })
            this.finishLoding();
          }
        }
      ]
    });
    alert.present();
  }
  doGetNewPallet(oClient){
    if(oClient != ""){
      console.log("N",oClient);
      this.service.get_new_pallet(oClient).then((res)=>{
        this.data_new_pallet = res;
        console.log(this.data_new_pallet)
        this.oPallet = this.data_new_pallet.Column1;
        setTimeout(()=>{
            this.InputBarcode.setFocus();
        },0);
        setTimeout(()=>{
        },200);
      })
    }
  }
  doCheckReturn(oClient, oCustomer, oRefNo){
    let profileModal = this.modalCtrl.create(ReceiptreturnmodelmodelPage, { oClient: oClient, oCustomer: oCustomer, oRefNo: oRefNo });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){

        }else{

        }
      });
  }
  doGetPalletList(oClient, oReceipt){
    this.service.get_Receipt_List_Detail_Closed(oClient, oReceipt).then((res)=>{
      this.data_pallet_list = res;
      console.log(this.data_pallet_list);
    })
  }
  doReturnItemDetail(line_no,item_no,description,qty,uom,item_barcode,grade,remark01,location,batch_no,lot_no,expiry_date,prod_date,item_size,item_color,item_class){
    console.log(line_no,item_no,description,qty,uom,item_barcode,grade,remark01,location);
    this.oBarcode = "1";
    setTimeout(()=>{
      let dateExp = String(expiry_date).substr(0,10)
      let datePro = String(prod_date).substr(0,10)
      this.oBarcode = item_barcode;
      this.oLine = line_no;
      this.oQty = qty;
      this.listGrade = grade;
      this.oReason = remark01;
      this.storage.set('_oLine', this.oLine);
      this.oLoc = location;
      this.oLot = lot_no;
      this.oBatch = batch_no;
      this.oExpiry = dateExp;
      this.oMfg = datePro;
      this.oSize = item_size;
      this.oColor = item_color;
      this.oClass = item_class;

      this.service.get_Barcode_Detail(this.oClient, this.oBarcode).then((res)=>{
        this.data_barcodeDetail = res;
        console.log(this.data_barcodeDetail);
        if(this.data_barcodeDetail.length <= 0){
            this.oName = "";
            this.oQty = 0;
            this.listUOM = "";
            this.presentToast(this.data_barcodeDetail.sqlmsg, false, 'bottom');
        }else{
            this.oName = "";
            this.oName = this.data_barcodeDetail["0"].description;
            this.oItem = this.data_barcodeDetail["0"].item_no;
            this.storage.set('_oItem', this.oItem);

            this.service.get_UOM(this.oClient, this.oItem).then((res)=>{
              this.data_uom = res;
              console.log(this.data_uom);
              this.listUOM = uom;

                this.doGetProductOrther(this.oClient, this.oItem);
            })
              setTimeout(()=>{
                  this.InputQty.setFocus();
              },0);
              setTimeout(()=>{
              },200);
        }
      })
    },100);
    setTimeout(()=>{
    },200);
  }
  doGetReasonReturnCode(){
    this.service.getReasonReturnCode().then((res)=>{
      this.data_reason = res;
      console.log(this.data_reason);
      this.oReason = this.data_reason["0"].reason_code;

    })
  }
  doReturnPallet(oClient, oReceipt, pallet_no){
    let ReversePallet = pallet_no;
    this.oPalletRe = pallet_no;
    this.storage.set('_oReversePallet', ReversePallet);
  }
  doGetUOM(oClient, oItemNO){
    this.service.get_UOM(oClient, oItemNO).then((res)=>{
      this.data_uom = res;
      console.log(this.data_uom);
    })
  }
  doGetGrade(){
    this.service.get_Grade().then((res)=>{
      this.data_grade = res;
      console.log(this.data_grade);
      this.listGrade = this.data_grade["0"].param_code;
    })
  }
  doAddItem(oQty, oPallet, oItem, UOM, Grade, oStatus, oReceipt){
    if(oPallet == undefined || oPallet == ""){
      this.presentToast('โปรดระบุเลขที่ Pallet', false, 'bottom');
    }else{
      this.service.get_exist_pallet_location("", oPallet, oReceipt).then((res)=>{
        this.data_pallet_location = res;
        console.log(this.data_pallet_location);
      })
    }

  }
  doCheckBarCode(oClient, oReceipt, oBarcode){
    let profileModal = this.modalCtrl.create(CheckbarcodemodelPage, { oClient: oClient, oReceipt: oReceipt, oBarcode: oBarcode });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
      });
  }
  doSummary(oClient, oReceipt, oPallet){
    this.service.update_Receipt_Summary_Line(oClient, oReceipt, oPallet, this.oUsername).then((res)=>{
      this.data_summary = res;
      console.log(this.data_summary);
      if(this.data_summary["0"].sqlstatus != 0){
        this.presentToast(this.data_summary["0"].sqlmsg, false, 'bottom');
      }else{
        this.presentToast(this.data_summary["0"].sqlmsg, false, 'bottom');
        this.service.get_Pallet_List_Detail(oClient,oReceipt,oPallet).then((res)=>{
          this.data_pallet_detail = res;
          console.log(this.data_pallet_detail);
        })
      }
    })
  }
  doGetLoc(){
    this.InputPallet.setFocus();
  }
  doGetZone(oWarehouse, oUsername){
    this.service.get_Zone(oWarehouse, oUsername).then((res)=>{
      this.data_zone = res;
      this.listZone = this.data_zone["0"].Zone["0"];
      console.log(this.data_zone);
    })
  }
  doGetBook(){
    this.service.get_Book_CN().then((res)=>{
      this.data_book = res;
      this.listBook = this.data_book["0"].QCBOOK["0"];
      console.log(this.data_book);
    })
  }
  doGetSupplier(oClient){
    this.service.get_Supplier(oClient).then((res)=>{
      this.data_supplier = res;
      this.oCustomer_Header = this.data_supplier["0"];
      console.log(this.data_supplier);
    })
  }
  doGetWarehouse(oUsername){
    this.service.get_WarehouseByUser(oUsername).then((res)=>{
      this.data_warehouse = res;
      this.listWhses = this.data_warehouse["0"].Warehouse;
      console.log(this.listWhses);
      this.doGetStation(this.listWhses);
    })
  }
  doGetStation(oWarehouse){
    this.service.get_Station(oWarehouse).then((res)=>{
      this.data_station = res;
      console.log(this.data_station);
      if(this.data_station.length <= 0){

      }else{
        this.listStation = this.data_station["0"].station;
        this.doGetZone(oWarehouse, this.oUsername);
      }
    })
  }
  doDeleteLineNo(oClient, oReceipt, oPallet){
    this.storage.get('_oLine').then((res)=>{
      this.oLine = res;
      if(this.oLine == undefined || this.oLine == ""){
        this.presentToast('ไม่สามารถลบได้ เนื่องจากยังไม่มีการเลือก Item', false, 'bottom');
      }else{
        this.service.delete_ReceiptLineSerial(oClient, oReceipt, this.oLine, this.oUsername).then((res)=>{
          let data_r_delete = res;
          console.log(data_r_delete);
          this.presentToast(data_r_delete["0"].sqlmsg, false, 'bottom');

          this.service.get_Pallet_List_Detail(oClient,oReceipt,oPallet).then((res)=>{
            this.data_pallet_detail = res;
            console.log(this.data_pallet_detail);
          })
          this.oLine = "";
        })
      }
    })
    this.storage.remove('_oLine');
  }

  doGetProductOrther(oClient, oItem){
    this.service.get_ProductOther(oClient, oItem).then((res)=>{
      this.data_productOther = res;
      console.log(this.data_productOther);
      if(this.data_productOther.length <= 0){

      }else{
        if(this.data_productOther["0"].lot_no == "N"){
          this.isenabledLot = false;
        }else{
          this.isenabledLot = true;
        }
        if(this.data_productOther["0"].batch_no == "N"){
          this.isenabledBatch = false;
        }else{
          this.isenabledBatch = true;
        }
        if(this.data_productOther["0"].item_size == "N"){
          this.isenabledSize = false;
        }else{
          this.isenabledSize = true;
        }
        if(this.data_productOther["0"].item_color == "N"){
          this.isenabledColor = false;
        }else{
          this.isenabledColor = true;
        }
        if(this.data_productOther["0"].item_class == "N"){
          this.isenabledClass = false;
        }else{
          this.isenabledClass = true;
        }
        if(this.data_productOther["0"].expiry_dt == "N"){
          this.isenabledExp = false;
        }else{
          this.isenabledExp = true;
        }
        if(this.data_productOther["0"].production_dt == "N"){
          this.isenabledMfg = false;
        }else{
          this.isenabledMfg = true;
        }
      }

    })
  }

  doClearDetail(){
    this.oPallet = "";
    this.oPo = "";
    this.oBarcode = "";
    this.listUOM = "";
    this.data_pallet_detail = null;
    console.log(this.listQty);
    if(this.listQty == 0){
      this.oQty = 0;
    }else{
      this.oQty = 1;
    }
    this.oName = "";
    this.storage.remove('_oLine');
    this.oLoc = "";
    this.oLot = "";
    this.oBatch = "";
    this.oExpiry = "";
    this.oMfg = "";
    this.oLine = "";
    this.oName = "";


    setTimeout(() => {
      this.doGetGrade();
      this.doGetReasonReturnCode()
    }, 500)
  }
  doClearHeader(){
    this.listBook = "";
    this.oReceipt = "";
    this.oDocref = "";
    this.listWhses = "";
    this.listZone = "";
    this.listStation = "";
    this.data_zone = [];
    this.data_station = [];
    this.oInc = "";
    this.oCustomer_Header = "";
    if(this.oReceipt !== ''){
      //enable the button
      this.isenabled=true;
      }else{
      //disable the button
      this.isenabled=false;
    }
    this.doClearDetail();
    setTimeout(() => {
      this.doGetBook();
      this.doGetWarehouse(this.oUsername);
    }, 500)
  }
  doClearPalletList(){
    this.oPalletRe = "";
  }
  doListqty(listQty){
      console.log(listQty)
    if(listQty != 1){
      //enable the button
      this.enabled=false;
      this.oQty = 0;
      console.log("enable")
      }else{
      //disable the button
      this.enabled=true;
      this.oQty = 1;
      console.log("disable")
    }
  }
  doClickHeader(Check, listQty){
    console.log(Check);
    if(Check == "Header"){
    }else if(Check == "Details"){
      setTimeout(()=>{
          this.InputLoc.setFocus();
          if(listQty == 0){
            this.oQty = "";
          }else{
            this.oQty = 1;
          }
      },0);
      setTimeout(()=>{
      },200);
    }
  }
  doDelete(oClient, oReceipt, oPallet){
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
                this.presentLoading();
                this.doDeleteLineNo(oClient, oReceipt, oPallet);
                this.finishLoding();
          }
        }
      ]
    });
    alert.present();
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
