# Backend RSVP de Ana Isa

Backend previsto para Cloudflare Workers + D1.

## Recursos

- Worker: `ana-isa-rsvp`
- Base D1: `ana-isa-rsvp`
- Dominio previsto: `rsvp.juancarlosnieves.mx`
- Secreto requerido: `ADMIN_TOKEN`

## Despliegue

1. Crear la base D1 y reemplazar `REPLACE_WITH_D1_DATABASE_ID` en `wrangler.toml`.
2. Ejecutar `schema.sql` sobre la base remota.
3. Configurar `ADMIN_TOKEN` como secreto del Worker.
4. Desplegar el Worker.
5. Asociar el dominio personalizado `rsvp.juancarlosnieves.mx`.

