import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { Service } from '../../services/service';
import { PutawaydetailPage } from '../putawaydetail/putawaydetail';
import { RecipesmodalPage } from '../modal/recipesmodal/recipesmodal';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-packing',
  templateUrl: 'packing.html'
})
export class PackingPage {
  @ViewChild('focusInputScanCode') myInputScanCode;
  @ViewChild('focusInputQty') myInputQty;
  @ViewChild('focusInputLocation_Confirm') myInputLocation_Confirm;
  @ViewChild(Content) content: Content;

  data_detail:any;
  data_return_genRN:any;
  data_return_CheckPallet:any;
  data_return_Putaway:any;
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
  constructor(public navCtrl: NavController,private loadingCtrl: LoadingController, private toastCtrl: ToastController, private modalCtrl: ModalController
    , private service: Service, private storage: Storage, private keyboard: Keyboard) {
      this.storage.get('_user').then((res)=>{
        this.oUsername = res;
      })
  }

  ionViewDidEnter(){
    setTimeout(()=>{
        this.barcodeOnClick();
        // this.myInputScanCode.setFocus();
    },0);
    setTimeout(()=>{
        this.barcodeOnClick();
    },200);
  }

  doGetPalletforPutaway(oRecipt){

      console.log(this.oUsername);

      let profileModal = this.modalCtrl.create(RecipesmodalPage, { oRecipt: oRecipt, oUsername: this.oUsername });
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log(data);
          this.oRecipt = data.receipt_no;
          this.doGetPutawayDetail(this.oRecipt, this.oUsername);
        });
  }
  doPutawayDetail(oRecipt){
      console.log(this.oUsername);
      this.navCtrl.push(PutawaydetailPage, { oRecipt: oRecipt, oUsername: this.oUsername });

  }
  doGetPutawayDetail(oRecipt, oUsername){
    console.log(oRecipt);
    this.service.get_putaway_detail(oRecipt, "", oUsername).then((res)=>{
      this.data_detail = res;
      console.log(this.data_detail);
      if(this.data_detail["0"].Column1 == "E"){
        this.presentToast(this.data_detail["0"].Column2, false, 'bottom');
        this.data_detail = null;
      }
    });
  }
  doReturnItemDetail(item_no,description,qty,location_to,rec_num,warehouse_to,pallet_no){
    console.log(item_no, description, qty, location_to, rec_num);
    this.oItem_no = item_no;
    this.oItem_des = description;
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
      // this.myInputLocation_Confirm.setFocus();
    },150);
  }
  doClear(){
    this.oItem_no = null;
    this.oItem_des = null;
    this.oLocation = null;
    this.oQty = null;
    this.data_detail = null;
    this.oRecipt = null;
    this.oLocation_confirm = null;
  }
  doClearDetail(){
    this.oItem_no = null;
    this.oItem_des = null;
    this.oLocation = null;
    this.oQty = null;
    this.oLocation_confirm = null;
  }
  doConfirm(oQty, oLocation, oLocation_confirm, oItem_no, oRecipt){
    this.storage.get('_Qty').then((res)=>{
      this.CheckQty = res;
      this.storage.get('_RecNum').then((res)=>{
        this.CheckRec_Num = res

        var cQty = parseFloat(oQty.toString().trim());
        var cCQty = parseFloat(this.CheckQty.toString().trim());
        var cCheckRec_Num = this.CheckRec_Num.toString().trim();
        var coRecipt = this.oRecipt.toString().trim();
        var coItem_no = this.oItem_no.toString().trim();

        if(oLocation_confirm != undefined){
          if(cQty!= cCQty){
            this.service.gen_rec_num(coRecipt, coItem_no, cQty, cCheckRec_Num).then((res)=>{
              this.data_return_genRN = res;

              console.log(this.data_return_genRN);

              if(this.data_return_genRN["0"].sqlstatus != '-3'){
                this.storage.get('_Wh').then((res)=>{
                  this.oWh = res;
                  var coWh = this.oWh.toString().trim();

                  this.service.check_pallet_in_location(this.data_return_genRN["0"].pallet+"0", coWh, oLocation_confirm).then((res)=>{
                    this.data_return_CheckPallet = res;
                    console.log(this.data_return_CheckPallet);

                    if(this.data_return_CheckPallet["0"].sqlstatus == '0'){

                        this.service.putaway(this.data_return_genRN["0"].pallet+"0", coWh, oLocation_confirm, this.oUsername).then((res)=>{
                          this.data_return_Putaway = res;
                          console.log(this.data_return_Putaway);
                          if(this.data_return_Putaway["0"].sqlstatus != '0'){
                              this.presentToast(this.data_return_Putaway["0"].sqlmsg, false, 'bottom');
                          }else{
                            this.presentToast(this.data_return_Putaway["0"].sqlmsg, false, 'bottom');
                            this.doClearDetail();
                            this.doGetPutawayDetail(this.oRecipt, this.oUsername);
                          }
                        })

                    }else{
                      this.presentToast('ไม่พบ Location', false, 'bottom');
                    }

                  })
                })
              }else{
                this.presentToast('จำนวนมากเกินไป', false, 'bottom');
              }

            })
          }else{
            this.storage.get('_PalleNO').then((res)=>{
              this.oPalleNO = res;
              var coPalleNO = this.oPalleNO.toString().trim();

              this.storage.get('_Wh').then((res)=>{
                this.oWh = res;
                var coWh = this.oWh.toString().trim();

                this.service.check_pallet_in_location(coPalleNO+"0", coWh, oLocation_confirm).then((res)=>{
                  this.data_return_CheckPallet = res;
                  console.log(this.data_return_CheckPallet);

                  if(this.data_return_CheckPallet["0"].sqlstatus == '0'){

                      this.service.putaway(coPalleNO+"0", coWh, oLocation_confirm, this.oUsername).then((res)=>{
                        this.data_return_Putaway = res;
                        console.log(this.data_return_Putaway);
                        if(this.data_return_Putaway["0"].sqlstatus != '0'){
                            this.presentToast(this.data_return_Putaway["0"].sqlmsg, false, 'bottom');
                        }else{
                          this.presentToast(this.data_return_Putaway["0"].sqlmsg, false, 'bottom');
                          this.doClearDetail();
                          this.doGetPutawayDetail(this.oRecipt, this.oUsername);
                        }
                      })

                  }else{
                    this.presentToast('ไม่พบ Location', false, 'bottom');
                  }

                })
              })
            })
          }
        }else{
            this.presentToast('โปรดระบุ Confirm Location', false, 'bottom');
        }

      })
    })

  }
  doBack(){
      this.navCtrl.setRoot(HomePage);
  }
  onKeyup(){
    console.log(this.oRecipt)
    let barcode=this.oRecipt;
    this.doGetPutawayDetail(barcode, this.oUsername);
  }
  barcodeOnClick(){
    setTimeout(()=>{
      this.keyboard.close();
    },0);
    setTimeout(()=>{
      this.keyboard.close();
    },200)
  }
  clickInput(){
    setTimeout(()=>{
      this.keyboard.show();
    },0);
    setTimeout(()=>{
      this.keyboard.show();
    },200)
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
