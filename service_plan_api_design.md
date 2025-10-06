# Diseño de la API para Planes de Servicio

El objetivo es reemplazar los datos hardcodeados de `hostingPlans` y `gamingPlans` en `src/pages/HostingPage.jsx` con datos obtenidos de la API `/api/service-plan`.

## 1. Estructura de la Respuesta de la API para `/api/service-plan`

La API `/api/service-plan` debe devolver una lista de planes de servicio. Cada plan debe contener la información necesaria para renderizar tanto los planes de hosting como los de gaming. Se propone la siguiente estructura para cada objeto de plan en la respuesta de la API:

```json
[
  {
    "id": "uuid-del-plan-1",
    "name": "Básico",
    "slug": "basico-hosting",
    "type": "hosting", // O "gaming"
    "price": "9.99", // Solo el valor numérico
    "currency": "$", // Símbolo de la moneda
    "period": "/mes",
    "description": "Perfecto para sitios web personales y pequeños proyectos",
    "popular": false,
    "features": [
      { "name": "10 GB SSD Storage", "included": true },
      { "name": "100 GB Bandwidth", "included": true }
    ],
    "specs": { // Opcional, solo para planes de gaming
      "ram": "2 GB RAM",
      "cpu": "2 CPU Cores",
      "storage": "20 GB SSD",
      "players": "10 Jugadores"
    }
  },
  {
    "id": "uuid-del-plan-2",
    "name": "Minecraft Básico",
    "slug": "minecraft-basico",
    "type": "gaming",
    "price": "12.99",
    "currency": "$",
    "period": "/mes",
    "description": "Perfecto para servidores pequeños con amigos",
    "popular": false,
    "features": [
      { "name": "Instalación 1-Click", "included": true },
      { "name": "Panel de Control Web", "included": true }
    ],
    "specs": {
      "ram": "2 GB RAM",
      "cpu": "2 CPU Cores",
      "storage": "20 GB SSD",
      "players": "10 Jugadores"
    }
  }
]
```

**Consideraciones:**
- `id`: Un identificador único para cada plan.
- `name`: Nombre del plan (ej. "Básico", "Profesional").
- `slug`: Un slug amigable para URL, útil para futuras páginas de detalle de planes.
- `type`: Un campo para distinguir entre planes de `hosting` y `gaming`.
- `price`: El valor numérico del precio. El símbolo de la moneda (`currency`) y el período (`period`) se manejan por separado para mayor flexibilidad.
- `description`: Descripción breve del plan.
- `popular`: Un booleano para indicar si el plan es popular (para destacar en la UI).
- `features`: Un array de objetos, donde cada objeto tiene `name` (nombre de la característica) e `included` (booleano que indica si está incluida).
- `specs`: Un objeto opcional que contendrá las especificaciones técnicas específicas para planes de gaming (RAM, CPU, Storage, Players). Este campo no estará presente para planes de hosting.

## 2. Organización de Archivos (Basado en `hosting-platform-frontend`)

Se seguirá la misma estructura utilizada previamente para los servicios de marketing:

### `src/services/servicePlanService.js`

- Función para realizar llamadas a la API relacionadas con los planes de servicio (ej. `getServicePlans`).

### `src/hooks/useServicePlans.js`

- Hook personalizado (`useQuery`) para consumir los planes de servicio utilizando `react-query`.

## 3. Integración en `HostingPage.jsx`

- Se importará y utilizará el `useServicePlans` hook.
- Se manejarán los estados de carga (`isLoading`), error (`isError`) y datos (`data`).
- Se filtrarán los datos obtenidos de la API en `hostingPlans` y `gamingPlans` basándose en el campo `type`.
- Se adaptará el renderizado de los planes para usar los datos dinámicos, incluyendo la lógica para `popular` y `specs`.
