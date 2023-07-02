<h1 align="center">SkiNow - Aplicación Multiplataforma en Ionic 7</h1>

<p align="center">
  <img src="src/assets/images/skinow_redondo_sinletras.png" alt="Logo de SkiNow">
  <img src="src/assets/images/letras_skinowE_r.png" alt="Logo de SkiNow">
</p>

¡Bienvenido a SkiNow! Esta es una aplicación multiplataforma desarrollada en Ionic 7 para la gestion de una escuela de esquí.

A continuación, encontrarás instrucciones sobre cómo configurar y ejecutar la aplicación en diferentes plataformas, así como enlaces útiles para guías y recursos adicionales.

## Descargar APK para android
- [Instalar SkiNow.apk desde MEGA](https://mega.nz/folder/30oyGZjK#B0G6xJjqDAjG7KTQ3ut27g)

## Pasos de instalación

- [Instalar Node.js](https://nodejs.org)
- Instalar el CLI de Ionic en la consola de comandos (CMD):
```ssh
npm install -g @ionic/cli
```
- Para ejecutar el proyecto en modo prueva en tu navegador local:
```ssh
cd "nombre del proyecto"
ionic serve
```

### 1. Tutorial autenticación con Firebase

- [Tutorial - Autenticación con Firebase](https://devdactic.com/ionic-firebase-auth-upload)
- [Video Tutorial - Autenticación con Firebase](https://youtu.be/PD0a3ByLSH4)

### 2. Tutorial implementación de base de datos (Firebase)

- [Tutorial - Implementación de base de datos con Firebase](https://devdactic.com/ionic-firebase-angularfire-7)

### 3. Instalación

```sh
npm install
npm run build
npm install @capacitor/android
ionic capacitor copy android
npx cap sync
```
#### iOS

- Nota: Para la pruebas en iOS, se utilizó una interfaz debido a la falta de disponibilidad para realizar pruebas.

#### Android
- Ejecutar en dispositivo Android:

```sh 
ionic capacitor run android -l --external
```

## Contacto

Si tienes alguna pregunta, sugerencia o encuentras algún problema, no dudes en ponerte en contacto conmigo.

- Nombre: [Raúl Márquez Urbano]
- Correo electrónico: [raulmu785@gmail.com]

!Espero que disfrutes usando SkiNow!
