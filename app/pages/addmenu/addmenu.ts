
import {Page, NavController, NavParams, Storage, LocalStorage, Events, Alert} from 'ionic-angular';
import {UniteMenu} from '../../unite-framework/unitemenu';
@Page({
    templateUrl: 'build/pages/addmenu/addmenu.html',
    providers: [UniteMenu]
})
export class AddmenuPage {
    addmenu: any;
    submitted: boolean;
    resultdata: any;
    local: any;
    scannerRes: any;
    platform: any;
    events: any;
    pages: any;
    updateButton: boolean;
    constructor(private nav: NavController, events: Events, private uniteMenu: UniteMenu) {
        // If we navigated to this page, we will have an item available as a nav param
        this.nav = nav;
        this.addmenu = {};
        this.submitted = false;
        this.local = new Storage(LocalStorage);
        this.scannerRes = [];
        this.events = events;
        this.updateButton = false;
        this.pages = [];
        uniteMenu.getMenu().then((value) => {
            this.getCustomPage(value);
        });
    }
    getCustomPage(pages) {
        this.pages = [];
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].addedMenu) {
                this.pages.push(pages[i]);
            }
        }
    }
    addMenu(form) {
        this.submitted = true;
        if (form.valid) {
            this.events.publish('page:added', this.addmenu);
            this.uniteMenu.getMenu().then((value) => {
                this.getCustomPage(value);
            });
        } else {
        }
        return false;
    }
    removeMenu(index) {
        let confirm = Alert.create({
            title: 'Configure',
            message: 'Do you want to delete it?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('No clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.pages.splice(index, 1);
                        this.events.publish('page:removed', index);
                    }
                }
            ]
        });
        this.nav.present(confirm);
    }
    editMenu(index, item) {
        this.addmenu.menuname = item.title;
        this.addmenu.component = item.component;
        this.addmenu.index = index;
        this.updateButton = true;
    }
    updateMenu(form) {
        this.submitted = true;
        if (form.valid) {
            this.events.publish('page:updated', this.addmenu);
            this.uniteMenu.getMenu().then((value) => {
                this.getCustomPage(value);
                this.updateButton = false;
                this.addmenu = {};
                this.submitted = false;
            });
        } else {
            console.log("not valid");
        }
        return false;
    }

}