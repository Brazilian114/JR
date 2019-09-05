import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Service } from '../../services/service';

@IonicPage(
  {name:'SaleReturnHeaderPage',
  segment: 'SaleReturnHeader'}
)
@Component({
  selector: 'page-salereturnheader',
  templateUrl: 'salereturnheader.html'
})
export class SaleReturnHeaderPage {
  data_Branch_list:any;
  data_Create_branch:any;
  oClient:any;
  oUsername:any;
  oBranch:any;
  oBranchName:any;
  oDoc_no:any;
  oSource:any = "HANDHELD";
  oStartDate = new Date().toISOString();
  oEndDate = new Date().toISOString();
  // oStartDate:any;
  // oEndDate:any;
  loader:any;
  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController
    , private toastCtrl: ToastController, private storage: Storage, private alertCtrl: AlertController) {

      this.storage.get('_user').then((res) => {
        this.oUsername = res;
        this.oClient = this.oUsername;
        this.doGetBranch(this.oUsername);
      });
  }
  doSendToSaleReturn(doc_no, customer, status){
    this.navCtrl.push("SaleReturnPage", { doc_no: doc_no, customer: customer, status: status });
  }
  doGetBranchReturnList(oClient, oStartDate, oEndDate){
    oStartDate = oStartDate.split('T')[0];
    oEndDate = oEndDate.split('T')[0];

    console.log(oClient, this.oBranch, oStartDate, oEndDate)
    this.service.getBranchReturnList(oClient, this.oBranch, oStartDate, oEndDate).then((res)=>{
      this.data_Branch_list = res;
      console.log(this.data_Branch_list);
      if(this.data_Branch_list.length <= 0){
        this.Alert('Alert', 'ไม่พบข้อมูลในช่วงวันที่เลือก');
      }else{

      }
    })
  }
  doGetBranch(oClient){
    this.service.get_Branch(oClient).then((res)=>{
      this.oBranchName = res.username;
      this.oBranch = res.customer_code;
      console.log(this.oBranch, this.oBranchName);
    })
  }
  doCreateBranchReturnHeader(oClient){
    this.service.CreateBranchReturnHeader(oClient, this.oBranch, this.oUsername).then((res)=>{
      this.data_Create_branch = res;
      console.log(this.data_Create_branch);

      this.navCtrl.push("SaleReturnPage", { doc_no: this.data_Create_branch.doc_no });

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
