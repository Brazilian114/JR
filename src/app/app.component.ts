import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Service } from '../services/service';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  templateUrl: 'app.html',
  providers: [Keyboard]
})
export class WMSHandheld {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";
  oUsername:any;
  alert:any = null;
  pages: Array<{title: string, component: any}>;
  data_logins:any;

  data_receipt:any;
  backButtonPressedOnceToExit:any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private alertCtrl: AlertController, private toastCtrl: ToastController
    , public storage: Storage,private service: Service) {
    this.initializeApp();
    this.menuOpened();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "HomePage" },
      { title: 'DC Operation', component: "OperationPage" },
      //{ title: 'Branch Operation', component: OperationBranchPage },
      { title: 'Logout', component: null }
    ];

    this.platform.ready().then(() => {
           this.platform.registerBackButtonAction(() => {

             if (this.backButtonPressedOnceToExit) {
                    this.platform.exitApp();
                  } else if (this.nav.canGoBack()) {
                    this.nav.pop({});
                  } else {
                    this.presentToast('คลิกอีกครั้งเพื่อออกจากโปรแกรม', false, 'middle');

                    this.storage.get('_user').then((res)=>{
                      this.oUsername = res;
                      console.log(this.oUsername);
                      //this.doGetGrade();
                        this.service.Set_Logout(this.oUsername).then((res)=>{
                          this.data_receipt = res;
                            console.log(this.data_receipt)  });

                    })

                    this.backButtonPressedOnceToExit = true;
                    setTimeout(() => {
                      this.backButtonPressedOnceToExit = false;
                    },2000)
                  }
           });
       });


  }
  exitApp(){
     this.platform.exitApp();
  }
  openDCOperationPage(){
    this.nav.setRoot("OperationPage");
  }
  openHomePage(){
    this.nav.setRoot("HomePage");
  }
  doLogout(){
    let alert = this.alertCtrl.create({
      title: 'ออกจากระบบ',
      subTitle: "คุณต้องการออกจากระบบหรือไม่",
      buttons: [ {
          text: 'ยกเลิก',
          handler: data => {

          }
        },
        {
          text: 'ตกลง',
          handler: data => {


          //  this.service.Set_Loguot(oUsername).then((res)=>{
            //  this.data_receipt = res;
            //    console.log(this.data_receipt)  });

                this.storage.get('_user').then((res)=>{
                  this.oUsername = res;
                  console.log(this.oUsername);
                  //this.doGetGrade();
                    this.service.Set_Logout(this.oUsername).then((res)=>{
                      this.data_receipt = res;
                        console.log(this.data_receipt)  });
                })


            this.storage.ready().then(() => {
              this.storage.remove('_user');
              this.storage.remove('_RecNum');
              this.storage.remove('_oReversePallet');
              this.storage.remove('_Qty');
              this.storage.remove('_oLine');
              this.storage.remove('_oItem');
              this.storage.remove('_oReceipt');
              this.storage.remove('_Wh');
              this.storage.remove('_PalleNO');
              this.storage.remove('_user_Group');
              this.storage.remove('_user_Cus_name');
            });
            this.data_logins = "";
            this.data_receipt = "";
            // this.reload();



            this.nav.setRoot("LoginPage")
          }
        }
      ]
    });
    alert.present();
  }
  reload(){
    window.location.reload();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  menuOpened() {
    this.storage.get('_user').then((res) => {
      this.data_logins = res;
      console.log(this.data_logins);
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    // this.nav.setRoot(page.component);
    switch (true) {

          case ((page.title == 'Logout')): {
            // console.log('Clicked Logout button');
            this.doLogout();
            // this.logout(); // call logout logic method
          }
              break;

          default: {
            this.nav.setRoot(page.component);
          }
              break;
      }
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
