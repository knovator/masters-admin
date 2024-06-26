const DEFAULT_OFFSET_PAYLOAD = 0
const DEFAULT_LIMIT = 20
const SORT_ASCENDING = 1
const SORT_DESCENDING = -1
const PAGE_LIMITS = [10, 20, 30, 40, 50]
const DECIMAL_REDIX = 10
const DEFAULT_CURRENT_PAGE = 1
const EXCLUDE_SORT_COLUMNS = ["actions", "sequence"]
const INTERNAL_ERROR_CODE = "INTERNAL_ERROR"

enum CALLBACK_CODES {
    "GET_ALL" = "GET_ALL",
    "GET_SINGLE" = "GET_SINGLE",
    "CREATE" = "CREATE",
    "UPDATE" = "UPDATE",
    "DELETE" = "DELETE",
    "IMAGE_UPLOAD" = "IMAGE_UPLOAD",
    "IMAGE_REMOVE" = "IMAGE_REMOVE",
    "SEQUENCE_UPDATE" = "SEQUENCE_UPDATE",
    "INTERNAL" = "INTERNAL",
}

const DEFAULT_PERMISSIONS = {
    list: true,
    add: true,
    destroy: true,
    partialUpdate: true,
    sequencing: false,
    update: true,
}

const TRANSLATION_PAIRS_SUBMASTERS = {
    uploadFile: "Upload a file",
    dragDrop: "or drag and drop",
    allowedFormat: "PNG, JPG, SVG up to 2 MB",
    sequence: "Sequence", // Table

    cover: "Cover Image",
    searchSubMasters: "Search Sub Masters", // Search Placeholder
    addSubMaster: "Add Sub Master", // Add Button, Sidebar Title
    updateSubMaster: "Edit Sub Master", // Edit Button, Sidebar Title
    noDataText: "No data found! Click on 'Add Sub Master' to add one.", // No Data Text
    selectMaster: "select 'Master' to see respective 'SubMasters'", // Select Master Message
}

const TRANSLATION_PAIRS_MASTERS = {
    addMaster: "Add Master",
    updateMaster: "Edit Master",
    searchMaster: "Search Masters",
    noDataText: "No data found! Click on 'Add Master' to add one.", // No Data Text
}

const TRANSLATION_PAIRS_COMMON = {
    permanentlyDelete: "You are about to permanently delete the",
    lossOfData:
        "This action can lead to data loss. To prevent accidental actions we ask you to confirm your intention.",
    pleaseType: "Please type",
    toProceedOrCancel: "to processed or close this modal to cancel.",
    confirm: "Confirm",
    page: "Page",
    next: "Next",
    previous: "Previous",
    indicatesRequired: "Indicates fields are required",

    confirmationRequired: "Confirmation Required",
    cancel: "Cancel",
    yes: "Yes",
    delete: "Delete",
    create: "Create",
    update: "Update",
    show: "Show",
    showing: "Showing",
    of: "of",
    typeHerePlaceholder: "Type Here",

    code: "Code",
    codePlaceholder: "Enter code",
    codeRequired: "Code is required",
    name: "Name",
    namePlaceholder: "Enter name",
    nameRequired: "Name is required",

    webDisplay: "Web Display", // Form, Web Display Field
    enterWebDisplay: "Enter Web Display", // Web Display Placeholder
    description: "Discription", // Form,
    enterDescription: "Enter Discription", // Field placeholder

    active: "Active",
    actions: "Actions",
}

export {
    CALLBACK_CODES,
    DECIMAL_REDIX,
    DEFAULT_CURRENT_PAGE,
    DEFAULT_LIMIT,
    DEFAULT_OFFSET_PAYLOAD,
    EXCLUDE_SORT_COLUMNS,
    INTERNAL_ERROR_CODE,
    PAGE_LIMITS,
    SORT_ASCENDING,
    SORT_DESCENDING,
    DEFAULT_PERMISSIONS,
    TRANSLATION_PAIRS_SUBMASTERS,
    TRANSLATION_PAIRS_MASTERS,
    TRANSLATION_PAIRS_COMMON,
}
