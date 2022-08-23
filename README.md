# imagenes-del-mundo

Link: https://imagenes-del-mundo-may.netlify.app/ 

### Init config

To run this application you need some variables in your development or production environment.

for development add a .env file in your root path outside the src folder
for production in the configuration panel of your hosting

- You need an access key to use Unsplash. <a href="https://unsplash.com/developers" target="_blank"> Link </a>
- Get email and token from Alegra, these should be private, for the moment use them as variables, but to improve this we can add a login page. <a href="https://developer.alegra.com/docs/autenticacion" target="_blank">Link</a>

```bash
#.env
#Unsplash key
VUE_APP_ACCES_PUBLIC_KEY = ***********

#Alegra auth
VUE_APP_ALEGRA_EMAIL = *************
VUE_APP_ALEGRA_TOKEN = ***********
```


In the folder **constants** you can modify some variables to change funcionality like

- Start points
- Points to add
- Points needed to win
- Currency format, and location


Tools and technologies used

TypeScript 
Vuejs
Vuex
Axios
Tailwind
Netlify (hosting)


You can see this project deployed  <a href="https://imagenes-del-mundo-may.netlify.app/" target="_blank">here.</a> 





## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
