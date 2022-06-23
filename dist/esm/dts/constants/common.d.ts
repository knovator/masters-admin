declare const DEFAULT_OFFSET_PAYLOAD = 0;
declare const DEFAULT_LIMIT = 20;
declare const SORT_ASCENDING = 1;
declare const SORT_DESCENDING = -1;
declare const PAGE_LIMITS: number[];
declare const DECIMAL_REDIX = 10;
declare const DEFAULT_CURRENT_PAGE = 1;
declare const EXCLUDE_SORT_COLUMNS: string[];
declare const INTERNAL_ERROR_CODE = "INTERNAL_ERROR";
declare enum CALLBACK_CODES {
    "GET_ALL" = "GET_ALL",
    "GET_SINGLE" = "GET_SINGLE",
    "CREATE" = "CREATE",
    "UPDATE" = "UPDATE",
    "DELETE" = "DELETE",
    "IMAGE_UPLOAD" = "IMAGE_UPLOAD",
    "SEQUENCE_UPDATE" = "SEQUENCE_UPDATE"
}
declare const DEFAULT_PERMISSIONS: {
    list: boolean;
    add: boolean;
    destroy: boolean;
    partialUpdate: boolean;
    sequencing: boolean;
    update: boolean;
};
declare const TRANSLATION_PAIRS_SUBMASTERS: {
    uploadFile: string;
    dragDrop: string;
    allowedFormat: string;
    sequence: string;
    name: string;
    enterName: string;
    requiredName: string;
    code: string;
    enterCode: string;
    requiredCode: string;
    webDisplay: string;
    enterWebDisplay: string;
    active: string;
    description: string;
    enterDescription: string;
    cover: string;
    searchSubMasters: string;
    addSubMaster: string;
    updateSubMaster: string;
};
declare const TRANSLATION_PAIRS_MASTERS: {
    addMaster: string;
    updateMaster: string;
    searchMaster: string;
    name: string;
    enterName: string;
    requiredName: string;
    code: string;
    enterCode: string;
    requiredCode: string;
    webDisplay: string;
    enterWebDisplay: string;
    description: string;
    enterDiscription: string;
    active: string;
};
declare const TRANSLATION_PAIRS_COMMON: {
    permanentlyDelete: string;
    lossOfData: string;
    pleaseType: string;
    toProceedOrCancel: string;
    confirm: string;
    "common:actions": string;
    "common:cancel": string;
    page: string;
    next: string;
    previous: string;
    indicatesRequired: string;
};
export { CALLBACK_CODES, DECIMAL_REDIX, DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT, DEFAULT_OFFSET_PAYLOAD, EXCLUDE_SORT_COLUMNS, INTERNAL_ERROR_CODE, PAGE_LIMITS, SORT_ASCENDING, SORT_DESCENDING, DEFAULT_PERMISSIONS, TRANSLATION_PAIRS_SUBMASTERS, TRANSLATION_PAIRS_MASTERS, TRANSLATION_PAIRS_COMMON, };
