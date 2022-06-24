<div id="top"></div>

## SubMaster
Avails facility to `list`/`create`/`update`/`delete` records for submaster
- Available props are mentioned in [data-formats](data-formats.md) 
```js
import { Provider, SubMaster } from '@knovator/masters-admin`;

function App() {
    return (
        <Provider
            ...
        >
            <SubMaster />
        </Provider>
    )
}
```
<p align="right">(<a href="#top">back to top</a>)</p>

### SubMaster.Table
- Avails facility to show `Table` component for Master explicitly.
- Available props are mentioned in [data-formats](data-formats.md) 
```js
    <SubMaster>
        <SubMaster.Table />
    </SubMaster>
```
<p align="right">(<a href="#top">back to top</a>)</p>

### SubMaster.Pagination
- Avails facility to show `Pagination` component for Master explicitly.
```js
    <SubMaster>
        <SubMaster.Table />
        <SubMaster.Pagination />
    </SubMaster>
```
<p align="right">(<a href="#top">back to top</a>)</p>

### SubMaster.Search
- Avails facility to show `Search` component for Master explicitly.
- Search records in master, as user starts typing
```js
    <SubMaster>
        <SubMaster.Search />
    </SubMaster.Search>
```
<p align="right">(<a href="#top">back to top</a>)</p>

### SubMaster.AddButton
- Avails facility to open `Form`, when clicked
```js
    <SubMaster>
        <SubMaster.AddButton />
    </SubMaster.Search>
```
<p align="right">(<a href="#top">back to top</a>)</p>

### SubMaster.FormWrapper
- Avails facility to access form parameters, to use when `explicitForm` is true for `Master`
```js
    <Master
        explicitForm={true}
    >
        <SubMaster.FormWrapper>
            {({ formState, onClose, open }) => (
                ...
            )}
        </SubMaster.FormWrapper>
    </SubMaster>
```
- Possible form-states are mentioned in [data-formats](data-formats.md)
<p align="right">(<a href="#top">back to top</a>)</p>

### SubMaster.FormActions
- Avails facility to show `FormActions`, to be used inside `FormWrapper` along with `Form`. Required to provide `formRef`.
```js
    const formRef = React.createRef();
    
    // return
    <Master
        explicitForm={true}
    >
        <SubMaster.FormWrapper>
            {({ formState, onClose, open }) => (
                <>
                    <SubMaster.Form ref={formRef} />
                    <SubMaster.FormActions formRef={formRef} />
                </>
            )}
        </SubMaster.FormWrapper>
    </SubMaster>
``` 
<p align="right">(<a href="#top">back to top</a>)</p>

### SubMaster.Form
- Avails facility to show `Form`, to be used inside `FormWrapper` along with `FormActions`. Required to provide `ref`.
```js
    const formRef = React.createRef();
    
    // return
    <Master
        explicitForm={true}
    >
        <SubMaster.FormWrapper>
            {({ formState, onClose, open }) => (
                <>
                    <SubMaster.Form ref={formRef} />
                    <SubMaster.FormActions formRef={formRef} />
                </>
            )}
        </SubMaster.FormWrapper>
    </SubMaster>
```
<p align="right">(<a href="#top">back to top</a>)</p>