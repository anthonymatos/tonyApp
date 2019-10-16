
import { ListPage } from './../pages/list/list';
import { UsarioProvider } from './../providers/usario/usario';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';
import { Camera } from '@ionic-native/camera';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CadastroPage,
   
  ],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp),
  IonicStorageModule.forRoot({
    name: '__dbsenac',
    driverOrder: ['indexeddb', 'websql', 'sqlite'],
  }),
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CadastroPage,
   
   
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar, 
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    UsarioProvider,
    Geolocation,
    Vibration,
    Camera, 
    
    ],
})
export class AppModule {}