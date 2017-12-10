import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { usercreds } from '../../models/interfaces/usercreds';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  login: string;
  pass: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider, public storage: Storage) {
    this.storage.get(`setting:login`).then((login) => {
      //console.log('login :' + login);
      if ((login != null) && (login != undefined)) {
        this.credentials.email = login;
      }
    });
    this.storage.get(`setting:pass`).then((pass) => {
      //console.log('mot de passe :' + pass);
      if ((pass != null) && (pass != undefined)) {
        this.credentials.password = pass;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    this.authservice.login(this.credentials).then((res: any) => {
      if (!res.code) {
        this.set('login',this.credentials.email);
        this.set('pass',this.credentials.password);
        this.navCtrl.setRoot('TabsPage');
      }
      else
        alert(res);
    })
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }
  public set(settingName,value){
    console.log(settingName+' '+value);
    
    return this.storage.set(`setting:${ settingName }`,value);
  }
  public async get(settingName){
    return await this.storage.get(`setting:${ settingName }`);
  }
  public async remove(settingName){
    return await this.storage.remove(`setting:${ settingName }`);
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }
}
