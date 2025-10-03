/**
 * Ejemplo: Chatbot Inteligente con AeNKI
 * 
 * Este ejemplo muestra cómo crear un chatbot empresarial
 * que puede responder preguntas sobre productos y servicios.
 */

const { AeNKI } = require('orbix-framework');

// Configuración del chatbot
const chatbot = new AeNKI({
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 500
});

// Contexto empresarial
const context = `
Eres un asistente virtual de una empresa de tecnología llamada "TechCorp".
Productos principales:
- CloudSync Pro: Solución de almacenamiento en la nube
- DataAnalytics Suite: Plataforma de análisis de datos
- SecureAuth: Sistema de autenticación multi-factor

Horario de atención: Lunes a Viernes, 9:00 AM - 6:00 PM
Soporte técnico: soporte@techcorp.com
Ventas: ventas@techcorp.com
`;

// Configurar contexto
chatbot.setContext(context);

// Función para procesar mensajes
async function processMessage(userMessage) {
  console.log(`\nUsuario: ${userMessage}`);
  
  // Procesar con IA
  const response = await chatbot.chat(userMessage, {
    stream: false,
    includeContext: true
  });
  
  console.log(`Bot: ${response.message}`);
  
  // Análisis de sentimiento
  const sentiment = await chatbot.analyzeSentiment(userMessage);
  console.log(`Sentimiento detectado: ${sentiment.label} (${sentiment.score.toFixed(2)})`);
  
  return response;
}

// Ejemplo de conversación
async function main() {
  console.log('=== Chatbot Empresarial con AeNKI ===\n');
  
  // Mensaje de bienvenida
  const welcome = await chatbot.generateWelcomeMessage();
  console.log(`Bot: ${welcome}`);
  
  // Preguntas de ejemplo
  const questions = [
    '¿Cuáles son sus productos principales?',
    '¿Cuánto cuesta CloudSync Pro?',
    'Necesito ayuda con mi cuenta',
    '¿Tienen soporte técnico?'
  ];
  
  for (const question of questions) {
    await processMessage(question);
    // Esperar un momento entre mensajes
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Obtener historial de conversación
  const history = chatbot.getConversationHistory();
  console.log(`\n=== Historial (${history.length} mensajes) ===`);
}

// Ejecutar ejemplo
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { processMessage, chatbot };
