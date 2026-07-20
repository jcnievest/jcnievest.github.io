# Invitación XV — Ana Isabela

Invitación editorial para la ruta `/AnaIsa/`. Es HTML, CSS y JavaScript puro, compatible con la publicación actual mediante GitHub Pages.

## Fotografías

Las fotografías solicitadas se descargaron de la carpeta compartida y se generaron copias optimizadas para web. Los originales permanecen intactos fuera del repositorio. La portada usa `IM_7380.jpg`.

Las copias de `900` y `1800`/`1400` píxeles están en `assets/images/`. Para sustituir una imagen, conserva los nombres de archivo resultantes o actualiza los `src`/`srcset` en `index.html`.

## Música

La sección musical integra el reproductor oficial de Apple Music y conserva un enlace alternativo a “La Bella y la Bestia”. No se descarga ni aloja audio comercial.

## Personalización futura

`guest.js` lee `?i=TOKEN_UNICO` y deja desacoplada la resolución del invitado. El futuro proveedor debe devolver:

```js
{ token, nombreVisible, lugaresAsignados, activo }
```

No hay Excel, tokens ni nombres publicados en esta versión. `applyGuest()` ya muestra el nombre, los lugares y personaliza el mensaje de WhatsApp cuando recibe un registro activo.

## Publicación

La publicación actual ocurre al incorporar cambios a la rama `main` del repositorio de GitHub Pages. Esta carpeta debe permanecer en la raíz para quedar disponible en `https://juancarlosnieves.mx/AnaIsa/`. No subir ni fusionar sin autorización expresa.
