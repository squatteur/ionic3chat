import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';

/**
 * Generated class for the NewgroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-newgroup',
  templateUrl: 'newgroup.html',
})
export class NewgroupPage {
  newgroup = {
    groupName: 'GroupName',
    groupPic: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public groupservice: GroupsProvider, public imghandler: ImghandlerProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewgroupPage');
  }

  chooseimage() {
    if (this.newgroup.groupName == 'GroupName') {
      let namealert = this.alertCtrl.create({
        buttons: ['ok'],
        message: 'S\'il vous plaît saisissez votre nom de groupe en premier. Merci'
      });
      namealert.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Chargement, s\'il vous plaît, attendez.'
      });
      loader.present();
      this.imghandler.grouppicstore(this.newgroup.groupName).then((res: any) => {
        loader.dismiss();
        if(res)
          this.newgroup.groupPic = res;  
      }).catch((err) => {
        alert(err);
      })
    }
    
  }

  creategroup() {
    this.groupservice.addgroup(this.newgroup).then(() => {
      this.navCtrl.pop();
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
  }

  editgroupname() {
    let alert = this.alertCtrl.create({
      title: 'Editer le nom de groupe',
      inputs: [{
        name: 'groupname',
        placeholder: 'Donnez un nom de groupe'
      }],
      buttons: [{
        text: 'Annuler',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Valider',
        handler: data => {
          if (data.groupname) {
            this.newgroup.groupName = data.groupname
          }

          else {
            this.newgroup.groupName = 'groupName';
          }
        }
      }
      ]
    });
    alert.present();
  }

}
