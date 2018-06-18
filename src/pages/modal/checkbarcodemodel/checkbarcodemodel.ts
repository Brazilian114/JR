import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController, Content, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../../services/service';
import { Keyboard } from '@ionic-native/keyboard';
@Component({
  selector: 'page-checkbarcodemodel',
  templateUrl: 'checkbarcodemodel.html'
})
export class CheckbarcodemodelPage {
  @ViewChild('focusInputScanCode') myInputScanCode;
  @ViewChild(Content) content: Content;

  data_barcode:any;
  data_add_barcode:any;
  data_detail_barcode:any;
  data_delete_barcode:any;

  oUsername:any;
  oReceipt:any;
  oClient:any;
  oBarcode_S:any;
  oBarcode:any;
  oDescription:any;
  oUOM:any;
  loader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController , private storage: Storage, private toastCtrl: ToastController, private keyboard: Keyboard, public platform: Platform) {
       this.storage.get('_user').then((res)=>{
         this.oUsername = res;
         console.log(this.oUsername);

             // this.doGetClient(this.oUsername);
       })
       this.oClient = navParams.get('oClient');
       this.oReceipt = navParams.get('oReceipt');
       this.oBarcode_S = navParams.get('oBarcode');

       this.doCheckBarCode(this.oClient, this.oReceipt, "");
  }
  doClick(){
    this.updateScroll();
  }
  ionViewDidEnter(){
    this.platform.ready().then(() => {
      this.keyboard.disableScroll(true);
    });
    setTimeout(()=>{
        this.keyboard.close();
        this.myInputScanCode.setFocus();
        this.updateScroll();

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
  doSelectClient(client_no){
    // let nav = this.app.getRootNav();
    // nav.setRoot(CheckinPage, {client_no: client_no});

    let data = { 'client_no': client_no };
    this.viewCtrl.dismiss(data);
    // console.log(data);
  }
  doGetClient(oUsername){
    this.presentLoading();
    this.service.get_client(oUsername).then((res)=>{
      // this.data_client = res;
      // console.log(this.data_client);
      this.finishLoding();
    })
  }
  doCheckBarCode(oClient, oReceipt, oBarcode){
    this.service.get_Receipt_Get_Check_Barcode(oClient, oReceipt, oBarcode).then((res)=>{
      this.data_barcode = res;
      console.log(this.data_barcode);
    })
  }
  doAddCheckBarcode(){
    this.service.update_Receipt_Check_Barcode(this.oClient, this.oReceipt, this.oBarcode, this.oUsername).then((res)=>{
      this.data_add_barcode = res;
      console.log(this.data_add_barcode);
      if(this.data_add_barcode["0"].sqlstatus != 0){
            this.presentToast(this.data_add_barcode["0"].sqlmsg, false, 'bottom');

            this.service.get_Barcode_Detail(this.oClient, this.data_add_barcode["0"].Column1).then((res)=>{
              this.data_detail_barcode = res;
              console.log(this.data_detail_barcode);

              // this.oUOM = this.data_detail_barcode["0"].item_uom;
              // this.oDescription = this.data_detail_barcode["0"].description;

              this.doCheckBarCode(this.oClient, this.oReceipt, "");

              setTimeout(()=>{
                  this.keyboard.close();
                  this.myInputScanCode.setFocus();
              },0);
              setTimeout(()=>{
                  this.myInputScanCode.setFocus();
                  this.updateScroll();
                  this.keyboard.close();
              },2000);

            })
      }else{
        this.service.get_Barcode_Detail(this.oClient, this.data_add_barcode["0"].Column1).then((res)=>{
          this.data_detail_barcode = res;
          console.log(this.data_detail_barcode);

          this.oUOM = this.data_detail_barcode["0"].item_uom;
          this.oDescription = this.data_detail_barcode["0"].description;

          this.oBarcode = "";
          this.oUOM = "";
          this.oDescription = "";

          this.presentToast(this.data_add_barcode["0"].sqlmsg, false, 'bottom');


          this.doCheckBarCode(this.oClient, this.oReceipt, "");

          setTimeout(()=>{
              this.keyboard.close();
              this.myInputScanCode.setFocus();

          },0);
          setTimeout(()=>{
              this.myInputScanCode.setFocus();
              this.updateScroll();
              this.keyboard.close();
          },2000);

        })
      }
    })
  }
  doDeleteBarcode(oBarcode){
    console.log('Barcode :',this.oClient, this.oReceipt["0"], oBarcode["0"], this.oUsername);
    this.service.delete_Receipt_Check_Barcode(this.oClient, this.oReceipt["0"], oBarcode["0"], this.oUsername).then((res)=>{
      this.data_delete_barcode = res;
      console.log(this.data_delete_barcode);


      if(this.data_delete_barcode["0"].sqlstatus != 0){
        this.presentToast(this.data_delete_barcode["0"].sqlmsg, false, 'bottom');
      }else{
        this.presentToast(this.data_delete_barcode["0"].sqlmsg, false, 'bottom');
          this.oBarcode = "";
          this.oUOM = "";
          this.oDescription = "";

        this.doCheckBarCode(this.oClient, this.oReceipt, "");

        setTimeout(()=>{
            this.keyboard.close();
            this.myInputScanCode.setFocus();

        },0);
        setTimeout(()=>{
            this.myInputScanCode.setFocus();
            this.keyboard.close();
        },1000);

      }

    })
  }

  doReturnItemDetail(item_barcode,description,uom){
    this.oBarcode = item_barcode;
    this.oUOM = uom;
    this.oDescription = description;
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
  dismiss() {
     this.viewCtrl.dismiss();

   }
}
