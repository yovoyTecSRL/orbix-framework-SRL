/**
 * Ejemplo: Asistente Virtual con Avatar
 * 
 * Este ejemplo muestra cómo crear un asistente virtual completo
 * con avatar 3D, voz y capacidades conversacionales.
 */

const { Avatar, VoiceEngine, ChatEngine } = require('orbix-framework/avatars');

// Configuración del asistente
const assistantConfig = {
  name: 'Sophia',
  type: '3d',
  model: 'avatar-female-professional',
  appearance: {
    style: 'corporate',
    outfit: 'business-suit',
    hairColor: 'brown',
    eyeColor: 'blue'
  },
  personality: {
    traits: ['professional', 'friendly', 'helpful', 'patient'],
    tone: 'formal',
    empathy: 0.85,
    enthusiasm: 0.7
  },
  language: 'es-ES'
};

// Crear asistente virtual
async function createVirtualAssistant() {
  console.log('=== Creando Asistente Virtual ===\n');
  
  // Inicializar avatar
  const avatar = new Avatar(assistantConfig);
  
  // Configurar voz
  const voice = new VoiceEngine({
    provider: 'google',
    language: 'es-ES',
    voiceId: 'es-ES-Standard-A',
    speed: 1.0,
    pitch: 0
  });
  
  avatar.attachVoice(voice);
  
  // Configurar motor conversacional
  const chat = new ChatEngine({
    avatar: avatar,
    aiEnabled: true,
    contextWindow: 10,
    memory: true,
    sentiment: true
  });
  
  // Configurar contexto empresarial
  chat.setContext(`
    Eres Sophia, asistente virtual de TechCorp.
    Tu función es ayudar a los clientes con:
    - Información sobre productos y servicios
    - Soporte técnico básico
    - Programación de demostraciones
    - Preguntas frecuentes
    
    Mantén un tono profesional pero amigable.
    Si no sabes algo, ofrece derivar a un agente humano.
  `);
  
  console.log('✓ Asistente Sophia creado');
  
  return { avatar, voice, chat };
}

// Ejemplo de interacción por texto
async function textInteraction(chat, avatar) {
  console.log('\n=== Interacción por Texto ===\n');
  
  const messages = [
    'Hola, necesito ayuda',
    '¿Qué productos ofrecen?',
    '¿Cuánto cuesta CloudSync Pro?',
    'Me interesa programar una demo'
  ];
  
  for (const message of messages) {
    console.log(`\nUsuario: ${message}`);
    
    // Procesar mensaje
    const response = await chat.process(message);
    
    // Avatar responde
    console.log(`Sophia: ${response.text}`);
    
    // Mostrar emoción detectada
    console.log(`[Emoción: ${response.emotion}]`);
    
    // Avatar hace gesto
    if (response.gesture) {
      await avatar.animate(response.gesture);
      console.log(`[Gesto: ${response.gesture}]`);
    }
    
    // Análisis de sentimiento del usuario
    if (response.userSentiment) {
      console.log(`[Sentimiento usuario: ${response.userSentiment.label}]`);
    }
  }
}

// Ejemplo de interacción por voz
async function voiceInteraction(avatar, voice, chat) {
  console.log('\n=== Interacción por Voz ===\n');
  
  // Activar reconocimiento de voz
  voice.enableSTT({
    language: 'es-ES',
    continuous: true,
    interimResults: true
  });
  
  // Escuchar al usuario
  voice.onSpeechDetected(async (transcript, confidence) => {
    console.log(`\nUsuario (voz): ${transcript}`);
    console.log(`Confianza: ${(confidence * 100).toFixed(1)}%`);
    
    // Procesar con IA
    const response = await chat.process(transcript);
    
    // Avatar habla la respuesta
    await avatar.speak(response.text, {
      emotion: response.emotion,
      lipSync: true
    });
    
    console.log(`Sophia: ${response.text}`);
  });
  
  console.log('🎤 Escuchando... (presiona Ctrl+C para detener)');
  
  // Simular algunas interacciones de voz
  setTimeout(() => {
    console.log('\nSimulando: "Hola Sophia"');
    voice.simulateInput('Hola Sophia', 0.95);
  }, 1000);
  
  setTimeout(() => {
    console.log('\nSimulando: "¿Tienen soporte técnico?"');
    voice.simulateInput('¿Tienen soporte técnico?', 0.92);
  }, 3000);
}

// Ejemplo de animaciones y gestos
async function demonstrateAnimations(avatar) {
  console.log('\n=== Demostrando Animaciones ===\n');
  
  const animations = [
    { name: 'greeting', description: 'Saludo con la mano' },
    { name: 'thinking', description: 'Gesto pensativo' },
    { name: 'explaining', description: 'Explicando con gestos' },
    { name: 'nodding', description: 'Asintiendo' },
    { name: 'pointing', description: 'Señalando' }
  ];
  
  for (const anim of animations) {
    console.log(`Animación: ${anim.description}`);
    await avatar.animate(anim.name, {
      duration: 2000,
      loop: false
    });
    
    // Esperar a que termine la animación
    await new Promise(resolve => setTimeout(resolve, 2500));
  }
  
  console.log('✓ Demostraciones completadas');
}

