# Guía de Inicio Rápido - Orbix Framework

## 🚀 Instalación Rápida

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/yovoyTecSRL/orbix-framework-SRL.git
cd orbix-framework-SRL
```

### Paso 2: Instalar Dependencias

#### Para Node.js/JavaScript:
```bash
npm install
```

#### Para Python:
```bash
pip install -r requirements.txt
```

### Paso 3: Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp config/example.env config/.env

# Editar con tus credenciales
nano config/.env  # o usa tu editor favorito
```

### Paso 4: Ejecutar el Framework

```bash
# Ver ayuda
node index.js --help

# Ejecutar demo
node index.js --demo
```

## 📚 Primeros Pasos

### 1. Probar AeNKI (Inteligencia Artificial)

```bash
node aenki/examples/chatbot-example.js
```

**Ejemplo de código:**
```javascript
const { AeNKI } = require('./index.js');

const ai = new AeNKI({ model: 'gpt-4' });
const response = await ai.chat('¿Qué puede hacer Orbix Framework?');
console.log(response.message);
```

### 2. Probar Sentinel (Seguridad)

```bash
node sentinel/examples/auth-example.js
```

**Ejemplo de código:**
```javascript
const { Sentinel } = require('./index.js');

const security = new Sentinel();
security.defineRole('admin', ['users:read', 'users:write']);

// Hash de contraseña
const hashed = await security.hashPassword('Password123!');

// Generar JWT
const token = security.generateToken({ userId: 1, role: 'admin' });
```

### 3. Probar Dashboards (Visualización)

```bash
node dashboards/examples/sales-dashboard.js
```

**Ejemplo de código:**
```javascript
const { Dashboard, Widget } = require('./index.js');

const dashboard = new Dashboard({
  title: 'Mi Dashboard',
  theme: 'corporate'
});

dashboard.addWidget(new Widget({
  type: 'kpi',
  title: 'Ventas del Mes',
  value: 125000
}));

await dashboard.render('#container');
```

### 4. Probar Avatares (Asistente Virtual)

```bash
node avatars/examples/virtual-assistant.js
```

**Ejemplo de código:**
```javascript
const { Avatar } = require('./index.js');

const avatar = new Avatar({
  name: 'Ana',
  type: '3d',
  style: 'corporate'
});

await avatar.render('#avatar-container');
await avatar.say('¡Hola! Soy tu asistente virtual.');
```

## 🎯 Casos de Uso Comunes

### Crear un Chatbot Empresarial

```javascript
const { AeNKI, Avatar, ChatEngine } = require('orbix-framework');

// Crear IA
const ai = new AeNKI({ model: 'gpt-4' });
ai.setContext('Eres un asistente de ventas profesional.');

// Crear avatar
const avatar = new Avatar({ name: 'Sophia', type: '3d' });

// Motor de chat
const chat = new ChatEngine({ avatar, aiEnabled: true });

// Procesar mensajes
chat.onMessage(async (message) => {
  const response = await ai.chat(message);
  await avatar.say(response.message);
});
```

### Crear Dashboard en Tiempo Real

```javascript
const { Dashboard, Widget } = require('orbix-framework');

const dashboard = new Dashboard({
  title: 'Monitoreo en Tiempo Real',
  refreshInterval: 5000
});

// Agregar widgets
dashboard.addWidget(new Widget({
  type: 'line-chart',
  title: 'Ventas en Vivo',
  dataSource: '/api/sales/realtime'
}));

await dashboard.render('#dashboard');
```

### Sistema de Autenticación Completo

```javascript
const { Sentinel } = require('orbix-framework');

const security = new Sentinel({
  jwt: { secret: process.env.JWT_SECRET },
  mfa: { enabled: true }
});

// Definir roles
security.defineRole('admin', ['*']);
security.defineRole('user', ['profile:read', 'reports:read']);

// Registro
const user = await registerUser({
  email: 'usuario@empresa.com',
  password: 'Password123!',
  role: 'user'
});

// Login
const { token } = await loginUser(user.email, password);

// Verificar permisos
const hasPermission = security.checkPermission('user', 'reports:read');
```

## 🔧 Configuración Avanzada

### Configurar AeNKI con OpenAI

```javascript
// config/aenki.config.js
module.exports = {
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000
};
```

### Configurar Sentinel con MFA

```javascript
// config/sentinel.config.js
module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h'
  },
  mfa: {
    enabled: true,
    methods: ['totp', 'email']
  },
  passwordPolicy: {
    minLength: 12,
    requireUppercase: true,
    requireSpecial: true
  }
};
```

## 📖 Documentación Completa

- **General:** [README.md](./README.md)
- **AeNKI:** [aenki/docs/README.md](./aenki/docs/README.md)
- **Sentinel:** [sentinel/docs/README.md](./sentinel/docs/README.md)
- **Dashboards:** [dashboards/docs/README.md](./dashboards/docs/README.md)
- **Avatares:** [avatars/docs/README.md](./avatars/docs/README.md)
- **Contribuir:** [CONTRIBUTING.md](./CONTRIBUTING.md)

## 🆘 Ayuda y Soporte

### Problemas Comunes

**Error: "Cannot find module"**
```bash
# Instalar dependencias
npm install
```

**Error: "API key not configured"**
```bash
# Configurar .env
cp config/example.env config/.env
# Editar y agregar tus API keys
```

**Error: "Permission denied"**
```bash
# Dar permisos de ejecución
chmod +x scripts/*
```

### Obtener Ayuda

- **Issues:** [GitHub Issues](https://github.com/yovoyTecSRL/orbix-framework-SRL/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yovoyTecSRL/orbix-framework-SRL/discussions)
- **Email:** info@yovoytec.com

## 🎓 Siguientes Pasos

1. ✅ Completar la instalación
2. ✅ Ejecutar los ejemplos
3. 📖 Leer la documentación completa
4. 🛠️ Crear tu primer proyecto
5. 🤝 Unirte a la comunidad
6. 🌟 Dar una estrella en GitHub

## 💡 Tips

- Usa `node index.js --demo` para ver todas las funcionalidades
- Revisa los ejemplos en cada carpeta `examples/`
- Lee la documentación de cada módulo antes de usarlo
- Únete a nuestra comunidad para obtener ayuda

---

**¡Bienvenido a Orbix Framework!** 🚀

Comienza a automatizar tu empresa hoy mismo.
