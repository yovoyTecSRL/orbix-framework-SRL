/**
 * Orbix Framework - Community Edition
 * Main Entry Point
 * 
 * Base abierta con AeNKI (IA), Sentinel (seguridad), 
 * dashboards y avatares para automatizar empresas.
 */

// Importar módulos principales
const AeNKI = require('./aenki/src/index.js');
const Sentinel = require('./sentinel/src/index.js');
const { Dashboard, Widget, Chart } = require('./dashboards/src/index.js');
const { Avatar, VoiceEngine, ChatEngine } = require('./avatars/src/index.js');

// Banner de bienvenida
function displayBanner() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     ██████╗ ██████╗ ██████╗ ██╗██╗  ██╗                     ║
║    ██╔═══██╗██╔══██╗██╔══██╗██║╚██╗██╔╝                     ║
║    ██║   ██║██████╔╝██████╔╝██║ ╚███╔╝                      ║
║    ██║   ██║██╔══██╗██╔══██╗██║ ██╔██╗                      ║
║    ╚██████╔╝██║  ██║██████╔╝██║██╔╝ ██╗                     ║
║     ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝                     ║
║                                                               ║
║            FRAMEWORK - COMMUNITY EDITION                      ║
║                                                               ║
║    🤖 AeNKI      - Inteligencia Artificial                   ║
║    🛡️  Sentinel  - Seguridad Empresarial                     ║
║    📊 Dashboards - Visualización de Datos                    ║
║    👤 Avatares   - Interacción Humana                        ║
║                                                               ║
║    Automatizando el futuro de las empresas                   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
}

// Información del framework
function displayInfo() {
  console.log('\n📦 Versión: 1.0.0');
  console.log('🏢 Organización: YovoyTec SRL');
  console.log('📝 Licencia: MIT');
  console.log('🌐 Repository: https://github.com/yovoyTecSRL/orbix-framework-SRL');
  console.log('\n');
}

// Ejemplo rápido de uso
async function quickDemo() {
  console.log('=== Demo Rápido de Orbix Framework ===\n');
  
  // 1. AeNKI - Inteligencia Artificial
  console.log('1️⃣  AeNKI - Inteligencia Artificial');
  console.log('─'.repeat(50));
  const ai = new AeNKI({ model: 'gpt-4' });
  const response = await ai.chat('¿Qué puede hacer Orbix Framework?');
  console.log(`Respuesta IA: ${response.message}\n`);
  
  // 2. Sentinel - Seguridad
  console.log('2️⃣  Sentinel - Seguridad');
  console.log('─'.repeat(50));
  const security = new Sentinel();
  security.defineRole('admin', ['users:read', 'users:write']);
  const hashedPassword = await security.hashPassword('Password123!');
  console.log(`Contraseña hasheada: ${hashedPassword.substring(0, 30)}...`);
  const token = security.generateToken({ userId: 1, role: 'admin' });
  console.log(`Token JWT generado: ${token.substring(0, 50)}...\n`);
  
  // 3. Dashboards - Visualización
  console.log('3️⃣  Dashboards - Visualización');
  console.log('─'.repeat(50));
  const dashboard = new Dashboard({
    title: 'Dashboard Empresarial',
    theme: 'corporate'
  });
  dashboard.addWidget(new Widget({
    type: 'kpi',
    title: 'Ventas del Mes',
    value: 125000
  }));
  console.log(`Dashboard "${dashboard.config.title}" creado con ${dashboard.widgets.length} widget(s)\n`);
  
  // 4. Avatares - Interacción
  console.log('4️⃣  Avatares - Interacción Humana');
  console.log('─'.repeat(50));
  const avatar = new Avatar({
    name: 'Ana',
    type: '3d',
    style: 'corporate'
  });
  await avatar.say('¡Hola! Soy Ana, tu asistente virtual.');
  console.log('');
}

// Mostrar ayuda
function displayHelp() {
  console.log('\n📚 Cómo usar Orbix Framework:\n');
  console.log('Importar módulos:');
  console.log('  const { AeNKI, Sentinel, Dashboard, Avatar } = require("orbix-framework");\n');
  console.log('Ejemplos:');
  console.log('  node aenki/examples/chatbot-example.js');
  console.log('  node sentinel/examples/auth-example.js');
  console.log('  node dashboards/examples/sales-dashboard.js');
  console.log('  node avatars/examples/virtual-assistant.js\n');
  console.log('Documentación:');
  console.log('  📖 AeNKI:      ./aenki/docs/README.md');
  console.log('  📖 Sentinel:   ./sentinel/docs/README.md');
  console.log('  📖 Dashboards: ./dashboards/docs/README.md');
  console.log('  📖 Avatares:   ./avatars/docs/README.md\n');
}

// Función principal
async function main() {
  // Mostrar banner
  displayBanner();
  displayInfo();
  
  // Verificar argumentos
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    displayHelp();
    return;
  }
  
  if (args.includes('--demo')) {
    await quickDemo();
    return;
  }
  
  // Por defecto, mostrar información y ayuda
  console.log('✨ Orbix Framework está listo para usar!\n');
  displayHelp();
  
  console.log('💡 Tip: Ejecuta "node index.js --demo" para ver una demostración rápida\n');
}

// Exportar módulos
module.exports = {
  AeNKI,
  Sentinel,
  Dashboard,
  Widget,
  Chart,
  Avatar,
  VoiceEngine,
  ChatEngine
};

// Ejecutar si es el archivo principal
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}
