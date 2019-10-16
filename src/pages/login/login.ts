import { HomePage } from './../home/home';
import { UsarioProvider } from './../../providers/usario/usario'
import { Component } from '@angular/core'
import { CadastroPage } from '../cadastro/cadastro'
import { Storage } from '@ionic/storage'
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular'



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: String
  senha: String
  urlImage: String = 'assets/imgs/smartphone.svg'
  nomeUsuario: String = ''
  isUsuarioValido: Boolean = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioProvider: UsarioProvider,
    public storage: Storage,
    public menu: MenuController
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage')

    this.storage.get('logado').then((data) => {
      if (data) {
        console.log(data)

        this.menu.swipeEnable(true, 'menuMain')

        this.navCtrl.setRoot(HomePage)
       
        }else {

          this.menu.swipeEnable(false, 'menuMain')
    }

  })
}

  buscarUserGithub() {
    this.usuarioProvider.buscarUserGithub(this.email).then((data: any) => {
      if (data.avatar_url) {
        //se o usuário existir faça isso
        this.urlImage = data.avatar_url
        this.nomeUsuario = data.name
        this.isUsuarioValido = true
        console.log(data)
      } else {
        this.isUsuarioValido = false
        this.urlImage = 'assets/imgs/user.svg'
      }
    })
  }

  fazerLogin(){
    let elementoBotao = <HTMLElement>document.querySelector('#btnLogin')
    elementoBotao.innerText = 'Entrando...'
    let corAntiga = elementoBotao.style.backgroundColor
    elementoBotao.style.background = "#7F8C8d"

    setTimeout(()=>{
      if(this.senha == 'admin') {
            console.log('Logado!')
            this.navCtrl.setRoot(HomePage)
      } else{
            console.log('E-mail ou senha inválidos')
      }
      elementoBotao.innerText = 'ENTRAR'
      elementoBotao.style.background = corAntiga
    },3000)
  }

   abrirCadastro() {
    this.navCtrl.push(CadastroPage)
  }
}