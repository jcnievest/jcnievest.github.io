# Juan Carlos Nieves | Sitio personal

Sitio estático para GitHub Pages construido con HTML, CSS y JavaScript puro.

## Publicación

Coloca estos archivos en la raíz de la rama `main` del repositorio de GitHub Pages:

- `index.html`
- `styles.css`
- `script.js`
- `favicon.svg`
- `CNAME`
- `README.md`

El archivo `CNAME` ya contiene el dominio final:

```txt
juancarlosnieves.mx
```

## Editar textos

La mayor parte del contenido está en `index.html`, organizado por secciones:

- `#inicio`
- `#perfil`
- `#experiencia`
- `#proyectos`
- `#contacto`

Puedes cambiar títulos, párrafos y enlaces directamente en el HTML sin tocar el CSS.

## Cambiar la fotografía

En `index.html`, busca el bloque `.portrait-placeholder` dentro del hero. Ahí hay un comentario con los pasos:

1. Optimiza la fotografía y guárdala junto a los archivos del sitio, por ejemplo como `portrait.jpg`.
2. Reemplaza el contenido de `.portrait-placeholder` por:

```html
<img src="portrait.jpg" alt="Juan Carlos Nieves Torres" />
```

El CSS ya incluye las reglas para que la imagen cubra el contenedor de forma elegante.

## Agregar proyectos

En `index.html`, busca:

```html
<div class="projects-grid reveal" data-projects>
```

Duplica uno de los bloques:

```html
<article class="project-item">
  <p class="project-tag">Etiqueta</p>
  <h3>Título del proyecto</h3>
  <p>Descripción breve del proyecto.</p>
  <a class="project-link" href="https://ejemplo.com">Ver proyecto</a>
</article>
```

Si un proyecto todavía no tiene enlace, deja `href="#"`; `script.js` evita que ese enlace navegue.

## Ajustes visuales

Los colores principales están en `styles.css`, dentro de `:root`. El color de acento actual es:

```css
--accent: #0d4b5a;
```

El sitio respeta `prefers-reduced-motion`, tiene navegación por teclado, enlaces externos seguros y año automático en el footer.
