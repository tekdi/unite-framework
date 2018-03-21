import * as configData from 'assets/config.json';

export class Config {
    baserUnitePath : object;   
    baserFamilyPath: object;
    gbConfig: object;
    site: object;
    admin: object;
    server: object;

    setConfig() {
        // this.baserUnitePath;
        // this.baserFamilyPath;
        // this.gbConfig;
        this.site = configData['site'];
        this.admin = configData['admin'];
        this.server = configData['server'];
    }

    getConfig() {
        return this;
    }
}
