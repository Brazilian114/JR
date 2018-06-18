import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController, Content, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { Service } from '../../services/service';

import { OperationPage } from '../operation/operation';
import { SettingPage } from '../setting/setting';
import { HomePage } from '../home/home';

import { Network } from '@ionic-native/network';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild(Content) content: Content;

  loader:any;
  data_logins:any;
  oUsername:string = '';
  oPassword:string = '';
  oChkLoc:string = '';
  url:string;
  constructor(public navCtrl: NavController, private toastCtrl: ToastController,private loadingCtrl: LoadingController
    , private storage: Storage, private service : Service, private alertCtrl: AlertController, private network: Network
    , private screenOrientation: ScreenOrientation, public platform: Platform, private keyboard: Keyboard) {

      // this.doLoginJson(this.oUsername, this.oPassword);
  }
  ionViewDidEnter() {
      this.platform.ready().then(() => {
        this.keyboard.disableScroll(true);
      });
  }
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 150)
    }
  doLoginJson(oUsername, oPassword){
    this.service.doLoginGet(oUsername, oPassword).subscribe((res)=>{
      this.data_logins = res;
      console.log(this.data_logins);
    })
  }
  doClick(){
    this.updateScroll();
  }
  doLogin(oUsername, oPassword){
    this.storage.get('_url').then((res)=>{
      this.url = res;
      if(this.url != null){
        this.network.onDisconnect().subscribe(() => {
        });
        this.network.onConnect().subscribe(() => {
        });
        if(this.network.type !== 'none'){
          if(oUsername == "" || oUsername == undefined){
            this.Alert('Error', 'กรุณากรอกชื่อผู้ใช้อีกครั้ง');
          }else if(oPassword == "" || oPassword == undefined){
            this.Alert('Error', 'กรุณากรอกรหัสผ่านอีกครั้ง');
          }else{
            oUsername = oUsername.toUpperCase();
            oPassword = oPassword.toUpperCase();

            this.presentLoading()
            this.service.get_login(oUsername, oPassword).then((res)=>{
              this.data_logins = res;
              console.log(this.data_logins);

              if(this.data_logins['sqlstatus'] != '0'){
                this.Alert('Error', 'กรุณากรอกชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง');
              }else{
                this.storage.ready().then(() => {
                       this.storage.set('_user', oUsername)

                     })
                this.finishLoding();
                this.navCtrl.setRoot(HomePage);
              }
            });
          }
        }else if(this.network.type === 'none'){
          this.presentToast('Please Check your network and try again', false, 'bottom');
        }else{
          this.presentToast('Please Check your network and try again', false, 'bottom');
        }
      }else{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'You Not Set Web Service',
          buttons: [ {
              text: 'ตกลง',
              handler: data => {

              }
            }]
        });
        alert.present();
      }
    })
  }
  doSetting(){
    this.navCtrl.push(SettingPage);
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
  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content:"Loading...",
      duration:5000
  });
    this.loader.present().then(() => {});
  };
  finishLoding(){
    this.loader.dismiss();
  }
}
