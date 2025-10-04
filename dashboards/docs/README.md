# Dashboards - Sistema de Visualización y Análisis

## 📖 Descripción

El módulo de Dashboards del Orbix Framework proporciona herramientas poderosas para la visualización de datos, análisis empresarial y generación de reportes interactivos en tiempo real.

## 🎯 Características

### Visualización de Datos
- Gráficos interactivos (líneas, barras, circular, área)
- Mapas de calor y geográficos
- Tablas dinámicas con filtros
- Widgets personalizables
- Temas y estilos corporativos
- Responsive design

### Análisis en Tiempo Real
- Actualización automática de datos
- WebSocket para streaming de datos
- Indicadores KPI en vivo
- Alertas y notificaciones
- Histórico de datos

### Reportes y Analíticas
- Generación automática de reportes
- Exportación (PDF, Excel, CSV)
- Reportes programados
- Análisis predictivo
- Comparativas temporales

### Integración de Datos
- Múltiples fuentes de datos
- APIs REST y GraphQL
- Bases de datos SQL/NoSQL
- Archivos CSV, JSON, XML
- Servicios externos (Google Analytics, etc.)

## 🏗️ Arquitectura

```
dashboards/
├── src/
│   ├── components/     # Componentes de visualización
│   ├── widgets/        # Widgets personalizables
│   ├── layouts/        # Layouts de dashboards
│   ├── api/           # API de datos
│   ├── exporters/     # Exportadores de reportes
│   └── themes/        # Temas y estilos
├── templates/         # Plantillas de dashboards
├── docs/             # Documentación
└── examples/         # Ejemplos de uso
```

## 🚀 Uso Rápido

### Ejemplo 1: Dashboard Básico

```javascript
const { Dashboard } = require('orbix-framework');

// Crear dashboard
const dashboard = new Dashboard({
  title: 'Dashboard Ventas',
  layout: 'grid',
  refreshInterval: 5000 // actualizar cada 5 segundos
});

// Agregar widget de KPI
dashboard.addWidget({
  type: 'kpi',
  title: 'Ventas del Mes',
  dataSource: '/api/sales/monthly',
  format: 'currency',
  position: { x: 0, y: 0, w: 3, h: 2 }
});

// Agregar gráfico de líneas
dashboard.addWidget({
  type: 'line-chart',
  title: 'Tendencia de Ventas',
  dataSource: '/api/sales/trend',
  position: { x: 3, y: 0, w: 6, h: 4 }
});

// Renderizar dashboard
await dashboard.render('#dashboard-container');
```

### Ejemplo 2: Gráfico Interactivo

```javascript
const { Chart } = require('orbix-framework/dashboards');

// Crear gráfico de barras
const chart = new Chart({
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Ventas 2024',
      data: [65000, 72000, 68000, 85000, 91000],
      backgroundColor: '#4CAF50'
    }]
  },
  options: {
    responsive: true,
    animation: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    }
  }
});

// Renderizar
chart.render('#chart-container');
```

### Ejemplo 3: Dashboard con Datos en Tiempo Real

```python
from dashboards import RealtimeDashboard, StreamDataSource

# Crear dashboard en tiempo real
dashboard = RealtimeDashboard(
    title="Monitoreo de Servidores",
    theme="dark"
)

# Fuente de datos en streaming
data_source = StreamDataSource(
    url="ws://api.empresa.com/metrics",
    protocol="websocket"
)

# Widget de métricas
dashboard.add_widget(
    widget_type="gauge",
    title="CPU Usage",
    data_source=data_source,
    data_key="cpu_usage",
    min_value=0,
    max_value=100,
    thresholds=[
        {"value": 70, "color": "yellow"},
        {"value": 90, "color": "red"}
    ]
)

# Iniciar dashboard
dashboard.start()
```

### Ejemplo 4: Generación de Reportes

