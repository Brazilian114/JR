import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Platform, AlertController, Content, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Keyboard } from '@ionic-native/keyboard';

import { Service } from '../../services/service';

@IonicPage(
  {name:'CheckinPage',
  segment: 'Checkin'}
)

@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {
  @ViewChild('focusInputQty') InputQty;
  @ViewChild('focusInputPO') InputPO;
  @ViewChild('focusInputPallet') InputPallet;
  @ViewChild('focusInputBarcode') InputBarcode;
  @ViewChild('focusInputSup') InputSup;
  @ViewChild('focusInputInc') InputInc;
  @ViewChild('focusInputRemark') InputRemark;
  @ViewChild('focusInputSO') InputSO;
  @ViewChild(Content) content: Content;
  data_pallet_putaway:any;
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
  data_grade:any;
  data_location:any;
  data_close:any;
  data_productOther:any;
  qty1:any
  qty2:any
  oClient:string;
  oReceipt:string;
  oDocref:string;
  oSupplier:string;
  oSupplier_Id:string;
  oStatus:string = "DATA ENTRY";
  oPallet:string = null;
  oItem:string = null;
  oCode:string = null;
  oQty:any;
  oDesItem:string;
  oUsername:string;
  oInc:string;
  oName:string;
  oLine:string;
  oBarcode:string;
  oPalletRe:string;
  oInvoice:string = "";
  oInvoice_Date:any = new Date().toISOString();

  data_station:any;
  oZone:string;
  oCarrier:string;
  oVehicle:string;
  oContainer:string;
  oDate:any = new Date().toISOString();
  oCustomer:string;
  oPo:string = "";
  oSo:string;
  oRemarks:string;
  oRefNo:string;
  oMaker:string;
  oReply:string;

  oLoc:string = "";
  oLot:string = "";
  oMfg:string = "";
  oExpiry:string = "";
  oBatch:string = "";
  oSize:string = "";
  oClass:string = "";
  oColor:string = "";

  oAsn_flag:string = "";
  luom_equivalent:any;
  loader:any;
  listWhses:any;
  listBook:any;
  listType:any = "NORMAL";
  listUOM:any;
  listGrade:any;
  listZone:string = "";
  listStation:any;
  listQty:any;
  isenabled:boolean = false;
  enabled:boolean = false;
  Check : string = 'Header';
  isenabledLot:boolean = false;
  changeZone:boolean = false;
  isenabledBatch:boolean = false;
  isenabledExp:boolean = false;
  isenabledMfg:boolean = false;
  isenabledRcpt:boolean = false;
  isenabledSize:boolean = false;
  isenabledColor:boolean = false;
  isenabledClass:boolean = false;
  items: any;
  data_item:any;
  data_productuom:any;
  data_productstock:any;
  data_detail:any
  data_pallet:any;
  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private storage: Storage, public platform: Platform, private alertCtrl: AlertController, private keyboard: Keyboard) {

      //this.listGrade = 
      this.storage.get('_user').then((res)=>{
        this.oUsername = res;
        this.oClient = this.oUsername
        console.log(this.oUsername);
        //this.doGetGrade();

        if(this.Check == 'Header')
        {
          setTimeout(() => {
            this.doGetBook();
            this.doGetWarehouse(this.oUsername);
          }, 300)
        }
      })
     
  }
  initializeItems() {
    this.items = this.data_barcodeDetail; 
    console.log("grade",this.items);
      
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
  doGetLocation(listZone){

    if(this.listZone == "" || this.listZone == undefined ){
            this.presentToast('โปรดระบุ Zone.', false, 'bottom');
    }
    else{
      let profileModal = this.modalCtrl.create("LocationmodalPage", { oZone: listZone });
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log("Location",data);
          if(data != undefined){
            this.oLoc = data.destLoc;
            this.InputPallet.setFocus();
          }
      });
    }

    //this.InputPallet.setFocus();
  }

  doGetLoc(oLoc){

    
    if(this.listZone == "" || this.listZone == undefined ){
        this.presentToast('โปรดระบุ Zone.', false, 'bottom');
    }
    else{
      
      this.service.get_location_zone(oLoc, this.listZone).then((res)=>{
      this.data_location = res;
      console.log(this.data_location);
        if(this.data_location.length <=0){
          this.Alert("Error","ไม่พบ Location");
        }
        else{
          console.log("have");
          this.InputPallet.setFocus();
        }

      })
    }
  }
  doGetPalletForPutaway(oReceipt){
    this.service.get_pallet_for_putaway(this.oClient,"",oReceipt).then((res)=>{
      this.data_pallet_putaway = res;
      console.log("doGetPalletforPutaway if 1",this.data_pallet_putaway);
  })
}
  doGetReceipt(oClient, listType ,oReceipt, listBook, listWhses){
    this.storage.set('_oReceipt', oReceipt);

    console.log("listBook",listBook);

    if(listType == undefined){
        this.presentToast('โปรดระบุ Type', false, 'bottom');
    }else if(listBook == undefined){
        this.presentToast('โปรดระบุ Book', false, 'bottom');
    }else if(listWhses == undefined){
        this.presentToast('โปรดระบุ Warehouse', false, 'bottom');
    }else{
      let profileModal = this.modalCtrl.create("RecipesmodalPage", { oClient: oClient, oReciptNo: oReceipt, oReceiptType: listType, oBook: listBook});
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log("doGetReceipt(checkin.ts)",data);
          if(data == undefined){

          }else{
            if(data.receipt_no == undefined){
              this.storage.get('_oReceipt').then((res)=>{
                this.oReceipt = res;
              })
            }else{
              this.oReceipt = data.receipt_no;
            }
            this.doGetPalletData(oClient, this.oReceipt)
            this.doGetPalletList(oClient, this.oReceipt)
            this.doGetPalletForPutaway(this.oReceipt);
            let date = String(data.date).substr(0,10)
            let invoicedate = String(data.invoice_date).substr(0,10)
            console.log("doGetReceipt",data);
            this.oDocref = data.receipt_ref_no;
            this.oSupplier = data.supplier;
            this.oStatus = data.status;
            this.oDate = date;
            this.listZone = data.zone;
            this.listStation = data.receipt_station;
            this.listWhses = data.warehouse;
            this.oInc = data.incoming_no;
            this.oRemarks = data.remark01;

            if(data.invoice_no == undefined || data.invoice_no == ""){
              console.log("If undefined");
              this.oInvoice = "";
            }
            else{
              console.log("else");
              this.oInvoice = data.invoice_no;
              this.oInvoice_Date = invoicedate;
            }

            this.oPo = data.client_po_no;
            this.oAsn_flag = data.asn_flag;
            //console.log("this.InputPO",this.InputPO);
            console.log("data.asn_flag",data.asn_flag);
            console.log("this.oAsn_flag",this.oAsn_flag);
            console.log("doGetReceipt",data);
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
  doGetReceiptScan(oClient, oReciptNo, oReceiptType, oBook){
    this.service.get_receipt_detail(oClient, oReciptNo, oReceiptType, oBook).then((res)=>{
      this.data_receipt = res;
        console.log(this.data_receipt);
      if(this.data_receipt.length == 1){
        let date = String(this.data_receipt["0"].date).substr(0,10)
        let invoicedate = String(this.data_receipt["0"].invoice_date).substr(0,10)
        this.oDocref = this.data_receipt["0"].receipt_ref_no;
        this.oSupplier = this.data_receipt["0"].supplier;
        this.oStatus = this.data_receipt["0"].status;
        this.oDate = date;
        this.listZone = this.data_receipt["0"].zone;
        this.listStation = this.data_receipt["0"].receipt_station;
        this.listWhses = this.data_receipt["0"].warehouse;
        this.oInc = this.data_receipt["0"].incoming_no;
        this.oRemarks = this.data_receipt["0"].remark01;

        if(this.data_receipt["0"].invoice_no == undefined || this.data_receipt["0"].invoice_no == ""){
          this.oInvoice = "";
        }
        else{
          this.oInvoice = this.data_receipt["0"].invoice_no;
          this.oInvoice_Date = invoicedate;
        }
       
        this.oPo = this.data_receipt["0"].client_po_no;
        this.oAsn_flag = this.data_receipt["0"].asn_flag;
        if(this.data_receipt.length == 1){
          //enable the button
          this.isenabled=true;
          }else{
          //disable the button
          this.isenabled=false;
        }
      }else{
        this.Alert("Error","ไม่พบ Receipt");
      }
    })
  }
  doGetPo(oClient,oSupplier,oInc){
    let profileModal = this.modalCtrl.create("PomodalPage", { oClient: oClient, oSupplier: oSupplier, oInc_no: oInc });

      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oPo = data.order_no;
          this.oSupplier = data.supplier;
            setTimeout(()=>{
                //this.InputPallet.setFocus();
            },0);
            setTimeout(()=>{
            },200);
        }else{

        }
      });
  }
  doGetBarcode(oClient,oSupplier,oInc){
    let profileModal = this.modalCtrl.create("PomodalPage", { oClient: oClient, oSupplier: oSupplier, oInc_no: oInc });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oBarcode = data.item_barcode;
        }else{

        }
    });
  }
  doGetPalletData(oClient, oReceipt){
    this.presentLoading();
    this.service.get_Pallet_List(oClient, oReceipt).then((res)=>{
      this.data_pallet = res;
      console.log("data",this.data_pallet.length);
      this.finishLoding();
      this.initializeItems();
    })
  }
  doGetPallet(oClient,oReceipt){
    let profileModal = this.modalCtrl.create("PalletmodelPage", { oClient: oClient, oReceipt: oReceipt });
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
  doGetPalletList2(oClient, oReceipt){
    this.presentLoading();
    this.service.get_Pallet_List(oClient, oReceipt).then((res)=>{
      this.data_pallet = res;
      console.log("pallet",this.data_pallet);
      this.finishLoding();
      this.initializeItems();
    })
  }
  doGetINC(oClient, oSupplier, oDate){
    let date = String(oDate).substr(0,10)
    let profileModal = this.modalCtrl.create("IncmodelPage", {oClient: oClient, oSupplier: oSupplier, oDate: date });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oInc = data.inc_no;
          this.oSupplier = data.supplier_id;
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
  doGetBarcodeDetail(oClient, oReceipt, oDate, oInc, oPo, oPallet, oBarcode, oUOM, oQty, listGrade, listQty, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass){
    console.log(listQty);
    if(listQty == 1){
      console.log("If");

      this.service.get_Barcode_Detail(oClient, oBarcode).then((res)=>{
        this.data_barcodeDetail = res;
        console.log("this.data_barcodeDetail",this.data_barcodeDetail);
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
            this.doGetUOM(oClient,this.oItem);
            this.doGetGrade();
            //this.doGetPalletforPutaway(oPallet)
            this.doGetPalletList2(oClient, oReceipt)
            //this.listUOM = this.data_barcodeDetail["0"].item_packing;
            this.listUOM = this.data_uom["1"].item_packing;
            console.log(this.listUOM);
            console.log(oPo);
            this.doGetProductOrther(oClient, this.oItem);
            this.doAddDetail(oClient, oReceipt, oDate, oInc, oPo, oPallet, oBarcode, this.listUOM, this.oQty, this.listGrade, listQty, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass,this.oAsn_flag,this.listZone,this.oLoc);

        }
      })

    }else{
      console.log("Else");
      this.service.get_Barcode_Detail(oClient, oBarcode).then((res)=>{
        this.data_barcodeDetail = res;
        this.initializeItems();
        console.log("this.data_barcodeDetail",this.data_barcodeDetail);
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
             this.doGetUOM(oClient,this.oItem);
             this.doGetGrade();
             //this.doGetPalletforPutaway(oPallet)
             this.doGetPalletList2(oClient, oReceipt)
            //this.listUOM = this.data_barcodeDetail["0"].item_packing;
            //this.listUOM = this.data_uom["0"].item_packing;
              setTimeout(()=>{
                  this.InputQty.setFocus();
              },0);
              setTimeout(()=>{

              },200);
              this.doGetProductOrther(oClient, this.oItem);
        }
      })
    }
  }
  doSaveHeader(oClient, listBook, oReceipt, oDate, oInc, listStation, listWhses, listZone, listType, oContainer, oSupplier,oPo, oRemarks, oStatus, oInvoice, oInvoice_Date, oAsn_flag){

    if(oReceipt == undefined){
      oReceipt = "";
    }


    if(oAsn_flag == undefined || oAsn_flag == ""){
      oAsn_flag = "N";
    }

    if(oContainer == undefined){
      oContainer = "";
    }

    if(oRemarks == undefined){
      oRemarks = "";
    }

    if(oStatus == undefined){
      oStatus = "DATA ENTRY";
    }

    else{
      // /*if(oInc == undefined || oInc == ""){
      //   this.presentToast('โปรดระบุ Incoming', false, 'bottom');
      // }else */


      if(listBook == undefined || listBook == ""){
        this.presentToast('โปรดระบุ Book', false, 'bottom');
      }else if(listWhses == undefined || listWhses == ""){
        this.presentToast('โปรดระบุ Warehouse', false, 'bottom');
      }else{

        this.service.update_receipt_header_new(oClient, listBook, oReceipt, oDate, oInc, listStation, listWhses, listZone, listType, oContainer, oSupplier, "",oPo, oRemarks, "", oStatus, this.oUsername, oInvoice, oInvoice_Date, oAsn_flag ).then((res)=>{
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
  onChange() {
    
    this.oLoc = ""; 
    this.changeZone = true;
    return;  
 }
 
  doAddDetail(oClient, oReceipt, oDate, oInc, oPo, oPallet, oBarcode, oUOM, oQty, oGrade, listQty, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass, oAsn_flag, listZone,oLoc ){
console.log("Detail "+oClient, oReceipt, oDate, oInc, oPo, oPallet, oBarcode, oUOM, oQty, oGrade, "listQty:",listQty, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass, oAsn_flag, "listZone:"+listZone,oLoc );
    if(this.isenabledLot == true && oLot == ""){
         this.presentToast('โปรดระบุ Lot', false, 'bottom');
    }else if(this.isenabledBatch == true && oBatch == ""){
        this.presentToast('โปรดระบุ Batch No.', false, 'bottom');
    }else if(this.isenabledExp == true && oExpiry == ""){
        this.presentToast('โปรดระบุ Exp Date.', false, 'bottom');
    }else if(this.isenabledMfg == true && oMfg == ""){
        this.presentToast('โปรดระบุ Production Date.', false, 'bottom');
    }else if(this.isenabledSize == true && oSize == ""){
        this.presentToast('โปรดระบุ Size.', false, 'bottom');
    }else if(this.isenabledColor == true && oColor == ""){
        this.presentToast('โปรดระบุ Color.', false, 'bottom');
    }else if(this.isenabledClass == true && oClass == ""){
        this.presentToast('โปรดระบุ Class.', false, 'bottom');
    }else if(this.isenabledClass == true && oQty == undefined){
      this.presentToast('โปรดระบุ Qty.', false, 'bottom');
    }
    /*else if(this.changeZone == true && this.oLoc == ""){     
      this.presentToast('โปรดระบุ Location.', false, 'bottom');
     }   */

 
    // else if(listZone == "" || listZone == undefined ){
    //     this.presentToast('โปรดระบุ Zone.', false, 'bottom');
    // }else if(oLoc == "" || oLoc == undefined ){
    //     this.presentToast('โปรดระบุ Location.', false, 'bottom');
    // }

    else{

      let date = String(oDate).substr(0,10)
      this.storage.get('_oItem').then((res)=>{
        let SesItem = res;

        // if(oPo == undefined || oPo == ""){
        //   this.presentToast('โปรดระบุเลขที่ Po', false, 'bottom');
        // }else

        if(oPallet == undefined || oPallet == ""){
          this.presentToast('โปรดระบุเลขที่ Pallet', false, 'bottom');
        }
        else if(oQty == undefined || oQty == ""){
          this.presentToast('โปรดระบุ Qty.', false, 'bottom');      
        }
        // else if(listZone == undefined || listZone == ""){
        //   this.presentToast('โปรดระบุ Zone ที่ต้องการจัดเก็บ', false, 'bottom');
        // }
        else{
          if(listQty != 1){
            console.log('oLine:0 ' +this.oLine)
            if(this.oLine == undefined || this.oLine == ""){
              this.oLine = "";
              if(oBarcode == "" || oBarcode == " " || oBarcode == undefined){
                this.presentToast('โปรดระบุ Barcode', false, 'bottom');
                }else if(this.oQty > parseInt(this.luom_equivalent)){
                /* this.qty1 = parseInt(oQty) - parseInt(this.luom_equivalent)
                 this.qty2 = parseInt(oQty) - parseInt(this.qty1)
                 console.log(this.qty2);
                 console.log(this.qty1);*/
                // this.presentToast('จำนวนรับเกินจำนวนต่อ 1 Pallet', false, 'bottom');
                this.Alert('Error', "ไม่สามารถเพิ่มได้ จำนวนรับไม่ควรเกิน " + this.luom_equivalent +" ต่อ 1 Pallet");
               
               }
              else{
          
                console.log('type:' +listQty)
                console.log(oClient, oReceipt, date, oInc, oPo, 'line: '+this.oLine, oPallet, SesItem, oBarcode, oUOM, oQty, oGrade, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass, this.oUsername,this.oAsn_flag,listZone,oLoc);
                this.service.update_receipt_detail_new(oClient, oReceipt, date, oInc, oPo, this.oLine, oPallet, SesItem, oBarcode, oUOM, oQty, oGrade, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass, this.oUsername ,this.oAsn_flag,listZone ,oLoc).then((res)=>{
                  this.data_r_detail = res;
                  console.log(this.data_r_detail);
                  if(this.data_r_detail.sqlstatus != "0"){
                    this.Alert('Error', this.data_r_detail.sqlmsg+' '+this.data_r_detail.sqlmsg2);
                  }else{
                    this.Alert('Success', this.data_r_detail.sqlmsg+' '+this.data_r_detail.sqlmsg2);

                    this.service.get_Pallet_List_Detail(oClient,oReceipt,oPallet).then((res)=>{
                      this.data_pallet_detail = res;
                      console.log("pallet",this.data_pallet_detail);
                      this.oBarcode = "";
                      this.oName = "";
                      this.oQty = 0;
                      this.data_uom = null;
                      this.storage.remove('oLine');
                      this.oLot = "";
                      this.oBatch = "";
                      this.oExpiry = "";
                      this.oMfg = "";
                      this.oSize = "";
                      this.oColor = "";
                      this.oClass = "";
                      //this.data_pallet_detail = null;
                      this.oPallet = "";
                      setTimeout(()=>{
                          this.InputPallet.setFocus();
                      },0);
                      setTimeout(()=>{
                          this.InputPallet.setFocus();
                      },2000);
                    })
                  }
                })
              }
              
            }else if(this.oQty > parseInt(this.luom_equivalent)){
              /* this.qty1 = parseInt(oQty) - parseInt(this.luom_equivalent)
               this.qty2 = parseInt(oQty) - parseInt(this.qty1)
               console.log(this.qty2);
               console.log(this.qty1);*/
              // this.presentToast('จำนวนรับเกินจำนวนต่อ 1 Pallet', false, 'bottom');
              this.Alert('Error', "ไม่สามารถเพิ่มได้ จำนวนรับไม่ควรเกิน " + this.luom_equivalent +" ต่อ 1 Pallet");
             }else{
              console.log('type1:' +listQty)
              this.service.update_receipt_detail_new(oClient, oReceipt, date, oInc, oPo, this.oLine, oPallet, SesItem, oBarcode, oUOM, oQty, oGrade, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass, this.oUsername,this.oAsn_flag,this.listZone,this.oLoc).then((res)=>{
                this.data_r_detail = res;
                console.log(this.data_r_detail);
                if(this.data_r_detail.sqlstatus != "0"){
                  this.Alert('Error', this.data_r_detail.sqlmsg+' '+this.data_r_detail.sqlmsg2);
                }else{
                  this.Alert('Success', this.data_r_detail.sqlmsg+' '+this.data_r_detail.sqlmsg2);

                  this.service.get_Pallet_List_Detail(oClient,oReceipt,oPallet).then((res)=>{
                    this.data_pallet_detail = res;
                    console.log(this.data_pallet_detail);
                    this.oBarcode = "";
                    this.oName = "";
                    this.storage.remove('oLine');
                    this.oLot = "";
                    this.oBatch = "";
                    this.oExpiry = "";
                    this.oMfg = "";
                    this.oSize = "";
                    this.oColor = "";
                    this.oClass = "";
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
            console.log('type:2 ' +listQty)
            this.storage.remove('_oLine');
            this.oLine = "";
            console.log('oLine:1 ' +this.oLine)
            if(this.oLine == undefined || this.oLine == ""){
              this.oLine = "";
              console.log('oLine:2 ' +this.oLine)
              if(oBarcode == "" || oBarcode == " " || oBarcode == undefined){
                this.presentToast('โปรดระบุ Barcode', false, 'bottom');
              }else if(oQty > parseInt(this.luom_equivalent)){
                /* this.qty1 = parseInt(oQty) - parseInt(this.luom_equivalent)
                 this.qty2 = parseInt(oQty) - parseInt(this.qty1)
                 console.log(this.qty2);
                 console.log(this.qty1);*/
                // this.presentToast('จำนวนรับเกินจำนวนต่อ 1 Pallet', false, 'bottom');
                this.Alert('Error', "ไม่สามารถเพิ่มได้ จำนวนรับไม่ควรเกิน " + this.luom_equivalent +" ต่อ 1 Pallet");
               }else{
                console.log(oClient, oReceipt, date, oInc, oPo, this.oLine, oPallet, SesItem, oBarcode, oUOM, oQty, oGrade, this.oLot, this.oBatch, this.oExpiry, this.oMfg, oSize, oColor, oClass,"listZone"+listZone, this.oUsername);
                this.service.update_receipt_detail_new(oClient, oReceipt, date, oInc, oPo, this.oLine, oPallet, SesItem, oBarcode, oUOM, oQty, oGrade, oLot, oBatch, oExpiry, oMfg, oSize, oColor, oClass, this.oUsername,this.oAsn_flag,listZone,this.oLoc).then((res)=>{
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
                      this.storage.remove('oLine');
                      // this.oLot = "";
                      // this.oBatch = "";
                      // this.oExpiry = "";
                      // this.oMfg = "";
                      // this.oSize = "";
                      // this.oColor = "";
                      // this.oClass = "";
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
      this.service.receipt_checkin_by_pallet(oClient, oReceipt, this.oUsername, oPallet).then((res)=>{
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
                  this.service.get_receipt_detail(oClient, oReceipt, listType, listBook).then((res)=>{
                    this.data_receipt = res;
                    console.log("test",this.data_receipt);
                    let date = String(this.data_receipt["0"].receipt_date).substr(0,10)
                    this.oDocref = this.data_receipt["0"].receipt_ref_no;
                    this.oSupplier = this.data_receipt["0"].supplier;
                    this.oStatus = this.data_receipt["0"].status;
                    this.oDate = date;
                    this.listZone = this.data_receipt["0"].zone;
                    this.listStation = this.data_receipt["0"].receipt_station;
                    this.listWhses = this.data_receipt["0"].warehouse;
                    this.oInc = this.data_receipt["0"].incoming_no;
                  })
                }
              }]
          });
          alert.present();
          this.doClearDetail();
        }
      })
    }
  }
  doClose(oClient, oReceiptNo){
    //his.doGetPalletList(oClient, oReceiptNo)
    //this.doGetPalletData(oClient, oReceiptNo)
    //console.log("doGetPalletforPutaway",this.data_pallet_putaway.length);
    //console.log("doGetPalletforPutaway",this.data_pallet_putaway);
    //console.log("data2",this.data_pallet_list.length);
    //console.log("data",this.data_pallet.length);
    
    if(oClient == undefined || oClient == ""){
      this.presentToast('โปรดระบุ Client', false, 'bottom');
    }else if(oReceiptNo == undefined || oReceiptNo == ""){
      this.presentToast('โปรดระบุ Receipt', false, 'bottom');
    }else{
         console.log("doGetPalletforPutaway",this.data_pallet_putaway.length);
         console.log("data",this.data_pallet.length);
      let alert = this.alertCtrl.create({
        title: 'Close',
        subTitle: "คุณยืนยันที่จะปิดเอกสารหรือไม่ ถ้าปิดเอกสารแล้วจะไม่สามารถ รับสินค้าเพิ่มในเอกสารนี้ได้อีก",
        buttons: [ {
            text: 'ยกเลิก',
            handler: data => {

            }
          },
          {
            text: 'ตกลง',
            handler: data => {
              
              
              if(this.data_pallet_putaway.length.length > 0 || this.data_pallet.length > 0){
                this.presentToast('โปรด Putaway รายการพาเลทให้ครบ', false, 'bottom');
              }else{
                //this.presentToast('ปิดเอกสารเรียบรอย', false, 'bottom');
                
              this.service.Closed_Receipt_Master(oClient, oReceiptNo, this.oUsername).then((res)=>{
                this.data_close = res;
                console.log(this.data_close);
                if(this.data_close["0"].sqlstatus != "0"){
                  this.Alert('Error', this.data_close["0"].sqlmsg);
                }else{
                  this.Alert('Success', this.data_close["0"].sqlmsg);
                  this.doClearHeader();
                  this.doClearDetail();
                  this.doClearPalletList();
                }
              })
              
            }
            
            }
          }
        ]
      });
      alert.present();
    }
  }
  doReverse(oClient, oReceipt){
    let alert = this.alertCtrl.create({
      title: 'Reverse',
      subTitle: "คุณต้องการย้อนสถานะพาเลตนี้ใช่หรือไม่",
      buttons: [ {
          text: 'ยกเลิก',
          handler: data => {
             this.storage.get('_oReversePallet').then((res)=>{
              let PalletReverse = res;
             });
          }
        },
        {
          text: 'ตกลง',
          handler: data => {
            
            this.presentLoading();
            this.storage.get('_oReversePallet').then((res)=>{
              let PalletReverse = res;
              console.log(PalletReverse);
              
              if(PalletReverse == undefined || PalletReverse == ""){
                this.presentToast('โปรดเลือก Pallet', false, 'bottom');
                }else{
                  this.service.Reverse_Receipt_Pallet(oClient, oReceipt, PalletReverse, this.oUsername).then((res)=>{
                    this.data_reverse = res;
                    //this.doGetPalletforPutaway(PalletReverse);
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
                      //this.doGetPalletforPutaway(PalletReverse);
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
  doGetPalletList(oClient, oReceipt){
    this.service.get_Receipt_List_Detail_Closed(oClient, oReceipt).then((res)=>{
      this.data_pallet_list = res;
      console.log("list",this.data_pallet_list);
      console.log("data2",this.data_pallet_list.length);
    })

  }
  doGetPalletforPutaway(oPallet){
          this.service.get_pallet_for_putaway(this.oClient,oPallet+"0","").then((res)=>{
            this.data_detail = res; 
            console.log("location",this.data_detail);
            //this.oLoc = this.data_detail["0"].location_to["0"]
          //console.log(this.oLoc);
         
      });
}
  doGetProductUom(){
    this.service.GetProductUom(this.oClient, this.data_item.item_no).then((res)=>{
      this.data_productuom = res;
      console.log(this.data_productuom);  
      // if(this.data_productstock.length <= 0){
        // this.oItem_Qty = "0.00";
        // this.oItem_Uom = "PCS";
      // }else{
        //this.oItem_Qty = this.data_productuom["0"].item_qty;
        //this.oItem_Uom = this.data_productuom["0"].item_uom;
        
      // } 
    })
  }
  doReturnItemDetail(line_no,item_no,description,qty,uom,item_barcode,grade,batch_no,lot_no,expiry_date,prod_date,item_size,item_color,item_class,location,pallet_no,zone){
         console.log(line_no,item_no,description,qty,uom,item_barcode,grade,batch_no,lot_no,expiry_date,prod_date,item_size,item_color,item_class,location,pallet_no,zone);
    this.oBarcode = "1";
    setTimeout(()=>{
      let dateExp = String(expiry_date).substr(0,10)
      let datePro = String(prod_date).substr(0,10)
      this.oBarcode = item_barcode;
      this.oLine = line_no;
      this.oQty = qty;
      this.listGrade = grade;
      this.storage.set('_oLine', this.oLine);
      this.oLot = lot_no;
      this.oBatch = batch_no;
      this.oExpiry = dateExp;
      this.oMfg = datePro;
      this.oSize = item_size;
      this.oColor = item_color;
      this.oClass = item_class;
      this.oLoc = location;
      this.oPallet = pallet_no;
      this.listZone = zone;
      

      this.service.get_Barcode_Detail(this.oClient, this.oBarcode).then((res)=>{
        this.data_barcodeDetail = res;
        console.log(this.data_barcodeDetail);
        if(this.data_barcodeDetail.length <= 0){
            this.oName = "";
            this.oQty = 0;
            this.listUOM = "";
            this.presentToast(this.data_barcodeDetail.sqlmsg, false, 'bottom');
        }else{
            this.oLoc = location;
            this.oName = "";
            this.oName = this.data_barcodeDetail["0"].description;
            this.oItem = this.data_barcodeDetail["0"].item_no;
            this.storage.set('_oItem', this.oItem);

            this.service.get_UOM(this.oClient, this.oItem).then((res)=>{
              this.data_uom = res;
              this.listUOM = this.data_uom["1"].item_packing;
              this.luom_equivalent = this.data_uom["0"].luom_equivalent
              console.log(this.data_uom);
              console.log("uom",this.luom_equivalent);
              this.doGetPalletList2(this.oClient, this.oPallet)
              this.listUOM = uom;

              this.doGetProductOrther(this.oClient, this.oItem);
            })
              this.doGetGrade();

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
  
  doReturnPallet(oClient, oReceipt, pallet_no){
    let ReversePallet = pallet_no;
    this.oPalletRe = pallet_no;
    this.storage.set('_oReversePallet', ReversePallet);
    this.doGetPalletforPutaway(pallet_no);
    
  }
  doGetUOM(oClient, oItemNO){
    this.service.get_UOM(oClient, oItemNO).then((res)=>{
      this.data_uom = res;
      this.listUOM = this.data_uom["1"].item_packing;
      this.luom_equivalent = this.data_uom["0"].luom_equivalent
      console.log("this.data_uom",this.data_uom);
      console.log("uom",this.luom_equivalent);
    })
  }
  doGetGrade(){
    
    this.service.get_Grade().then((res)=>{
    this.data_grade = res;
      if(this.items == undefined){
        this.listGrade = this.data_grade["3"].param_code;
      }else{
        this.listGrade = this.items["0"].default_grade;
        }

     // console.log(this.data_grade);
     // console.log("grade22",this.items["0"].default_grade);
      
      //this.listGrade = this.data_barcodeDetail["0"].default_grade;
    //this.listGrade = this.data_grade["0"].param_code;
    })
    this.initializeItems();
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
    let profileModal = this.modalCtrl.create("CheckbarcodemodelPage", { oClient: oClient, oReceipt: oReceipt, oBarcode: oBarcode });
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
  doGetZone(oWarehouse, oUsername){
    this.service.get_Zone(oWarehouse, oUsername).then((res)=>{
      this.data_zone = res;
      this.listZone = this.data_zone["0"].Zone["0"];
      console.log(this.data_zone);
    })
  }
  doGetBook(){
    this.service.get_Book(this.oClient).then((res)=>{
      this.data_book = res;
      this.listBook = this.data_book["0"].QCBOOK["0"];
      console.log(this.data_book);
    })
  }
  doGetSupplier(oClient){
    this.service.get_Supplier(oClient).then((res)=>{
      this.data_supplier = res;
      this.oSupplier = this.data_supplier["0"];
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
          this.storage.remove('_oLine');
        })
      }
    })
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
    //this.oPo = "";
    this.oLoc = "";
    this.oBarcode = "";
    this.listUOM = "";
    this.listGrade= "";
  //  this.data_uom = "";
    this.listZone = "";

    this.data_pallet_detail = null;
    //console.log(this.listQty);
   /* if(this.listQty == 0){
      this.oQty = 0;
    }else{
      this.oQty = 1;
    }*/

    this.oQty = "";
    this.oLot = "";
    this.oBatch = "";
    this.oExpiry = "";
    this.oMfg = "";
    this.oLine = "";
    this.oName = "";
    this.storage.remove('_oLine');
    //this.storage.remove('_oItem');
   // this.doGetGrade();

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
    this.oSupplier = "";
    this.oInvoice = "";
    this.oPo = "";
    this.oDate = new Date().toISOString();
    this.oInvoice_Date = new Date().toISOString();
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
  doClickHeader(Check, listQty,oClient,oReceipt){
    this.doGetPalletList(oClient, oReceipt)
    this.doGetPalletData(oClient, oReceipt)
    console.log(Check);
    if(Check == "Header"){
    }else if(Check == "Details"){
      setTimeout(()=>{
          //this.InputPO.setFocus();
          if(listQty == 0){
            this.oQty = 0;
          }
          // else{
          //   this.oQty = 1;
          // }
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
                this.doClearDetail();
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
