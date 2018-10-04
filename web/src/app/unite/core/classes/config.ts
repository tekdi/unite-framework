import * as configData from 'assets/config.json';

/**
 * Configuration class which set and get the Unite config object
 */
export class Config {
    baserUnitePath: object;
    baserFamilyPath: object;
    gbConfig: object;
    site: object;
    admin: object;
    server: object;

    /**
     * This function set the Unite config
     * 
     * @returns void
     */
    setConfig() {
        // this.baserUnitePath;
        // this.baserFamilyPath;
        // this.gbConfig;
        this.site = configData['site'];
        this.admin = configData['admin'];
        this.server = configData['server'];
    }

    /**
     * This function get the config
     * 
     * @returns Unite config object
     */
    getConfig() {
        return this;
    }
}