// Ejemplo de personalización visual
async function customizeAvatar(avatar) {
  console.log('\n=== Personalizando Avatar ===\n');
  
  // Cambiar vestimenta
  await avatar.setAppearance({
    outfit: 'casual',
    hairColor: 'blonde'
  });
  console.log('✓ Vestimenta actualizada: casual');
  
  // Aplicar branding corporativo
  await avatar.applyBranding({
    colors: {
      primary: '#2196F3',
      secondary: '#FFC107'
    },
    logo: '/assets/company-logo.png',
    background: 'office-environment'
  });
  console.log('✓ Branding corporativo aplicado');
  
  // Cambiar expresión facial
  await avatar.setExpression('friendly-smile');
  console.log('✓ Expresión: sonrisa amigable');
}

// Ejemplo de integración multicanal
async function multichanelIntegration(avatar) {
  console.log('\n=== Integración Multicanal ===\n');
  
  // Configurar canales
  const channels = {
    web: {
      enabled: true,
      position: 'bottom-right',
      size: 'medium'
    },
    whatsapp: {
      enabled: true,
      phoneNumber: '+1234567890'
    },
    telegram: {
      enabled: true,
      botToken: 'YOUR_BOT_TOKEN'
    }
  };
  
  for (const [channel, config] of Object.entries(channels)) {
    if (config.enabled) {
      await avatar.enableChannel(channel, config);
      console.log(`✓ Canal habilitado: ${channel}`);
    }
  }
}

// Ejemplo de métricas y analytics
async function trackMetrics(avatar, chat) {
  console.log('\n=== Métricas del Asistente ===\n');
  
  // Obtener estadísticas
  const stats = await chat.getStatistics({
    period: 'today'
  });
  
  console.log('Conversaciones iniciadas:', stats.conversationsStarted);
  console.log('Mensajes procesados:', stats.messagesProcessed);
  console.log('Tiempo promedio de respuesta:', stats.avgResponseTime + 'ms');
  console.log('Satisfacción del usuario:', stats.satisfaction + '%');
  console.log('Tasa de resolución:', stats.resolutionRate + '%');
  
  // Obtener temas más consultados
  const topTopics = await chat.getTopTopics({ limit: 5 });
  console.log('\nTemas más consultados:');
  topTopics.forEach((topic, index) => {
    console.log(`${index + 1}. ${topic.name} (${topic.count} consultas)`);
  });
}

// Configurar respuestas rápidas
function setupQuickReplies(chat) {
  console.log('\n=== Configurando Respuestas Rápidas ===\n');
  
  const quickReplies = {
    'saludo': {
      keywords: ['hola', 'buenos días', 'buenas tardes', 'hey'],
      response: '¡Hola! Soy Sophia, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
      emotion: 'happy',
      gesture: 'greeting'
    },
    'despedida': {
      keywords: ['adiós', 'hasta luego', 'chao', 'gracias'],
      response: '¡Ha sido un placer ayudarte! Si necesitas algo más, aquí estaré.',
      emotion: 'friendly',
      gesture: 'waving'
    },
    'productos': {
      keywords: ['productos', 'servicios', 'qué ofrecen'],
      response: 'Ofrecemos tres productos principales: CloudSync Pro, DataAnalytics Suite y SecureAuth. ¿Te gustaría saber más sobre alguno?',
      emotion: 'professional',
      gesture: 'explaining'
    }
  };
  
  chat.addQuickReplies(quickReplies);
  console.log(`✓ ${Object.keys(quickReplies).length} respuestas rápidas configuradas`);
}

// Ejecutar ejemplo
async function main() {
  try {
    console.log('=== Asistente Virtual con Avatar ===\n');
    
    // Crear asistente
    const { avatar, voice, chat } = await createVirtualAssistant();
    
    // Configurar respuestas rápidas
    setupQuickReplies(chat);
    
    // Personalizar avatar
    await customizeAvatar(avatar);
    
    // Demostrar animaciones
    await demonstrateAnimations(avatar);
    
    // Interacción por texto
    await textInteraction(chat, avatar);
    
    // Configurar canales
    // await multichanelIntegration(avatar);
    
    // Mostrar métricas
    // await trackMetrics(avatar, chat);
    
    // Interacción por voz (comentado para no ejecutarse automáticamente)
    // await voiceInteraction(avatar, voice, chat);
    
    console.log('\n✓ Ejemplo completado');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Ejecutar
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  createVirtualAssistant,
  textInteraction,
  voiceInteraction,
  demonstrateAnimations
};