```javascript
const { ReportGenerator } = require('orbix-framework/dashboards');

// Configurar generador de reportes
const generator = new ReportGenerator({
  template: 'executive-report',
  locale: 'es-ES'
});

// Generar reporte
const report = await generator.generate({
  title: 'Reporte Mensual de Ventas',
  period: '2024-01',
  data: {
    sales: salesData,
    comparisons: comparisonData,
    charts: ['sales-trend', 'product-distribution']
  },
  format: 'pdf'
});

// Guardar o enviar
await report.save('/reports/sales-2024-01.pdf');
await report.sendEmail('director@empresa.com');
```

## 🔧 Configuración

### Configuración Básica

```yaml
# config/dashboards.yml
dashboards:
  theme: 'light'  # o 'dark'
  language: 'es'
  
  layout:
    type: 'grid'
    columns: 12
    row_height: 50
    
  refresh:
    enabled: true
    interval: 5000  # ms
    
  charts:
    library: 'chartjs'  # o 'd3', 'echarts', 'plotly'
    animations: true
    responsive: true
    
  export:
    formats: ['pdf', 'excel', 'csv', 'png']
    pdf_engine: 'puppeteer'
    
  realtime:
    enabled: true
    websocket_url: 'ws://localhost:3000'
    reconnect: true
```

### Configuración de Widgets

```javascript
// Configuración de widget personalizado
const widgetConfig = {
  kpi: {
    format: 'currency',
    locale: 'es-ES',
    comparison: true,
    sparkline: true
  },
  
  chart: {
    animations: true,
    legend: true,
    tooltip: true,
    zoom: true
  },
  
  table: {
    pagination: true,
    search: true,
    sort: true,
    export: true,
    pageSize: 25
  },
  
  map: {
    provider: 'mapbox',
    zoom: 10,
    markers: true,
    clustering: true
  }
};
```

## 📊 Tipos de Visualizaciones

### Gráficos Disponibles
| Tipo | Descripción | Uso |
|------|-------------|-----|
| Line | Gráfico de líneas | Tendencias temporales |
| Bar | Gráfico de barras | Comparaciones |
| Pie | Gráfico circular | Distribuciones |
| Area | Gráfico de área | Volúmenes acumulados |
| Scatter | Gráfico de dispersión | Correlaciones |
| Gauge | Medidor | Indicadores |
| Heatmap | Mapa de calor | Densidad de datos |
| Treemap | Mapa de árbol | Jerarquías |
| Funnel | Embudo | Procesos de conversión |
| Radar | Radar | Comparativas multidimensionales |

### Widgets Disponibles
- **KPI Cards** - Indicadores clave
- **Tablas** - Datos tabulares
- **Mapas** - Visualización geográfica
- **Calendarios** - Eventos temporales
- **Timelines** - Líneas de tiempo
- **Alertas** - Notificaciones
- **Métricas** - Contadores y estadísticas

## 🎨 Temas y Personalización

### Temas Predefinidos
```javascript
// Aplicar tema
dashboard.setTheme('corporate');

// Temas disponibles:
// - default: Tema estándar
// - dark: Modo oscuro
// - light: Modo claro
// - corporate: Corporativo profesional
// - minimal: Minimalista
// - colorful: Colorido vibrante
```

### Tema Personalizado
```javascript
const customTheme = {
  name: 'MiEmpresa',
  colors: {
    primary: '#2196F3',
    secondary: '#FFC107',
    success: '#4CAF50',
    danger: '#F44336',
    warning: '#FF9800',
    info: '#00BCD4'
  },
  fonts: {
    family: 'Roboto, sans-serif',
    size: {
      title: '24px',
      subtitle: '18px',
      body: '14px'
    }
  },
  spacing: {
    padding: '16px',
    margin: '8px'
  }
};

dashboard.applyTheme(customTheme);
```

## 📱 Responsive Design

