## Data Formats
- `Master`/`SubMaster` Props
    - `sortable` (*optional*)
        - Boolean value indicates whether user can sort master records
    - `defaultSort` (*optional*)
        - Accept default sort as `[key, 1/-1]`
    - `limits` (*optional*)
        - Accepts array of numbers to show as limit for pagination
    - `routes` (*optional*)
        - Accepts key-value pair of routes to be used for API calls, see `data-formats`
    - `loader` (*optional*)
        - Accepts `JSX` element to be show when data is loading
    - `explicitForm` (*optional*)
        - Boolean value indicates use of external form if true
    - `permissions` (*optional*)
        - Accepts key-value pair for permissions for user to list, create, update, delete, etc. see `data-formats`
    - `t(CODE)` (*optional*)
        - Accepts function to show texts in internationalized version 
    - `preConfirmDelete({ row })` (*optional*)
        - Callback to execute before calling delete API

- `Table` Props
    - `columns` (*optional*)
        - Accepts array of columns to show from data, Data will includes Actions to `edit`/`delete` (when not specified false for `actions`)
        - Defaults columns are for `Name`, `Code`, `Active` and actions
        - columns accepts array of value in `ColumnSchema` pattern in `data-formats`
    - `actions` (*optional*)
        - Accepts `false` or object in `TableActions` pattern in `data-formats`
        - false | TableActionTypes

- `Routes_Input`
    - Accepts Object with key as `ACTION_TYPES` and value as funcion
    - Function provides avails parameters
        - `module` => current module `master`
        - `id` => id of record, in case of update/delete
    - Function need following parameters in return
        - `url` => relative url like `/admin/masters/update`
        - `method` => HTTP method like **GET**, **POST**, etc.

- `Permissions`
    - Allows providing following permissions for Master/SubMaster
        - `list` => Can user see data
        - `sequencing` => Can user change item sequence
        - `add` => Can user add new record
        - `update` => Can user update record
        - `partialUpdate` => Can user do partial update like change in `isActive`
        - `destroy` => Can user delete record

- `ColumnSchema`
    - `Header` => string or react element
    - `accessor` => string to access data value from object
    - `id` (*optional*) => unique id
    - `sortable` (*optional*) => boolean value indicates, if user can sort column
    - `Cell` (*optional*) => `({ row, onUpdate }) => JSX.Element`
        - `row` is record currently accessing
        - `onUpdate(data)` callback function to execute to perform update

- `TableActions`
    - `showUpdate` => boolean value indicates whether user can update data
    - `showDelete` => boolean value indicates whether user can delete data
    - `atFirst` => boolean value indicates whether **TableActions** should be shown at first

- `FormState`
    - `ADD` => Adding Record
    - `UPDATE` => Updating Record
    - `DELETE` => Deleting Record
    - `''` => Nothing selected