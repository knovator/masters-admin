<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/knovator/masters-admin">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">@knovator/masters-admin</h3>

  <p align="center">
    ReactJS package to integrate masters/submasters functionality to ReactJS/NextJS application.
    <br />
    <a href="https://github.com/knovator/masters-admin"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/knovator/masters-admin">View Demo</a>
    ·
    <a href="https://github.com/knovator/masters-admin/issues">Report Bug</a>
    ·
    <a href="https://github.com/knovator/masters-admin/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#master">Master</a></li>
    <li><a href="#submaster">SubMaster</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

`@knovator/masters-admin` is built with intent to faster web app development cycle by providing plug & play facility for masters/submasters, that is used almost on every project.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [React.js](https://reactjs.org/)
* [Rollup](https://rollupjs.org)
* [classnames](https://www.npmjs.com/package/classnames)
* [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)
* [react-dropzone](https://www.npmjs.com/package/react-dropzone)
* [react-hook-form](https://www.npmjs.com/package/react-hook-form)
* [react-table](https://www.npmjs.com/package/react-table)
* [react-transition-group](https://www.npmjs.com/package/react-transition-group)
* [typescript](https://www.typescriptlang.org)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

`@knovator/masters-admin` is designed to be used in ReactJS/NextJS project.

### Prerequisites

Following packages are required to exists/installed to use `@knovator/masters-admin` in the project.
- [@knovator/api](https://www.npmjs.com/package/@knovator/api)
- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [react-table](https://www.npmjs.com/package/react-table)

### Installation

   ```sh
   npm install @knovator/masters-admin
   # or
   yarn add @knovator/masters-admin
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Provider
`@knovator/masters-admin` uses **Context API**, to support communication between components. So, `Masters`/`Submaster` should be wraped by `Provider`.
```js
import { Provider } from '@knovator/masters-admin`;

function App() {
    return (
        <Provider
            ...
        >
            ...
        </Provider>
    )
}
```

**Props**
- `token`
    - JWT token to be sent along the requests
- `baseUrl`
    - Base API url, without forward slash at end i.e. `https://api.xy000z.in`
- `dataGetter` (*optional*)
    - function to get docs from axios API response
    ```js
    // default
    (response) => response.data.docs
    ```
- `paginationGetter` (*optional*)
    - function to get pagination data from axios API response
    ```js
    // default
    (response) => response.data
    ```
- `onError(callback_code, code, message)` (*optional*)
    - callback to execute on error
- `onSuccess(callback_code, code, message)` (*optional*)
    - callback to execute on success
- `onLogout` (*optional*)
    - callback to execute on API request with `unauthorized` code in body

### Master
Please check in [masters.md](masters.md)

### SubMaster
Plase check in [submasters.md](submasters.md)


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Knovator Technologies
- Twitter [@knovator](https://twitter.com/knovator)
- Web [https://knovator.com/](https://knovator.com/)

Project Link: [https://github.com/knovator/masters-admin](https://github.com/knovator/masters-admin)

<p align="right">(<a href="#top">back to top</a>)</p>
