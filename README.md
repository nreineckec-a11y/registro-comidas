# Registro de comidas

App web instalable (PWA) para seguir una pauta nutricional de 90 días: marcar las 5 comidas, anotar lo que se comió fuera de la pauta (a mano o calculado por Claude desde texto o foto), bebidas, salidas de la semana, peso, % de grasa, pasos y entrenamiento, con una vista de progreso.

Un solo archivo (`index.html`), sin servidor, sin cuentas y sin analítica.

## Instalar en el teléfono

1. Abre la página publicada en GitHub Pages (`https://nreineckec-a11y.github.io/registro-comidas/`).
2. iPhone (Safari): Compartir → **Agregar a pantalla de inicio**. Android (Chrome): menú ⋮ → **Instalar app**.
3. Funciona sin conexión; solo el cálculo con Claude necesita internet.

## Datos

- Todo se guarda en el almacenamiento de la app en el teléfono (`localStorage`). No se sube a ningún servidor ni a este repositorio.
- **Personalizar → Respaldo → Exportar** genera un `.json`; **Importar** lo carga (en otro teléfono, o tras borrar la app). Borrar la app de la pantalla de inicio o los datos de Safari borra los registros: exporta antes.

## Claude

- Para «Escribe o fotografía lo que comiste» y «¿No sabes cómo contar algo?» se necesita una clave de API de Anthropic (console.anthropic.com → API keys), que se pega en **Personalizar → Claude**.
- La clave queda solo en el teléfono y no entra en los respaldos. Las consultas van directo a `api.anthropic.com` (pago por uso en esa cuenta); la política de seguridad de la página no permite conectarse a ningún otro servidor.
- Modelo por omisión: Claude Opus 5.5 con esfuerzo bajo; se puede cambiar a Sonnet 5.5 o Haiku 5.5.

## Publicar cambios

GitHub Pages sirve la rama `main` desde la raíz. Al cambiar archivos, sube el número de `CACHE` en `sw.js` para que los teléfonos descarguen la versión nueva.
