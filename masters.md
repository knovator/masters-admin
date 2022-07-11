<div id="top"></div>

## Master
Avails facility to `list`/`create`/`update`/`delete` records for master
- Available props are mentioned in [data-formats](data-formats.md) 
```js
import { Provider, Master } from '@knovator/masters-admin`;

function App() {
    return (
        <Provider
            ...
        >
            <Master />
        </Provider>
    )
}
```
<p align="right">(<a href="#top">back to top</a>)</p>

### Master.Table
- Avails facility to show `Table` component for Master explicitly.
- Available props are mentioned in [data-formats](data-formats.md) 
```js
    <Master>
        <Master.Table />
    </Master>
```
<p align="right">(<a href="#top">back to top</a>)</p>

### Master.Pagination
- Avails facility to show `Pagination` component for Master explicitly.
```js
    <Master>
        <Master.Table />
        <Master.Pagination />
    </Master>
```
<p align="right">(<a href="#top">back to top</a>)</p>

### Master.Search
- Avails facility to show `Search` component for Master explicitly.
- Search records in master, as user starts typing
```js
    <Master>
        <Master.Search />
    </Master.Search>
```
<p align="right">(<a href="#top">back to top</a>)</p>

### Master.AddButton
- Avails facility to open `Form`, when clicked
```js
    <Master>
        <Master.AddButton />
    </Master.Search>
```
<p align="right">(<a href="#top">back to top</a>)</p>

### Master.Lister
- Avails facility to list `Master` records, to use together in sync with `SubMaster`
```js
    <Master>
        <Master.Lister />
    </Master>
``` 

**Props**
- `render({ row, onClick, masterCode }) => JSX` (*optional*) => function to render list items, provides following arguments while execution
    - `row` => Current record
    - `onClick` => Function to call when current item is selected/clicked
    - `masterCode` => string indicates record code currently selected
- `selectFirst` => boolean prop indicats to show submasters data for first master record
<p align="right">(<a href="#top">back to top</a>)</p>

### Master.FormWrapper
- Avails facility to access form parameters, to use when `explicitForm` is true for `Master`
```js
    <Master
        explicitForm={true}
    >
        <Master.FormWrapper>
            {({ formState, onClose, open }) => (
                ...
            )}
        </Master.FormWrapper>
    </Master>
```
- Possible form-states are mentioned in [data-formats](data-formats.md)
<p align="right">(<a href="#top">back to top</a>)</p>

### Master.FormActions
- Avails facility to show `FormActions`, to be used inside `FormWrapper` along with `Form`. Required to provide `formRef`.
```js
    const formRef = React.createRef();
    
    // return
    <Master
        explicitForm={true}
    >
        <Master.FormWrapper>
            {({ formState, onClose, open }) => (
                <>
                    <Master.Form ref={formRef} />
                    <Master.FormActions formRef={formRef} />
                </>
            )}
        </Master.FormWrapper>
    </Master>
``` 
<p align="right">(<a href="#top">back to top</a>)</p>

### Master.Form
- Avails facility to show `Form`, to be used inside `FormWrapper` along with `FormActions`. Required to provide `ref`.
```js
    const formRef = React.createRef();
    
    // return
    <Master
        explicitForm={true}
    >
        <Master.FormWrapper>
            {({ formState, onClose, open }) => (
                <>
                    <Master.Form ref={formRef} />
                    <Master.FormActions formRef={formRef} />
                </>
            )}
        </Master.FormWrapper>
    </Master>
```
<p align="right">(<a href="#top">back to top</a>)</p>