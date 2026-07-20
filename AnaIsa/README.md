# Invitación XV — Ana Isabela

Primera versión funcional para la ruta `/AnaIsa/`. Es HTML, CSS y JavaScript puro, compatible con la publicación actual mediante GitHub Pages. No se ha desplegado.

## Fotografías

Las cinco fotografías solicitadas se descargaron de la carpeta compartida y se generaron copias optimizadas para web. Los originales permanecen intactos fuera del repositorio. La portada usa `IM_7426.jpg` por su composición vertical, fondo luminoso y buen espacio para texto.

Las copias de `900` y `1800`/`1400` píxeles están en `assets/images/`. Para sustituir una imagen, conserva los nombres de archivo resultantes o actualiza los `src`/`srcset` en `index.html`.

## Música pendiente

No se incluyó música comercial. Cuando exista una pista autorizada, copiarla como:

`assets/audio/track.mp3`

El control sólo intenta reproducir después de una interacción. Si el archivo no existe, la invitación funciona normalmente y el control informa que la pista está pendiente.

## Personalización futura

`guest.js` lee `?i=TOKEN_UNICO` y deja desacoplada la resolución del invitado. El futuro proveedor debe devolver:

```js
{ token, nombreVisible, lugaresAsignados, activo }
```

No hay Excel, tokens ni nombres publicados en esta versión. `applyGuest()` ya muestra el nombre, los lugares y personaliza el mensaje de WhatsApp cuando recibe un registro activo.

## Publicación

La publicación actual ocurre al incorporar cambios a la rama `main` del repositorio de GitHub Pages. Esta carpeta debe permanecer en la raíz para quedar disponible en `https://juancarlosnieves.mx/AnaIsa/`. No subir ni fusionar sin autorización expresa.
