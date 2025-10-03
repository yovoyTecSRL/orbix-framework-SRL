/**
 * Ejemplo: Dashboard de Ventas Interactivo
 * 
 * Este ejemplo muestra cómo crear un dashboard completo
 * con múltiples widgets y visualizaciones.
 */

const { Dashboard, Widget } = require('orbix-framework/dashboards');

// Datos de ejemplo
const salesData = {
  monthly: [
    { month: 'Enero', sales: 65000, target: 60000 },
    { month: 'Febrero', sales: 72000, target: 65000 },
    { month: 'Marzo', sales: 68000, target: 70000 },
    { month: 'Abril', sales: 85000, target: 75000 },
    { month: 'Mayo', sales: 91000, target: 80000 },
    { month: 'Junio', sales: 88000, target: 85000 }
  ],
  byProduct: [
    { product: 'CloudSync Pro', sales: 125000 },
    { product: 'DataAnalytics Suite', sales: 98000 },
    { product: 'SecureAuth', sales: 76000 },
    { product: 'DevOps Tools', sales: 54000 },
    { product: 'Mobile SDK', sales: 32000 }
  ],
  bySeller: [
    { name: 'Juan García', sales: 145000, quota: 90 },
    { name: 'María López', sales: 132000, quota: 85 },
    { name: 'Carlos Ruiz', sales: 118000, quota: 80 },
    { name: 'Ana Martínez', sales: 90000, quota: 75 }
  ]
};

// Crear dashboard
async function createSalesDashboard() {
  console.log('=== Creando Dashboard de Ventas ===\n');
  
  const dashboard = new Dashboard({
    id: 'sales-dashboard',
    title: 'Dashboard de Ventas 2024',
    description: 'Métricas de ventas en tiempo real',
    layout: 'grid',
    theme: 'corporate',
    refreshInterval: 30000, // 30 segundos
    responsive: true
  });
  
  // ===== KPIs Principales =====
  
  // Total de ventas
  dashboard.addWidget(new Widget({
    type: 'kpi',
    id: 'total-sales',
    title: 'Ventas Totales',
    value: 385000,
    format: 'currency',
    currency: 'USD',
    comparison: {
      previous: 340000,
      label: 'vs. mes anterior'
    },
    position: { x: 0, y: 0, w: 3, h: 2 },
    color: '#4CAF50'
  }));
  
  // Tasa de conversión
  dashboard.addWidget(new Widget({
    type: 'kpi',
    id: 'conversion-rate',
    title: 'Tasa de Conversión',
    value: 24.5,
    format: 'percentage',
    comparison: {
      previous: 22.1,
      label: 'vs. mes anterior'
    },
    position: { x: 3, y: 0, w: 3, h: 2 },
    color: '#2196F3'
  }));
  
  // Nuevos clientes
  dashboard.addWidget(new Widget({
    type: 'kpi',
    id: 'new-customers',
    title: 'Nuevos Clientes',
    value: 156,
    format: 'number',
    comparison: {
      previous: 142,
      label: 'vs. mes anterior'
    },
    position: { x: 6, y: 0, w: 3, h: 2 },
    color: '#FF9800'
  }));
  
  // Ticket promedio
  dashboard.addWidget(new Widget({
    type: 'kpi',
    id: 'avg-ticket',
    title: 'Ticket Promedio',
    value: 2468,
    format: 'currency',
    currency: 'USD',
    position: { x: 9, y: 0, w: 3, h: 2 },
    color: '#9C27B0'
  }));
  
  // ===== Gráficos =====
  
  // Tendencia mensual
  dashboard.addWidget(new Widget({
    type: 'line-chart',
    id: 'monthly-trend',
    title: 'Tendencia de Ventas Mensual',
    data: {
      labels: salesData.monthly.map(d => d.month),
      datasets: [
        {
          label: 'Ventas',
          data: salesData.monthly.map(d => d.sales),
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4
        },
        {
          label: 'Objetivo',
          data: salesData.monthly.map(d => d.target),
          borderColor: '#FF5722',
          borderDash: [5, 5],
          tension: 0.4
        }
      ]
    },
    position: { x: 0, y: 2, w: 8, h: 4 },
    options: {
      animations: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
      }
    }
  }));
  
  // Ventas por producto
  dashboard.addWidget(new Widget({
    type: 'bar-chart',
    id: 'sales-by-product',
    title: 'Ventas por Producto',
    data: {
      labels: salesData.byProduct.map(d => d.product),
      datasets: [{
        label: 'Ventas',
        data: salesData.byProduct.map(d => d.sales),
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FF9800',
          '#9C27B0',
          '#F44336'
        ]
      }]
    },
    position: { x: 8, y: 2, w: 4, h: 4 },
    options: {
      indexAxis: 'y',
      responsive: true
    }
  }));
  
  // Top vendedores
  dashboard.addWidget(new Widget({
    type: 'table',
    id: 'top-sellers',
    title: 'Top Vendedores',
    columns: [
      { key: 'name', label: 'Vendedor', sortable: true },
      { key: 'sales', label: 'Ventas', format: 'currency', sortable: true },
      { key: 'quota', label: 'Cuota (%)', format: 'percentage', sortable: true }
    ],
    data: salesData.bySeller,
    position: { x: 0, y: 6, w: 6, h: 3 },
    options: {
      pagination: false,
      sortable: true,
      highlight: { key: 'quota', condition: '>=', value: 85, color: '#4CAF50' }
    }
  }));
  
  // Distribución de ventas (pie chart)
  dashboard.addWidget(new Widget({
    type: 'pie-chart',
    id: 'sales-distribution',
    title: 'Distribución por Producto',
    data: {
      labels: salesData.byProduct.map(d => d.product),
      datasets: [{
        data: salesData.byProduct.map(d => d.sales),
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FF9800',
          '#9C27B0',
          '#F44336'
        ]
      }]
    },
    position: { x: 6, y: 6, w: 6, h: 3 }
  }));
  
  console.log('✓ Dashboard creado con', dashboard.widgets.length, 'widgets');
  
  return dashboard;
}

