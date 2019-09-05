import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, ToastController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../../services/service';

@IonicPage(
  {name:'LoadtotruckdetailmodalPage',
  segment: 'Loadtotruckdetailmodal'}
)
@Component({
  selector: 'page-loadtotruckdetailmodal',
  templateUrl: 'loadtotruckdetailmodal.html'
})
export class LoadtotruckdetailmodalPage {
  oClient:any;
  oUsername:any;
  oItemChk:any;
  oLineChk:any;
  oLoadingSummaryNo:any;
  oItemNo:any;
  oSalesOrder:any;

  oDeliveryNo:any;
  oCustomer:any;
  oLineUpd:any;
  data_upd_detail_chk: any;
  oPackingNo:any;
  data_itemList:any;
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private storage: Storage) {

       this.oSalesOrder = navParams.get('oSalesOrder');
       this.oLoadingSummaryNo = navParams.get('oLoadingSummaryNo');

       this.storage.get('_user').then((res)=>{
         this.oUsername = res;
         this.oClient = this.oUsername;
       })

       this.doGetItemList(this.oLoadingSummaryNo,this.oSalesOrder);
  }

  doReturn_Detail_select(item_barcode,row_hh){
      console.log("doReturn_Detail_select",item_barcode,row_hh);

      this.oItemChk = item_barcode;
      this.oLineChk = row_hh;
    // this.oPackingNo = packing_no;
    // this.oCustomer = customer;
    // this.oCustomer_Name = customer_name;
    // this.oSalesOrder = sales_order;
    // this.oDeliveryNo = delivery;
  }

  doReturn_Detail(load_summary,item_no,sales_order, delivery,customer,row_id){
    console.log("doReturn_Detail" , load_summary,item_no,sales_order, delivery,customer,row_id);
    this.oLoadingSummaryNo = load_summary;
    this.oItemNo = item_no;
    this.oSalesOrder = sales_order;
    this.oDeliveryNo = delivery;
    this.oCustomer = customer;
    this.oLineUpd = row_id;

    this.doUpdatedingSummaryDetail_Check_Detail(this.oLoadingSummaryNo, this.oClient, this.oItemNo, this.oCustomer, this.oSalesOrder, this.oDeliveryNo,this.oLineUpd);

  }

  doUpdatedingSummaryDetail_Check_Detail(oLoadingSummaryNo, oClient, oItemNo, oCustomer, oSalesOrder, oDeliveryNo, oLineUpd){
    if(oLoadingSummaryNo == undefined || oLoadingSummaryNo == ""){
      this.presentToast('โปรดระบุ Loading Summary No', false, 'bottom');
    }else if(oClient == undefined || oClient == ""){
      this.presentToast('โปรดระบุ Client', false, 'bottom');
    }else if(oCustomer == undefined || oCustomer == ""){
      this.presentToast('โปรดระบุ Customer', false, 'bottom');
    }else if(oDeliveryNo == undefined || oDeliveryNo == ""){
      this.presentToast('โปรดระบุ Delivery No', false, 'bottom');
    }else if(oItemNo == undefined || oItemNo == ""){
      this.presentToast('โปรดเลือก ✔ รหัสสินค้าทีต้องการ ', false, 'bottom');
    }else if(oLineUpd == undefined || oLineUpd == ""){
      this.presentToast('โปรดเลือก ✔ รหัสสินค้าทีต้องการ ', false, 'bottom');
    }else{
      this.service.Update_Loading_Summary_Detail_Check(oLoadingSummaryNo, oClient, oSalesOrder, oCustomer, oItemNo, this.oUsername , oDeliveryNo,oLineUpd, "D").then((res)=>{
        this.data_upd_detail_chk = res;
        console.log("this.service.Update_Loading_Summary_Detail_Check",this.data_upd_detail_chk);
        //this.doGetLoadingSummaryDetail(oLoadingSummaryNo, oClient);
        this.doGetItemList(oLoadingSummaryNo, oSalesOrder);
        this.oPackingNo = "";
        // this.doClearDetails();
        setTimeout(()=>{
            //this.InputPackNo.setFocus();
        },100);
      })
    }
  }
  doGetItemList(oLoadingSummaryNo,oSalesOrder){
    this.service.Get_Loading_Summary_Detail_Item_List(oLoadingSummaryNo, oSalesOrder).then((res)=>{
      this.data_itemList = res;
      console.log(this.data_itemList);
      if(this.data_itemList.length <= 0){
        this.Alert('Error', 'ไม่พบข้อมูล')
      }else{

      }
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
      content:"Loading...",duration:3000
    });
    // this.loader.present();
    this.loader.present().then(() => {});
  };
  finishLoding(){
    this.loader.dismiss();
  }
  dismiss() {
     this.viewCtrl.dismiss();
   }
}
