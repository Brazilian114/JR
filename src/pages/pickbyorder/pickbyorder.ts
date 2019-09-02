import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Platform, AlertController, Content, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { Service } from '../../services/service';

@IonicPage(
  {name:'PickbyorderPage',
  segment: 'Pickbyorder'}
)
@Component({
  selector: 'page-pickbyorder',
  templateUrl: 'pickbyorder.html'
})
export class PickbyorderPage {
  @ViewChild('focusInputLocation') InputLocation;
  @ViewChild('focusInputBarcode') InputBarcode;
  @ViewChild('focusInputPalletFrom') InputPalletFrom;
  @ViewChild('focusInputPallet') InputPallet;
  @ViewChild('focusInputQty') InputQty;
  @ViewChild(Content) content: Content;


  oClient:any = "GTP";
  oUsername:any;
  Check:any = "Header";
  loader:any;
  isenabled:boolean = false;
  enabled:boolean = false;

  data_new_pallet:any;
  data_assign:any;
  data_line:any;
  data_stock:any;
  data_getBarcode:any;
  data_pick:any;
  data_sale_detail:any;
  data_reverse:any;
  data_confirm:any;

  //Header
  oWO:any;
  oOrder:any;
  oStatus:any;
  oCustomer:any;
  oDate:any;
  oName:any;
  oDocRef:any;
  oDeliveyDate:any;
  oDeliveyTo:any;
  oDeliveyName:any;

  //Details
  oL:any;
  oItem:any;
  oDescription:any;
  oQty:any;
  oQtyPick:any;
  oUOM:any;
  oGrade:any;
  oLocPick:any;
  oPalletTo:any = "";
  oLocation:any;
  oPalletFrom:any = "";
  oBarcode:any;
  oDesPallet:any;
  oQtyPallet:any;
  oUOMPallet:any;
  oWarehouse:any;
  oZone:any;

