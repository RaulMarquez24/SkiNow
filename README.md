<h1 align="center">SkiNow · Aplicación multiplataforma en Ionic 7</h1>

<p align="center">
  <img src="src/assets/images/skinow_redondo_sinletras.png" alt="Logo de SkiNow">
  <img src="src/assets/images/letras_skinowE_r.png" alt="SkiNow">
</p>

> **Proyecto final del ciclo de Desarrollo de Aplicaciones Multiplataforma (2023).**
> Lo conservo como recuerdo de mis inicios: está archivado y ya no se mantiene.

SkiNow es una aplicación multiplataforma, desarrollada con Ionic 7 y Firebase, para gestionar una escuela de esquí.

## Descargar el APK para Android

- [SkiNow.apk en MEGA](https://mega.nz/folder/30oyGZjK#B0G6xJjqDAjG7KTQ3ut27g) (versión de 2023)

## Puesta en marcha

1. Instala [Node.js](https://nodejs.org) y el CLI de Ionic:

   ```bash
   npm install -g @ionic/cli
   ```

2. Instala las dependencias y arranca la app en el navegador:

   ```bash
   npm install
   ionic serve
   ```

### Android

Compila el proyecto y sincronízalo con Capacitor:

```bash
npm run build
npm install @capacitor/android
ionic capacitor copy android
npx cap sync
```

Para ejecutarlo en un dispositivo Android conectado:

```bash
ionic capacitor run android -l --external
```

### iOS

Al no disponer de un dispositivo iOS, las pruebas se hicieron con la interfaz de iOS en el navegador.

## Recursos que usé

- **Autenticación con Firebase:** [guía](https://devdactic.com/ionic-firebase-auth-upload) y [vídeo](https://youtu.be/PD0a3ByLSH4)
- **Base de datos con Firebase:** [guía](https://devdactic.com/ionic-firebase-angularfire-7)

## Contacto

Raúl Márquez Urbano · [me@raulmarquez.dev](mailto:me@raulmarquez.dev) · [raulmarquez.dev](https://raulmarquez.dev)