// Ejemplo de actualización en tiempo real
async function simulateRealtimeUpdates(dashboard) {
  console.log('\n=== Simulando Actualizaciones en Tiempo Real ===');
  
  setInterval(() => {
    // Actualizar KPI de ventas totales
    const currentSales = 385000 + Math.floor(Math.random() * 10000);
    dashboard.updateWidget('total-sales', {
      value: currentSales
    });
    
    console.log(`Ventas actualizadas: $${currentSales.toLocaleString()}`);
  }, 5000);
}

// Ejemplo de exportación
async function exportDashboard(dashboard) {
  console.log('\n=== Exportando Dashboard ===');
  
  // Exportar a PDF
  const pdf = await dashboard.export({
    format: 'pdf',
    filename: 'ventas-report.pdf',
    orientation: 'landscape'
  });
  console.log('✓ PDF exportado:', pdf.path);
  
  // Exportar a Excel
  const excel = await dashboard.export({
    format: 'excel',
    filename: 'ventas-data.xlsx',
    includeCharts: true
  });
  console.log('✓ Excel exportado:', excel.path);
  
  // Exportar a imagen
  const image = await dashboard.export({
    format: 'png',
    filename: 'dashboard-snapshot.png',
    width: 1920,
    height: 1080
  });
  console.log('✓ Imagen exportada:', image.path);
}

// Ejemplo de alertas
function setupAlerts(dashboard) {
  console.log('\n=== Configurando Alertas ===');
  
  // Alerta si ventas caen por debajo del objetivo
  dashboard.addAlert({
    name: 'Ventas Bajo Objetivo',
    widget: 'monthly-trend',
    condition: (data) => {
      const lastMonth = data[data.length - 1];
      return lastMonth.sales < lastMonth.target;
    },
    action: (data) => {
      console.log('🚨 ALERTA: Las ventas están por debajo del objetivo!');
      // Enviar email, notificación, etc.
    }
  });
  
  // Alerta de alto rendimiento
  dashboard.addAlert({
    name: 'Meta Alcanzada',
    widget: 'total-sales',
    condition: (value) => value > 400000,
    action: () => {
      console.log('🎉 ¡Meta de $400,000 alcanzada!');
    }
  });
  
  console.log('✓ Alertas configuradas');
}

// Ejecutar ejemplo
async function main() {
  try {
    // Crear dashboard
    const dashboard = await createSalesDashboard();
    
    // Configurar alertas
    setupAlerts(dashboard);
    
    // Renderizar (en navegador esto mostraría el dashboard)
    console.log('\n=== Renderizando Dashboard ===');
    console.log('Dashboard renderizado en:', dashboard.renderUrl);
    
    // Exportar
    // await exportDashboard(dashboard);
    
    // Simular actualizaciones en tiempo real
    // simulateRealtimeUpdates(dashboard);
    
    console.log('\n✓ Dashboard de Ventas listo');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Ejecutar
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  createSalesDashboard,
  simulateRealtimeUpdates,
  exportDashboard
};
