# TuMatch — Propuesta Comercial

Landing comercial estática para vender la **Membresía TuMatch** (corredor asociado) y el **CRM TuMatch** (SaaS para inmobiliarias).

## Estructura

```
/                 → Hub + comparativa de mercado
/membresia/       → Landing de venta de la membresía (5 niveles de carrera)
/crm/             → Landing de venta del CRM ($50k / $190k / $350k)
styles.css        → Tokens de marca TuMatch compartidos
app.js            → Countdown + renderizado de rings de %
```

## Stack

HTML + CSS + JS puro. Sin build step. Se despliega instantáneo en Vercel como sitio estático.

## Datos duros

- TuMatch CRM: **88,08%** de cobertura sobre 43 funcionalidades críticas del mercado
- TuMatch Membresía: **86,05%** de cobertura
- Mejor competidor (KiteProp): **40,91%**
- WASI (49.828 usuarios): **34,09%**

Fuente: análisis interno de mercado, abril 2026 (ver PDF `Análisis de Mercado - Comparables CRM`).

## Precios de lanzamiento del CRM

| Plan      | Precio      | Válido hasta  |
|-----------|-------------|---------------|
| 1 mes     | $50.000 CLP | 30 abr 2026   |
| 6 meses   | $190.000 CLP| 30 abr 2026   |
| 12 meses  | $350.000 CLP| 30 abr 2026   |

Descuentos pre-lanzamiento hasta 30 mayo 2026.

## Contacto

WhatsApp oficial TuMatch: **+56 9 3410 7448**

## Deploy

```bash
# Opción A: Vercel Dashboard
# Importa este repo en https://vercel.com/new → deploy automático.

# Opción B: Vercel CLI
vercel deploy --prod
```
