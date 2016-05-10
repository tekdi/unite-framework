import {App, IonicApp, Platform, Events} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ListPage} from './pages/list/list';
import {DetailsPage} from './pages/details/details';
import {UniteMenu} from './unite-framework/unitemenu';
import {AddmenuPage} from './pages/addmenu/addmenu';

@App({
  templateUrl: 'build/app.html',
  providers: [UniteMenu],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  rootPage: any = GettingStartedPage;
  pages: any;
  uniteMenu: any;

  constructor(private app: IonicApp, private platform: Platform, uniteMenu: UniteMenu, private events: Events) {
    this.initializeApp();
    this.uniteMenu = uniteMenu;
    this.uniteMenu.menuMap = {
      'GettingStartedPage': GettingStartedPage,
      'ListPage': ListPage,
      'DetailsPage': DetailsPage,
      'AddmenuPage': AddmenuPage,
    };

    this.uniteMenu.pages = [
      { title: 'First Page', component: 'GettingStartedPage' },
      { title: 'List', component: 'ListPage' },
      { title: 'Details', component: 'DetailsPage', options: { item: { id: 3 } } },
      { title: 'Add Menu', component: 'AddmenuPage' }
    ];
    // used for an example of ngFor and navigation
    this.pages = [];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.uniteMenu.getMenu().then((value) => {
        this.pages = value;
      });
      this.events.subscribe('page:added', (res) => {
        this.uniteMenu.addMenu(res[0]);
      });
      this.events.subscribe('page:removed', (index) => {
        this.uniteMenu.removeMenu(index[0]);
      });
      this.events.subscribe('page:updated', (res) => {
        this.uniteMenu.updateMenu(res[0]);
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(this.uniteMenu.menuMap[page.component]);
  }
}