```javascript
// Configurar breakpoints
dashboard.setResponsive({
  mobile: {
    maxWidth: 768,
    columns: 1,
    layout: 'stack'
  },
  tablet: {
    maxWidth: 1024,
    columns: 2,
    layout: 'grid'
  },
  desktop: {
    minWidth: 1025,
    columns: 12,
    layout: 'grid'
  }
});
```

## 🔌 Integración de Datos

### API REST
```javascript
dashboard.addDataSource({
  name: 'sales-api',
  type: 'rest',
  url: 'https://api.empresa.com/sales',
  headers: {
    'Authorization': 'Bearer ' + token
  },
  refresh: 30000 // 30 segundos
});
```

### Base de Datos
```python
from dashboards import DatabaseSource

# Conectar a base de datos
db_source = DatabaseSource(
    type="postgresql",
    host="localhost",
    database="empresa_db",
    user="admin",
    password="password"
)

# Query personalizado
data = db_source.query("""
    SELECT date, SUM(amount) as total
    FROM sales
    WHERE date >= NOW() - INTERVAL '30 days'
    GROUP BY date
    ORDER BY date
""")

dashboard.add_widget(
    widget_type="line-chart",
    data=data
)
```

## 📤 Exportación de Reportes

### PDF
```javascript
const pdf = await dashboard.exportToPDF({
  filename: 'reporte-ventas.pdf',
  orientation: 'landscape',
  format: 'A4',
  quality: 'high'
});
```

### Excel
```javascript
const excel = await dashboard.exportToExcel({
  filename: 'datos-ventas.xlsx',
  sheets: ['Ventas', 'Productos', 'Clientes'],
  includeCharts: true
});
```

### Imagen
```javascript
const image = await dashboard.exportToImage({
  filename: 'dashboard.png',
  width: 1920,
  height: 1080,
  format: 'png'
});
```

## 📅 Reportes Programados

```javascript
const { Scheduler } = require('orbix-framework/dashboards');

// Programar reporte diario
const scheduler = new Scheduler();

scheduler.schedule({
  name: 'Reporte Diario',
  cron: '0 8 * * *', // Todos los días a las 8:00
  dashboard: 'ventas-dashboard',
  format: 'pdf',
  recipients: ['gerencia@empresa.com']
});
```

## 🚀 Performance

### Optimizaciones
- Virtualización de listas largas
- Lazy loading de widgets
- Caché de datos
- Compresión de payloads
- CDN para assets estáticos
- Service Workers para offline

### Benchmarks
- Renderizado inicial: < 2s
- Actualización de widget: < 100ms
- Exportación PDF: < 5s
- 1000+ puntos en gráfico: 60 FPS

## 🎓 Ejemplos de Dashboards

### Dashboard Ejecutivo
- KPIs principales del negocio
- Gráficos de tendencias
- Comparativas con períodos anteriores
- Alertas de métricas críticas

### Dashboard de Ventas
- Ventas por período
- Top productos
- Rendimiento por vendedor
- Funnel de conversión

### Dashboard de Operaciones
- Estado de servidores
- Métricas de performance
- Logs en tiempo real
- Alertas de sistema

### Dashboard Financiero
- Estado de resultados
- Flujo de caja
- Balance general
- Proyecciones

## 🐛 Troubleshooting

### Dashboard no se actualiza
**Solución:** Verificar configuración de refresh y conexión WebSocket.

### Gráficos no se renderizan
**Solución:** Verificar que los datos tengan el formato correcto.

### Exportación falla
**Solución:** Verificar permisos de escritura y recursos disponibles.

## 📚 Referencias

- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [D3.js Gallery](https://observablehq.com/@d3/gallery)
- [Dashboard Design Best Practices](https://www.dashboarddesign.io/)

## 🤝 Contribuir

Para contribuir a Dashboards, consulta la [guía de contribución](../../CONTRIBUTING.md).

---

**Dashboards** - Visualización de Datos Empresariales 📊
