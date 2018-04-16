export interface Renderer {
    data: any;
    mapper: any;
    widgetName: any;
    metadata: any;
}

export interface IMenu {
    /**
     * menu id
    */
    id: string;
    /**
     * menu name
    */
    name: string;
    /**
    * menu alias
    */
    alias: string;
    /**
    * menu menuUrl
    */
    menuUrl?: string;
    /**
     * menu parent
    */
    parent?: string;
    /**
     * menu ordering
    */
    ordering?: string;
    /**
     * menu sourceId
    */
    sourceId: string;
    /**
     * menu source
    */
    source?: Object;
    /**
     * menu source
    */
    subMenu?: Array<IMenu>;
}

export interface IRoute { }