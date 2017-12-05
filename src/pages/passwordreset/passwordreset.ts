import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the PasswordresetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public userservice: UserProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad PasswordresetPage');
  }

  reset() {
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });
    this.userservice.passwordreset(this.email).then((res: any) => {
      if (res.success) {
        alert.setTitle('Email envoyé');
        alert.setSubTitle('Veuillez suivre les instructions dans l\'email pour réinitialiser votre mot de passe');
      }
    }).catch((err) => {
      alert.setTitle('Echec');
      alert.setSubTitle(err);
    })
  }

  goback() {
    this.navCtrl.setRoot('LoginPage');
  }

}
