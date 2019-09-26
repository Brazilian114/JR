import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams,ModalController, Platform, AlertController, Content, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../services/service';
import { DatePipe } from '@angular/common'
/**
 * Generated class for the CheckpalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(  {name:'CheckpalletPage',
              segment: 'Checkpallet'})

@Component({
  selector: 'page-checkpallet',
  templateUrl: 'checkpallet.html',
})
export class CheckpalletPage {
  oUsername:any;
  oClient:any;
  oBarcode:any;
  oPallet:any;
  data_pallet:any
  oOrder_no:any;
  oReceipt_date:any;
  oArea_from:any;
  oLocation_from:any;
  oSales_order:any
  oCustomer:any;
  oItem_no:any;
  oQty_moved:any;
  oUom:any;
  oLot_No:any;
  oProd_Date:any;
  oExpiry_Date:any;

  constructor(public toastCtrl:ToastController,public datepipe: DatePipe,public service: Service,private storage: Storage,public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('_user').then((res)=>{
      this.oUsername = res;
      this.oClient = this.oUsername
    })
   
  }
  GetPalletHistory(oClient,oPallet){
    this.service.Get_Pallet_History(oClient,oPallet).then((res)=>{
      this.data_pallet = res;
      console.log(this.data_pallet);
      if(this.data_pallet.length <= 0){
        this.presentToast('ไม่พบ Pallet', false, 'bottom');
      }else{
      this.oOrder_no = this.data_pallet["0"].order_no
      this.oLocation_from = this.data_pallet["0"].location_from
      this.oSales_order = this.data_pallet["0"].sales_order
      var this_date = this.datepipe.transform(this.data_pallet["0"].receipt_date, 'dd/MM/yyyy');
      this.oReceipt_date = this_date
      //console.log(this.oReceipt_date);
      }
    /*this.oArea_from = this.data_pallet.area_from
      this.oCustomer = this.data_pallet.customer
      this.oItem_no = this.data_pallet.item_no
      this.oQty_moved = this.data_pallet.qty_moved
      this.oUom = this.data_pallet.uom
      this.oLot_No = this.data_pallet.lot_no
      this.oProd_Date = this.data_pallet.prod_date
      this.oExpiry_Date = this.data_pallet.expiry_date*/
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckpalletPage');
  }

  doClear(){
    this.oPallet = "";
    this.oOrder_no = "";
    this.oReceipt_date = "";
    this.oLocation_from = "";
    this.oSales_order = "";
    /*this.oArea_from = "";
    this.oCustomer = "";
    this.oItem_no = "";
    this.oQty_moved = "";
    this.oUom = "";
    this.oLot_No = "";
    this.oProd_Date = "";
    this.oExpiry_Date = "";*/
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
