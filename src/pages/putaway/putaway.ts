import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController , Content, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { Service } from '../../services/service';
import { PutawaydetailPage } from '../putawaydetail/putawaydetail';
import { HomePage } from '../home/home';
import { PutawaymodalPage } from '../modal/putawaymodal/putawaymodal';

@Component({
  selector: 'page-putaway',
  templateUrl: 'putaway.html'
})
export class PutawayPage {
  @ViewChild('focusInputScanCode') myInputScanCode;
  @ViewChild('focusInputQty') myInputQty;
  @ViewChild('focusInputLocation_Confirm') myInputLocation_Confirm;
  @ViewChild(Content) content: Content;

  data_detail:any;
  data_return_genRN:any;
  data_return_CheckPallet:any;
  data_return_Putaway:any;
  data_return_CheckUser:any;
  oLocation:any;
  oLocation_confirm:any;
  loader:any;
  isenabled:boolean = false;
  oItem_no:any;
  oItem_des:any;
  oQty:any;
  CheckQty:any;
  oRecipt:any;
  oRec_Num:any;
  CheckRec_Num:any;
  oWh:any;
  oUsername:any;
  oPalleNO:any;
  oPallet:any;
  data_logins:any;
  username:string = '';
  password:string = '';
  chk_Loc:string = '';
  constructor(public navCtrl: NavController,private loadingCtrl: LoadingController, private toastCtrl: ToastController, private modalCtrl: ModalController
    , private service: Service, private storage: Storage, private keyboard: Keyboard, private alertCtrl: AlertController, public platform: Platform) {
      this.storage.get('_user').then((res)=>{
        this.oUsername = res;
      })

      this.storage.get('_chk_Loc').then((res)=>{
        this.chk_Loc = res;
        console.log(this.chk_Loc);
      })
      // this.keyboard.onKeyboardHide();

  }
  ionViewDidEnter() {
      this.platform.ready().then(() => {
        this.keyboard.disableScroll(true);
      });
      setTimeout(()=>{
          this.keyboard.close();
          this.myInputScanCode.setFocus();

      },0);
      setTimeout(()=>{
          this.keyboard.close();
      },100);
  }
  doClick(){
    this.updateScroll();
  }
  ionViewWillLeave() {
    this.storage.remove('_Wh');
  }

  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }
  doGetPalletforPutaway(oPallet){
      let profileModal = this.modalCtrl.create(PutawaymodalPage, { oPallet: oPallet });
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log(data);
          if(data != undefined){
            this.oPallet = data.oPalletNo;
            this.service.get_pallet_for_putaway(this.oPallet+"0").then((res)=>{
              this.data_detail = res;
              console.log("แสดง Loc.",this.data_detail.location_to);
                console.log("แสดง chk_Loc.",this.chk_Loc);
              this.oLocation = this.data_detail["0"].location_to["0"];
              console.log(this.data_detail);

              this.storage.set('_Wh', this.data_detail["0"].warehouse_to["0"]);

              setTimeout(()=>{
                  this.myInputLocation_Confirm.setFocus();
                  this.updateScroll();
              },0);
              setTimeout(()=>{
              },200);
            })
          }else{

          }
        });
  }
  doPutawayDetail(oRecipt){
      console.log(this.oUsername);
      this.navCtrl.push(PutawaydetailPage, { oRecipt: oRecipt, oUsername: this.oUsername });

  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Login',
       message: 'คุณใส่ Con.Location ไม่ตรงกันกับ Assign.Location หากต้องการจะนำสินค้าไปเก็บไว้ที่ Location นี้ จะต้อง Login ด้วย ID ของผู้มีสิทธิ์ เปลี่ยน Location ก่อน',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            console.log('Login clicked',data.username,data.password);
          this.doLoginApprove(data.username,data.password);

          if(this.data_logins['edit_loc_wh_trask'] = 'Y'){
            this.Alert('OK', 'สามารถทำได้');
          }
            //   // logged in!
            // }

            else {
              // invalid login
              this.Alert('NO', 'ไม่สามารถทำได้');
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }



doLoginApprove(username,password){
  if(username == "" || username == undefined){
    this.Alert('Error', 'กรุณากรอกชื่อผู้ใช้อีกครั้ง');
  }else if(password == "" || password == undefined){
    this.Alert('Error', 'กรุณากรอกรหัสผ่านอีกครั้ง');
  }else{
    username = username.toUpperCase();
    password = password.toUpperCase();

    this.service.get_login(username, password).then((res)=>{
      this.data_logins = res;
      console.log(this.data_logins);

      if(this.data_logins['sqlstatus'] != '0'){
        this.Alert('Error', 'กรุณากรอกชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง');
      }
      // else{
      //   this.storage.ready().then(() => {
      //          //this.storage.set('_user', username)
      //        })
      //   // this.finishLoding();
      //   // this.navCtrl.setRoot(HomePage);
      // }
    });

  }

}



  doReturnItemDetail(item_no,description,qty,location_to,rec_num,warehouse_to,pallet_no){
    console.log(item_no, description, qty, location_to, rec_num);
    this.oLocation = location_to;
    this.oQty = qty;
    this.oRec_Num = rec_num;
    this.oWh = warehouse_to;
    this.oPalleNO = pallet_no;

    this.storage.set('_Qty', this.oQty);
    this.storage.set('_RecNum', this.oRec_Num);
    this.storage.set('_Wh', this.oWh);
    this.storage.set('_PalleNO', this.oPalleNO);

    setTimeout(()=>{
        this.myInputQty.setFocus();
        this.updateScroll();
    },0);
    setTimeout(()=>{
    },200);
  }
  doClear(){
    this.oLocation = null;
    this.oQty = null;
    this.data_detail = null;
    this.oPallet = null;
    this.oLocation_confirm = null;
    setTimeout(()=>{
        this.myInputScanCode.setFocus();
    },0);
    setTimeout(()=>{
    },200);
  }
  doClearDetail(){
    this.oLocation = null;
    this.oQty = null;
    this.oLocation_confirm = null;
  }
  doConfirm(oLocation, oLocation_confirm, oPallet){

  console.log("เช้กตัวแปร",oLocation, oLocation_confirm, oPallet);

    if(oPallet == undefined || oPallet == "")
    {
      this.presentToast('โปรดกรอกเลขที่ Pallet', false, 'bottom');
    }

    else  if (oLocation_confirm == undefined || oLocation_confirm == "")
    {
        this.presentToast('โปรดระบุ Location', false, 'bottom');
    }
    else if (oLocation != oLocation_confirm)
    {
       // this.service.Get_Chk_Confirm_Location_Putaway(this.oUsername,).then((res)=>{
       //   this.data_return_CheckUser = res;
       //  console.log(this.data_return_CheckUser);
       //     console.log(this.data_return_CheckUser["0"].edit_loc_wh_trask);
       //   });

         if(this.chk_Loc != 'Y')

         {
          console.log(this.chk_Loc);
        //this.presentPrompt() ;
         this.presentToast('Location Confirm ไม่ตรงกับ Location Assign จะต้อง Login ด้วย USER ที่มีสิทธิ์ในการเปลี่ยน Location', false, 'bottom');
           //return;
         }
         else
         {
             console.log("loop  else");
           //var oCPallet = this.oPallet;
           if(oLocation_confirm != undefined){
                   this.storage.get('_Wh').then((res)=>{
                     this.oWh = res;
                     var coWh = this.oWh;

                     this.service.check_pallet_in_location(oCPallet+"0", coWh, oLocation_confirm).then((res)=>{
                       this.data_return_CheckPallet = res;
                       console.log(this.data_return_CheckPallet);
                       if(this.data_return_CheckPallet["0"].sqlstatus == '0'){
                         console.log("good");
                           this.service.putaway(oCPallet+"0", coWh, oLocation_confirm, this.oUsername).then((res)=>{
                             this.data_return_Putaway = res;
                             console.log(this.data_return_Putaway);
                             if(this.data_return_Putaway["0"].sqlstatus != '0'){
                                 let alert = this.alertCtrl.create({
                                   title: 'Error',
                                   subTitle: this.data_return_Putaway["0"].sqlmsg,
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
                                 subTitle: this.data_return_Putaway["0"].sqlmsg,
                                 buttons: [ {
                                     text: 'ตกลง',
                                     handler: data => {
                                       this.doClear();
                                       setTimeout(()=>{
                                           this.keyboard.close();
                                           this.myInputScanCode.setFocus();
                                       },0);
                                       setTimeout(()=>{
                                           this.myInputScanCode.setFocus();
                                             this.keyboard.close();
                                       },2000);
                                     }
                                   }]
                               });
                               alert.present();
                             }
                           })
                       }else{
                         this.presentToast(this.data_return_CheckPallet["0"].sqlmsg, false, 'bottom');
                       }

                     })
                   })
           }else{
               this.presentToast('โปรดระบุ Confirm Location', false, 'bottom');
           }

         }

       }

    else
    {
      var oCPallet = this.oPallet;
      if(oLocation_confirm != undefined){
              this.storage.get('_Wh').then((res)=>{
                this.oWh = res;
                var coWh = this.oWh;

                this.service.check_pallet_in_location(oCPallet+"0", coWh, oLocation_confirm).then((res)=>{
                  this.data_return_CheckPallet = res;
                  console.log(this.data_return_CheckPallet);
                  if(this.data_return_CheckPallet["0"].sqlstatus == '0'){
                    console.log("good");
                      this.service.putaway(oCPallet+"0", coWh, oLocation_confirm, this.oUsername).then((res)=>{
                        this.data_return_Putaway = res;
                        console.log(this.data_return_Putaway);
                        if(this.data_return_Putaway["0"].sqlstatus != '0'){
                            let alert = this.alertCtrl.create({
                              title: 'Error',
                              subTitle: this.data_return_Putaway["0"].sqlmsg,
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
                            subTitle: this.data_return_Putaway["0"].sqlmsg,
                            buttons: [ {
                                text: 'ตกลง',
                                handler: data => {
                                  this.doClear();
                                  setTimeout(()=>{
                                      this.keyboard.close();
                                      this.myInputScanCode.setFocus();
                                  },0);
                                  setTimeout(()=>{
                                      this.myInputScanCode.setFocus();
                                        this.keyboard.close();
                                  },2000);
                                }
                              }]
                          });
                          alert.present();
                        }
                      })
                  }else{
                    this.presentToast(this.data_return_CheckPallet["0"].sqlmsg, false, 'bottom');
                  }

                })
              })
      }else{
          this.presentToast('โปรดระบุ Confirm Location', false, 'bottom');
      }

    }
  }

  doBack(){
      this.navCtrl.setRoot(HomePage);
  }
  onKeyup(oPallet){
    console.log(oPallet)
    let barcode=oPallet+"0";
       if(barcode != null || barcode != ""){
     this.service.get_pallet_for_putaway(barcode).then((res)=>{
       this.data_detail = res;
       console.log(this.data_detail);
       if(this.data_detail["0"].Column1 == "E"){
         this.Alert('Error', this.data_detail["0"].Column2);
       }else{
         console.log('2')
         this.oLocation = this.data_detail["0"].location_to["0"];

         this.storage.set('_Wh', this.data_detail["0"].warehouse_to["0"]);

         setTimeout(()=>{
             this.myInputLocation_Confirm.setFocus();
             this.updateScroll();
         },0);
       }
     })
   }else{
     this.myInputScanCode.setFocus();
   }
  }
  barcodeOnClick(){
    setTimeout(()=>{
      this.keyboard.close();
      this.myInputScanCode.setFocus();
    },0);
    setTimeout(()=>{
      this.keyboard.close();
    },200)
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
      duration: 2500,
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
