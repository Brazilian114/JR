import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, AlertController, Platform, Content, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Keyboard } from '@ionic-native/keyboard';

import { Service } from '../../services/service';

@IonicPage(
  {name:'StockcountPage',
  segment: 'Stockcount'}
)

@Component({
  selector: 'page-stockcount',
  templateUrl: 'stockcount.html'
})
export class StockcountPage {
    @ViewChild(Content) content: Content;
    //page1
    data_warehouse:any;
    data_new_pallet:any;
    data_location:any;
    data_productOther:any;
    data_save:any;
    data_item:any;
    data_barcodeDetail:any;

    oClient:string;
    oStk:string = "";
    oZone:string = "";
    oItem:string = "";
    oDes:string = "";
    oLoc:string = "";
    oRecNum:string = "";
    oWarehouse:string = "";
    oPallet:string = "";
    oCQty:any = null;
    oSQty:any = "";
    oGrade:any = "";
    oUOM:any = "";
    listGrade:any;
    listUOM:any;
    oBarcode:string = "";
    isenabled_return:boolean = true;
    oStk_type:string = "";
    //page2
    listExp:any = "";
    listPro:any = "";
    listRcpt:any = new Date().toISOString();
    oLotNo:string = "";
    oBatchNo:string = "";
    cbExp:any;
    cbMfg:any;
    cbRcpt:any;
    oSize:string = "";
    oColor:string = "";
    oClass:string = "";
    oOwner:string = "";
    oCountNo:string = "";
    Check:any="Att1"
    disabled:boolean = false;
    isenabled:boolean = false;
    isenabledLot:boolean = false;
    isenabledBatch:boolean = false;
    isenabledExp:boolean = false;
    isenabledMfg:boolean = false;
    isenabledRcpt:boolean = false;
    isenabledSize:boolean = false;
    isenabledColor:boolean = false;
    isenabledClass:boolean = false;
    oUsername:string;
  constructor(public navCtrl: NavController, private service: Service, private toastCtrl: ToastController, private modalCtrl: ModalController, private storage: Storage
  , private alertCtrl: AlertController, public platform: Platform, private keyboard: Keyboard) {
    this.storage.get('_user').then((res)=>{
      this.oUsername = res;
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
          this.oWarehouse = data.warehouse;
          this.oStk_type = data.count_type;
            console.log("oStk_type",this.oStk_type);
          if(this.oStk !== ''){
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
  }
  doGetLocation(oClient, oWarehouse, oStockRef, oLocation){
    if(oClient == undefined || oClient == ""){
      this.presentToast('โปรดระบุ Client.', false, 'bottom');
    }else if(oStockRef == undefined || oStockRef == ""){
      this.presentToast('โปรดระบุ StockRef.', false, 'bottom');
    }else if(oWarehouse == undefined || oWarehouse == ""){
      this.presentToast('โปรดระบุ Warehouse.', false, 'bottom');
    }else{
      let profileModal = this.modalCtrl.create("LocationmodalPage", { oClient: oClient, oWH: oWarehouse, oStockRef: oStockRef, oLocation: oLocation });
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log(data);
          if(data != undefined){
            this.oLoc = data.destLoc;
            this.oZone = data.zone;

            this.doGetLocationStk(oClient, oStockRef, oWarehouse, this.oLoc);
          }else{

          }
        });
    }
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

      this.oUOM = this.listUOM["0"].item_packing;
    })
  }
  doGetGrade(){
    this.service.get_Grade().then((res)=>{
      this.listGrade = res;
      console.log(this.listGrade);
      this.oGrade = this.listGrade["0"].param_code;
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

          this.doGetProductOrther(oClient, this.oItem)
        }else{

        }
      });
  }
  doGetBarcodeDetail(oClient, oBarcode){
    this.disabled = false;
    this.service.get_Barcode_Detail(oClient, oBarcode).then((res)=>{
      this.data_barcodeDetail = res;
      console.log(this.data_barcodeDetail);

      this.oItem = this.data_barcodeDetail["0"].item_no;
      this.oDes = this.data_barcodeDetail["0"].description;

      this.doGetUOM(oClient, this.oItem);
      this.doGetGrade();
      setTimeout(()=>{
        //this.oUOM = this.data_barcodeDetail["0"].item_packing;
        this.doGetProductOrther(oClient, this.oItem)
      },600);
    })
  }
  doGetClient(){
    let profileModal = this.modalCtrl.create("CilentmodelPage");
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        this.oClient = data.client_no;
      });
  }
  doGetItem(oClient, oItem){
    this.service.get_showitemlist(oClient,"","",oItem).then((res)=>{
      this.data_item = res;
      console.log(this.data_item);
      this.oDes = this.data_item["0"].description;

      this.doGetUOM(oClient, oItem);
      this.doGetGrade();

      this.doGetProductOrther(oClient, oItem)
    })
  }
  doGetLocationStk(oClient, oStockRef, oWarehouse, oLocation){
    console.log(oClient, oStockRef, oWarehouse, oLocation);
    this.service.get_StockCountListLocation(oClient, oStockRef, oWarehouse, oLocation).then((res)=>{
      this.data_location = res;
      console.log(this.data_location);
    })
  }
  doReturn(rec_num, pallet, item_no, description, count_qty, system_qty, grade, uom, lot, batch, expiry, production_date, item_size, item_color, item_class, count_no, item_barcode){
    console.log(rec_num, pallet, item_no, description, count_qty, system_qty, grade, uom, lot, batch, expiry, production_date, item_size, item_color, item_class, count_no, item_barcode);

    if(lot == undefined){
      lot = "";
    }
    if(batch == undefined){
      batch = "";
    }
    if(expiry == undefined){
      expiry = "";
    }
    if(production_date == undefined){
      production_date = "";
    }
    if(item_size == undefined){
      item_size = "";
    }
    if(item_color == undefined){
      item_color = "";
    }
    if(item_class == undefined){
      item_class = "";
    }
    if(count_no == undefined){
      count_no = "";
    }
    if(rec_num == undefined){
      rec_num = "";
      this.disabled = false;
    }else{
      this.disabled = true;
    }
    this.oRecNum = rec_num;
    this.oPallet = pallet;
    this.oItem = item_no;
    this.oBarcode = item_barcode;
    this.oDes = description;
    this.oCQty = count_qty;
    this.oSQty = system_qty;
    this.oLotNo = lot;
    this.oBatchNo = batch;
    
    if(expiry == ""){
      this.listExp = expiry;
    }else{
      let expDate = String(expiry).substr(0,10)
      this.listExp = expDate;
    }
    if(production_date == ""){
      this.listPro = production_date;
    }else{
      let proDate = String(production_date).substr(0,10)
      this.listPro = proDate;
    }
    this.oSize = item_size;
    this.oColor = item_color;
    this.oClass = item_class;
    this.oCountNo = count_no;

    this.doGetUOM(this.oClient, this.oItem);
    this.doGetGrade();
    setTimeout(()=>{
      this.oGrade = grade;
      this.oUOM = uom;
      this.isenabled_return = false;
      // this.doGetProductOrther(this.oClient, this.oItem);
    },1000);
  }
  doClearAll(){
    this.oStk = "";
    this.oZone = "";
    this.oItem = "";
    this.oDes = "";
    this.oLoc = "";
    this.listGrade = [];
    this.listUOM = [];
    this.oWarehouse = "";
    this.oRecNum = null;
    this.oPallet = "";
    this.oSQty = null;
    this.oCQty = null;
    this.oLotNo = "";
    this.oBatchNo = "";
    this.oClass = "";
    this.oSize = "";
    this.oColor = "";
    this.oOwner = "";
    this.oCountNo = "";
    this.data_location = [];
    this.data_productOther = [];
    this.listExp = "";
    this.listPro = "";
    this.oBarcode = "";
    this.isenabled_return = true;
  }
  doClear(){
    this.oZone = "";
    this.oItem = "";
    this.oDes = "";
    this.listGrade = [];
    this.listUOM = [];
    this.oRecNum = null;
    this.oPallet = "";
    this.oSQty = null;
    this.oCQty = null;
    this.oLotNo = "";
    this.oBatchNo = "";
    this.oClass = "";
    this.oSize = "";
    this.oColor = "";
    this.oOwner = "";
    this.oCountNo = "";
    this.data_productOther = [];
    this.listExp = "";
    this.listPro = "";
    this.oBarcode = "";
    this.isenabled_return = true;
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
  doCheckBox(){

  }
  doSaveStockCount(oSttRef, oRecNum, oWh, OLoc, oPallet, oClient, oItem, oBarcode, oUOM, oSQty, oCQty, oGrade, oLotNo, oBatNo, oExpDate, oProdDate, oSize, oColor, oClass, oOwner){

        if(oSttRef == undefined || oSttRef == ""){
          this.presentToast('โปรดระบุ Stk Ref.', false, 'bottom');
        }else if(oWh == undefined || oWh == "" ){
          this.presentToast('โปรดระบุ Warehouse.', false, 'bottom');
        }else if(OLoc == undefined || OLoc == "" ){
          this.presentToast('โปรดระบุ Location.', false, 'bottom');
        }else if(oPallet == undefined || oPallet == "" ){
          this.presentToast('โปรดระบุ Pallet.', false, 'bottom');
        }else if(oItem == undefined || oItem == "" ){
          this.presentToast('โปรดระบุ Item.', false, 'bottom');
        }else if(oUOM == undefined || oUOM == "" ){
          this.presentToast('โปรดระบุ UOM.', false, 'bottom');
        }else if(oCQty == undefined || oCQty == null ){
          this.presentToast('โปรดระบุ Qty.', false, 'bottom');
        }else if(oGrade == undefined || oGrade == "" ){
          this.presentToast('โปรดระบุ Grade.', false, 'bottom');
        }else if(oRecNum == "" && oSQty == "0.000" || oRecNum == undefined && oSQty == undefined){
          oRecNum = "";
          oSQty = "";
          if(this.isenabledLot == true && oLotNo == ""){
              this.presentToast('โปรดระบุ Lot No.', false, 'bottom');
          }else if(this.isenabledBatch == true && oBatNo == ""){
              this.presentToast('โปรดระบุ Batch No.', false, 'bottom');
          }else if(this.isenabledExp == true && oExpDate == ""){
              this.presentToast('โปรดระบุ Exp Date.', false, 'bottom');
          }else if(this.isenabledMfg == true && oProdDate == ""){
              this.presentToast('โปรดระบุ Production Date.', false, 'bottom');
          }else if(this.isenabledSize == true && oSize == ""){
              this.presentToast('โปรดระบุ Size.', false, 'bottom');
          }else if(this.isenabledColor == true && oColor == ""){
              this.presentToast('โปรดระบุ Color.', false, 'bottom');
          }else if(this.isenabledClass == true && oClass == ""){
              this.presentToast('โปรดระบุ Class .', false, 'bottom');
          }else{
            console.log('1');
              console.log(oSttRef, oRecNum, oWh, OLoc, oPallet, oClient, oItem, oUOM, oSQty, oCQty, oGrade, oLotNo, oBatNo, oExpDate, oProdDate, oSize, oColor, oClass, oOwner, this.oUsername,this.oStk_type);
              this.service.update_Stock_Count(oSttRef, oRecNum, oWh, OLoc, oPallet, oClient, oItem, oBarcode, oUOM, oSQty, oCQty, oGrade, oLotNo, oBatNo, oExpDate, oProdDate, oSize, oColor, oClass, oOwner, this.oUsername,this.oStk_type).then((res)=>{
                this.data_save = res;
                console.log(this.data_save);
                if(this.data_save.sqlstatus == "0"){
                  this.doClear();
                  this.doGetLocationStk(oClient, oSttRef, oWh, OLoc)
                }else{
                  this.Alert('Error', this.data_save.sqlmsg);
                }
              })
          }

        }else{

          if(this.isenabledLot == true && oLotNo == ""){
              this.presentToast('โปรดระบุ Lot No.', false, 'bottom');
          }else if(this.isenabledBatch == true && oBatNo == ""){
              this.presentToast('โปรดระบุ Batch No.', false, 'bottom');
          }else if(this.isenabledExp == true && oExpDate == ""){
              this.presentToast('โปรดระบุ Exp Date.', false, 'bottom');
          }else if(this.isenabledMfg == true && oProdDate == ""){
              this.presentToast('โปรดระบุ Production Date.', false, 'bottom');
          }else if(this.isenabledSize == true && oSize == ""){
              this.presentToast('โปรดระบุ Size.', false, 'bottom');
          }else if(this.isenabledColor == true && oColor == ""){
              this.presentToast('โปรดระบุ Color.', false, 'bottom');
          }else if(this.isenabledClass == true && oClass == ""){
              this.presentToast('โปรดระบุ Class .', false, 'bottom');
          }else{
                       
            console.log('2');
            console.log(oSttRef, oRecNum, oWh, OLoc, oPallet, oClient, oItem, oUOM, oCQty, oSQty, oGrade, oLotNo, oBatNo, oExpDate, oProdDate, oSize, oColor, oClass, oOwner, this.oUsername,this.oStk_type);
                this.service.update_Stock_Count(oSttRef, oRecNum, oWh, OLoc, oPallet, oClient, oItem, oBarcode, oUOM, oCQty, oCQty, oGrade, oLotNo, oBatNo, oExpDate, oProdDate, oSize, oColor, oClass, oOwner, this.oUsername,this.oStk_type).then((res)=>{
                  this.data_save = res;
                  console.log(this.data_save);
                  if(this.data_save.sqlstatus == "0"){
                    this.doClear();
                    this.doGetLocationStk(oClient, oSttRef, oWh, OLoc)
                  }else{
                    this.Alert('Error', this.data_save.sqlmsg);
                  }
          }) 
        
          }
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
}
