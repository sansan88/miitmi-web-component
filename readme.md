![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# miitmi.ch

## Github Repository
```bash
git clone https://github.com/sansan88/miitmi-web-component.git
```

## Using meetmi in a framework

```bash
npm i miitmi-web-component
```

### Script Tag

- Put a script tag similar to this 
```bash 
<script src='https://unpkg.com/miitmi-web-component@1.2.1/dist/miitmi-web-component.js'></script> 
```
in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc.

### Node Modules
- Run ```bash npm install my-name --save ```
Put a script tag similar to this ```bash <script src='node_modules/miitmi-web-component/dist/miitmi-web-component.js'></script> ``` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc.


### In a stencil-app-starter app
- Run ```bash npm install my-name --save ```
- Add an import to the npm packages: ```bash import miitmit-web-component; ```
- Then you can use the element anywhere in your template, JSX, html etc.


### CSS Variables

```css
:root {
    --miitmi-btn-share-color-left: #EE2A24ff;
    --miitmi-btn-share-color-right: #F1592A;

    --miitmi-btn-video-color-left: #F1592A;
    --miitmi-btn-video-color-right: #EE2A24ff;
    
    --miitmi-btn-color: #FFFFFF;
    
    --miitmi-font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  ```

# Demo Website

```html
<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
  <title>miitmi web component</title>
  
  <script src='https://unpkg.com/miitmi-web-component@1.2.1/dist/miitmi-web-component.js'></script>
</head>
<body>

  <h2>Standalone Example</h2>
 
  <miitmi-web-component invite="EINLADEN" video="VIDEOCHAT STARTEN"></miitmi-web-component>

  <br><br>
  <h2><a href="https://www.screen-beer.ch/">Screen Beer | You'll never drink alone.</a></h2>
  <miitmi-web-component chatname="ScreenBeer-Saftladen" invite="Saftladen teilen" video="Los geht's"></miitmi-web-component>

</body>
</html>

```