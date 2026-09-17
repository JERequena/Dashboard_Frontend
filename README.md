# FRONTEND-FE-SISEVE-DASHBOARD

Dashboard web de análisis y visualización de indicadores del Sistema de Información para la Vigilancia de la Violencia Escolar (SISEVE). La aplicación está desarrollada en Angular y presenta información consolidada en tarjetas KPI y gráficos estadísticos para facilitar la revisión de datos del panorama institucional.

## Descripción

Este proyecto implementa una vista de panorama con:

- Tarjetas de indicadores clave (KPI)
- Gráficos de evolución y distribución
- Layout de dashboard con navegación y cabecera
- Visualización responsiva para monitoreo institucional

La aplicación carga la vista principal desde la ruta inicial y organiza la lógica de presentación en componentes reutilizables.

## Tecnologías

- Angular 22
- TypeScript
- Chart.js
- Font Awesome
- SCSS

## Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

- Node.js 18 o superior
- npm 9 o superior

## Instalación

Clona el repositorio e instala las dependencias:

```bash
npm install
```

## Ejecución en desarrollo

Para iniciar el servidor local de desarrollo:

```bash
npm start
```

O de forma equivalente:

```bash
ng serve
```

Luego abre tu navegador en:

```text
http://localhost:4200/
```

La aplicación se recargará automáticamente al modificar archivos del proyecto.

## Construcción para producción

Para compilar la aplicación para producción:

```bash
npm run build
```

Los artefactos generados quedarán en la carpeta `dist/`.

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm test
```

## Estructura del proyecto

```text
src/
├── app/
│   ├── components/
│   │   ├── chart-card/
│   │   └── kpi-card/
│   ├── layout/
│   │   ├── header/
│   │   └── navigation/
│   ├── pages/
│   │   └── panorama/
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── styles.scss
└── main.ts
```

## Notas

- La vista principal se encuentra en la ruta inicial del proyecto.
- El dashboard utiliza gráficos configurados en TypeScript para representar indicadores de evolución, tipo de violencia, agresor, gestión institucional y atención.
- El proyecto está preparado para continuar desarrollándose como una interfaz de monitoreo y analítica.

## Recursos adicionales

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Documentation](https://angular.dev)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