  //PickList
  oItemPickList:any;
  oTask:any;
  oActivity:any;
  oDesPcikList:any;

  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private storage: Storage, private keyboard: Keyboard, public platform: Platform
    , private alertCtrl: AlertController) {
    this.storage.get('_user').then((res)=>{
      this.oUsername = res;

      if(this.Check == 'Header')
      {

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
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }
  doGetWo(oClient){
    let profileModal = this.modalCtrl.create("WomodalPage", { oClient: oClient, oUsername: this.oUsername,  frag: 2});
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oWO = data.works_order;
          this.oOrder = data.order_no;
          this.oStatus = data.status;
          this.oCustomer = data.customer;
          this.oDate = data.order_date;
          this.oName = data.customer_name;
          this.oDocRef = data.reference_no;
          this.oDeliveyDate = data.delivery_date;
          this.oDeliveyTo = data.dlvr_code;
          this.oDeliveyName = data.dlvr_to;
          this.oDate = data.create_date;
          if(this.oWO != "" || this.oWO != undefined){
            //enable the button
            this.isenabled=true;
            }else{
            //disable the button
            this.isenabled=false;
          }
        }else{

        }
      });
  }
  doAssignWO(oClient){
    this.service.assign_Manual_Pick_by_Order(oClient, this.oUsername).then((res)=>{
      this.data_assign = res;
      console.log(this.data_assign);
      if(this.data_assign["0"].sqlstatus != 0){
        this.Alert('Error', this.data_assign["0"].sqlmsg);
      }else{
        this.oWO = this.data_assign["0"].works_order;
        this.oOrder = this.data_assign["0"].order_no;
        this.oStatus = this.data_assign["0"].status;
        this.oCustomer = this.data_assign["0"].customer;
        this.oDate = this.data_assign["0"].order_date;
        this.oName = this.data_assign["0"].customer_name;
        this.oDocRef = this.data_assign["0"].reference_no;
        this.oDeliveyDate = this.data_assign["0"].delivery_date;
        this.oDeliveyTo = this.data_assign["0"].dlvr_code;
        this.oDeliveyName = this.data_assign["0"].dlvr_to;
        if(this.oWO != "" || this.oWO != undefined){
          //enable the button
          this.isenabled=true;
          }else{
          //disable the button
          this.isenabled=false;
        }
      }
    })
  }
  doGetLine(oClient, oOrderNo, oWorksOrder){
    let profileModal = this.modalCtrl.create("SuppliermodelPage", { oClient: oClient, oOrderNo: oOrderNo, oWorksOrder: oWorksOrder });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oL = data.line_no;
          this.oItem = data.item_no;
          this.oDescription = data.description;
          this.oQty = data.qty;
          this.oGrade = data.grade;
          this.oZone = data.zone;
          this.oWarehouse = data.whse_source;
          this.oQtyPick = data.qty_picked;
          this.oUOM = data.uom;

          this.doGetStockPickbyOrder_Active(oClient, this.oItem, this.oUOM, this.oQty, this.oWarehouse, this.oZone, this.oGrade, this.oPalletFrom );

          setTimeout(()=>{
              this.keyboard.close();
                this.InputPallet.setFocus();
          },0);
          setTimeout(()=>{
              this.InputPallet.setFocus();
              this.keyboard.close();
          },2000);
        }else{

        }
      });
  }
  doGetPalletTo(oWorksOrder){
    let profileModal = this.modalCtrl.create("PalletmodelPage", { oWorksOrder: oWorksOrder });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oPalletTo = data.pallet_to;
          setTimeout(()=>{
              this.keyboard.close();
                this.InputLocation.setFocus();
          },0);
          setTimeout(()=>{
              this.InputLocation.setFocus();
              this.keyboard.close();
          },2000);
        }else{

        }
      });
  }
  doGetLine_Active(oClient, oOrderNo, oWorksOrder){
    this.service.get_WO_Pick_by_Order_Detail(oClient, oOrderNo, oWorksOrder).then((res)=>{
      this.data_line = res;
      console.log(this.data_line);
      if(this.data_line.length <= 0){
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'All Pick tasks for Work order '+this.oWO+' Completed. Work Order has been successfully Closed.',
          buttons: [ {
              text: 'ตกลง',
              handler: data => {
                this.doClearDetails();
              }
            }]
        });
        alert.present();
    }else{
      this.doClearDetails();

      this.oL = this.data_line["0"].line_no;
      this.oItem =  this.data_line["0"].item_no;
      this.oDescription =  this.data_line["0"].description;
      this.oQty =  this.data_line["0"].qty_remain;
      this.oGrade =  this.data_line["0"].grade;
      this.oZone =  this.data_line["0"].zone;
      this.oWarehouse =  this.data_line["0"].whse_source;
      this.oQtyPick =  this.data_line["0"].qty_picked;
      this.oUOM =  this.data_line["0"].uom;

      this.doGetStockPickbyOrder_Active(oClient, this.oItem, this.oUOM, this.oQty, this.oWarehouse, this.oZone, this.oGrade, this.oPalletFrom);

      // setTimeout(()=>{
      //     this.keyboard.close();
      //       this.InputPallet.setFocus();
      // },0);
      // setTimeout(()=>{
      //     this.InputPallet.setFocus();
      //     this.keyboard.close();
      // },2000);
    }
    })
  }
  doGetStockPickbyOrder(oClient, oItem, oWarehouse, oZone, oGrade, oPalletFrom){
    if(oItem == undefined || oItem == ""){
      this.Alert('Error', 'Select Line(L#) Please');
    }else if(oWarehouse == undefined || oWarehouse == ""){
      this.Alert('Error', 'Select Line(L#) Please');
    }else if(oZone == undefined || oZone == ""){
      this.Alert('Error', 'Select Line(L#) Please');
    }else if(oGrade == undefined || oGrade == ""){
      this.Alert('Error', 'Select Line(L#) Please');
    }else{
      let profileModal = this.modalCtrl.create("LocationmodalPage", { oClient: oClient, oItem: oItem, oUom: this.oUOM, oQtyPick: this.oQty, oWH: oWarehouse, oZone: oZone, oGrade: oGrade, oPalletFrom: oPalletFrom });
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log(data);
        });
    }
  }
  doGetStockPickbyOrder_Active(oClient, oItemNo, oUom, oQtyPick, oWarehouse, oZone, oGrade, oPalletFrom){
    this.service.get_Stock_Pick_by_Order(oClient, oItemNo, oUom, oQtyPick, oWarehouse, oZone, oGrade, oPalletFrom).then((res)=>{
      this.data_stock = res;
      console.log(this.data_stock);
      if(this.data_stock.length <= 0){
        this.oLocation = "";
        this.oPalletFrom = "";
        this.oBarcode = "";
        this.oDesPallet = "";
        this.oQtyPallet = null;
        this.oUOMPallet = "";
      }else{
        this.oLocPick = this.data_stock["0"].location;
      }
    })
  }
  doGetBarcode(oClient, oBarcode, oItemNo, oWarehouse, oZone, oGrade, oPalletFrom){
    this.service.get_BarcodeMaster_Ekapab(oClient, oBarcode).then((res)=>{
      this.data_getBarcode = res;
      if(this.data_getBarcode <= 0){
        this.Alert('Error', 'ไม่พบข้อมูล');
      }else{
        console.log(this.data_getBarcode);
        this.oUOMPallet = this.data_getBarcode["0"].uom;
        this.oDesPallet = this.data_getBarcode["0"].description;

        this.service.get_Stock_Pick_by_Order(oClient, oItemNo, this.oUOM, this.oQty, oWarehouse, oZone, oGrade, oPalletFrom).then((res)=>{
          this.data_stock = res;
          console.log(this.data_stock);

          this.oQtyPallet = this.data_stock["0"].qty;

          this.doQty();
        })

      }

    })
  }
  ConfirmWorksOrderbyOrder(oClient, oSalesOrder, oWorkOrder){
    this.service.ConfirmWorksOrderbyOrder(oClient, oSalesOrder, oWorkOrder, this.oUsername).then((res)=>{
      this.data_confirm = res;
      console.log(this.data_confirm);
      if(this.data_confirm.sqlstatus != 0){
        this.Alert('Error', this.data_confirm.sqlmsg);
      }else{
        this.Alert('Success', this.data_confirm.sqlmsg);
        this.doClearHeader();
        this.doClearDetails();
        this.doClearPallet();
        this.doClearPickList();
      }
    })
  }
  doPickSaleDetail(oClient, oSoNo, oReference, oWoNo, oLineNo, oQtyPick, oUom, oPallet_Fr, oWarehouse_Fr, oLocation_Fr, oItemNo, oBarcodeNo, oPallet_To, oOrderNo, oWorksOrder){
    if(oSoNo == undefined || oSoNo == ""){
      this.Alert('Error', 'Please fill out the So No.')
    }else if(oReference == undefined || oReference == ""){
      this.Alert('Error', 'Please fill out the Reference.')
    }else if(oWoNo == undefined || oWoNo == ""){
      this.Alert('Error', 'Please fill out the Wo No.')
    }else if(oLineNo == undefined || oLineNo == ""){
      this.Alert('Error', 'Please fill out the Line No.')
    }else if(oQtyPick == undefined || oQtyPick == ""){
      this.Alert('Error', 'Please fill out the Qty.')
    }else if(oUom == undefined || oUom == ""){
      this.Alert('Error', 'Please fill out the UOM.')
    }else if(oPallet_Fr == undefined || oPallet_Fr == ""){
      this.Alert('Error', 'Please fill out the Pallet From.')
    }else if(oWarehouse_Fr == undefined || oWarehouse_Fr == ""){
      this.Alert('Error', 'Please fill out the Warehouse From.')
    }else if(oLocation_Fr == undefined || oLocation_Fr == ""){
      this.Alert('Error', 'Please fill out the Location From.')
    }else if(oItemNo == undefined || oItemNo == ""){
      this.Alert('Error', 'Please fill out the Item No.')
    }else if(oBarcodeNo == undefined || oBarcodeNo == ""){
      this.Alert('Error', 'Please fill out the Barcode No.')
    }else if(oPallet_To == undefined || oPallet_To == ""){
      this.Alert('Error', 'Please fill out the Pallet To.')
    }else{
      if(oQtyPick == 0){
        let alert = this.alertCtrl.create({
          title: 'Warning',
          subTitle: "คุณต้องที่จะไม่ทำ Line นี้ต่อ ใช่หรือไม่",
          buttons: [ {
              text: 'ยกเลิก',
              handler: data => {

              }
            },
            {
              text: 'ตกลง',
              handler: data => {
                this.service.Pick_Sales_Detail(oClient, oSoNo, oReference, oWoNo, oLineNo, oQtyPick, oUom, oPallet_Fr, oWarehouse_Fr, oLocation_Fr, oItemNo, oBarcodeNo, oPallet_To, this.oUsername).then((res)=>{
                  this.data_pick = res;
                  console.log(this.data_pick);
                  if(this.data_pick.length < 0){
                    this.presentToast(this.data_pick["0"].sqlmsg, false, 'bottom');
                  }
                  else if(this.data_pick["0"].sqlstatus == "0"){
                    this.doGetLine_Active(oClient, oSoNo, oWoNo);
                    this.doPallet();
                  }else{
                    this.Alert('Error', this.data_pick["0"].sqlmsg);
                  }
                })
              }
            }
          ]
        });
        alert.present();
      }else{
        this.service.Pick_Sales_Detail(oClient, oSoNo, oReference, oWoNo, oLineNo, oQtyPick, oUom, oPallet_Fr, oWarehouse_Fr, oLocation_Fr, oItemNo, oBarcodeNo, oPallet_To, this.oUsername).then((res)=>{
          this.data_pick = res;
          console.log(this.data_pick);
          if(this.data_pick.length < 0){
            this.presentToast(this.data_pick["0"].sqlmsg, false, 'bottom');
          }
          else if(this.data_pick["0"].sqlstatus == "0"){
            this.doGetLine_Active(oClient, oSoNo, oWoNo);
            this.doPallet();
          }else{
            this.Alert('Error', this.data_pick["0"].sqlmsg);
          }
        })
      }
    }
  }
  doShowPickSalesDetail(oWorkOrder){
    this.service.show_Pick_Sales_Detail(oWorkOrder).then((res)=>{
      this.data_sale_detail = res;
      console.log(this.data_sale_detail);
    })
  }
  doClickPickList(oWorkOrder){
    this.doShowPickSalesDetail(oWorkOrder);
  }
  doClickDetail(oClient, oOrderNo, oWorksOrder){
    this.service.get_WO_Pick_by_Order_Detail(oClient, oOrderNo, oWorksOrder).then((res)=>{
      this.data_line = res;
      console.log(this.data_line);
      if(this.data_line.length <= 0){

      }else{
        this.oL = this.data_line["0"].line_no;
        this.oItem =  this.data_line["0"].item_no;
        this.oDescription =  this.data_line["0"].description;
        this.oQty =  this.data_line["0"].qty_remain;
        this.oGrade =  this.data_line["0"].grade;
        this.oZone =  this.data_line["0"].zone;
        this.oWarehouse =  this.data_line["0"].whse_source;
        this.oQtyPick =  this.data_line["0"].qty_picked;
        this.oUOM =  this.data_line["0"].uom;

        this.doGetStockPickbyOrder_Active(oClient, this.oItem, this.oUOM, this.oQtyPick, this.oWarehouse, this.oZone, this.oGrade, this.oPalletFrom)
      }
    })

  }
  doReturnPickList(item_code, task_no, activity, description){
    this.oItemPickList = item_code;
    this.oTask = task_no;
    this.oActivity = activity;
    this.oDesPcikList = description;
  }
  doReveresTask(oClient, oWorkOrder, oSalesOrder, oTask, oActivity){
    if(oClient == undefined || oClient == ""){
      this.Alert('Error', 'Please fill out the Client.')
    }else if(oWorkOrder == undefined || oWorkOrder == ""){
      this.Alert('Error', 'Please fill out the Work Order.')
    }else if(oSalesOrder == undefined || oSalesOrder == ""){
      this.Alert('Error', 'Please fill out the Sales Order.')
    }else if(oTask == undefined || oTask == ""){
      this.Alert('Error', 'Please fill out the Task.')
    }else if(oActivity == undefined || oActivity == ""){
      this.Alert('Error', 'Please fill out the Activity.')
    }else{
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
              this.service.Reverse_Trx_SIbyOrder_by_Task(oClient, oWorkOrder, oSalesOrder, oTask, oActivity, this.oUsername).then((res)=>{
                this.data_reverse = res;
                console.log(this.data_reverse);
                if(this.data_reverse["0"].sqlstatus == "0"){
                  this.doShowPickSalesDetail(oWorkOrder);
                  this.doClearPickList();
                }else{
                  this.Alert('Error', this.data_reverse["0"].sqlmsg)
                }
              })
            }
          }
        ]
      });
      alert.present();
    }
  }
  doQty(){
    setTimeout(()=>{
        this.keyboard.close();
          this.InputQty.setFocus();
    },0);
    setTimeout(()=>{
        this.InputQty.setFocus();
        this.keyboard.close();
    },100);
  }
  doPallet(){
    setTimeout(()=>{
        this.keyboard.close();
          this.InputLocation.setFocus();
    },0);
    setTimeout(()=>{
        this.InputLocation.setFocus();
        this.keyboard.close();
    },100);
  }
  doLocation(){
    setTimeout(()=>{
        this.keyboard.close();
          this.InputPalletFrom.setFocus();
    },0);
    setTimeout(()=>{
        this.InputPalletFrom.setFocus();
        this.keyboard.close();
    },100);
  }
  doPalletFrom(){
    setTimeout(()=>{
        this.keyboard.close();
          this.InputBarcode.setFocus();
    },0);
    setTimeout(()=>{
        this.InputBarcode.setFocus();
        this.keyboard.close();
    },100);
  }
  doReplenishment(){
      this.navCtrl.push("ReplenishmentPage");
  }
  doGetNewPallet(oClient){
    if(oClient != ""){
      console.log("N",oClient);
      this.service.get_new_pallet(oClient).then((res)=>{
        this.data_new_pallet = res;
        console.log(this.data_new_pallet)
        this.oPalletTo = this.data_new_pallet.Column1;

        setTimeout(()=>{
            this.keyboard.close();
              this.InputLocation.setFocus();
        },0);
        setTimeout(()=>{
            this.InputLocation.setFocus();
            this.keyboard.close();
        },200);
      })
    }
  }
  doClearPallet(){
    this.oPalletTo = "";
  }
  doClearPickList(){
    this.oItemPickList = "";
    this.oTask = "";
    this.oActivity = "";
    this.oDesPcikList = "";
  }
  doClearHeader(){
    this.oWO = "";
    this.oOrder = "";
    this.oStatus = "";
    this.oCustomer = "";
    this.oDate = "";
    this.oName = "";
    this.oDocRef = "";
    this.oDeliveyDate = "";
    this.oDeliveyTo = "";
    this.oDeliveyName = "";
    if(this.oWO == "" || this.oWO == undefined){
      //enable the button
      this.isenabled=false;
      }else{
      //disable the button
      this.isenabled=true;
    }
  }

  doClearDetails(){
    this.oL = "";
    this.oItem = "";
    this.oDescription = "";
    this.oQty = "";
    this.oQtyPick = "";
    this.oUOM = "";
    this.oGrade = "";
    this.oLocPick = "";
    this.oLocation = "";
    this.oPalletFrom = "";
    this.oBarcode = "";
    this.oDesPallet = "";
    this.oQtyPallet = null;
    this.oUOMPallet = "";
    this.oWarehouse = "";
    this.oZone = "";
    if(this.oWO == "" || this.oWO == undefined){
      //enable the button
      this.isenabled=false;
      }else{
      //disable the button
      this.isenabled=true;
    }
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
