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

## Agregar proyectos

En `index.html`, busca:

```html
<ol class="projects-grid reveal" data-projects>
```

Duplica uno de los bloques:

```html
<li class="project-item">
  <span class="project-number">05</span>
  <div>
    <p class="project-tag">Categoría</p>
    <h3>Título del proyecto</h3>
    <p>Descripción breve del proyecto.</p>
  </div>
  <span class="project-state">Próximamente</span>
</li>
```

Cuando exista un caso completo, puedes reemplazar `Próximamente` por un enlace simple.

## Ajustes visuales

Los colores principales están en `styles.css`, dentro de `:root`. El color de acento actual es:

```css
--accent: #113d46;
```

El sitio respeta `prefers-reduced-motion`, tiene navegación por teclado, enlaces externos seguros y año automático en el footer.
