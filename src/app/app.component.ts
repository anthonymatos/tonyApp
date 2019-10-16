import { HomePage } from './../pages/home/home';
import { Component, ViewChild, Sanitizer } from '@angular/core'
import { Platform, Nav, Events } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { ListPage } from '../pages/list/list'
import { LoginPage } from '../pages/login/login'
import { Storage } from '@ionic/storage'

import { Geolocation } from '@ionic-native/geolocation'
import { Vibration } from '@ionic-native/vibration';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav

  rootPage:any = HomePage;
  pages: Array<{ title: string; component: any }>
  urlImage: String = 'assets/imgs/no_user.png'
  dadosUser: any

  constructor(
    public platform: Platform, 
    public storage: Storage, 
    public statusbar: StatusBar, 
    public splashscreen: SplashScreen,
    public events: Events, 
    public geolocation: Geolocation,
    private vibration: Vibration,
    private camera: Camera, 
    ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Login', component: LoginPage },
   
    ]

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusbar.styleDefault();
      this.splashscreen.hide();
    });

    this.events.subscribe('attUser', (data) => {
      this.dadosUser = data
      this.urlImage = data.avatar_url
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }  

  sair() {
    this.nav.setRoot(LoginPage)
    this.storage.clear()
  }

  pegarGps() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        let lat = resp.coords.latitude
        let log = resp.coords.longitude

        alert('Sua posição é ' + lat + ' ' + log)
      })
        .catch((error) => {
          console.log('Error getting logation', error)
        })
  
      }


      vibrar() {
        this.vibration.vibrate([2000,1000,2000]);
      }

      tirarFoto() {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
        }
        
        this.camera.getPicture(options).then((imageData) => {
         // imageData is either a base64 encoded string or a file URI
         // If it's base64 (DATA_URL):
         let base64Image = 'data:image/jpeg;base64,' + imageData;
         
        }, (err) => {
         // Handle error
        }); 

      }



}


 