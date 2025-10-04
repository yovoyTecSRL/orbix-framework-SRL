# Sentinel - Sistema de Seguridad

## 📖 Descripción

Sentinel es el módulo de seguridad integral del Orbix Framework, proporcionando autenticación, autorización, cifrado y protección contra amenazas para aplicaciones empresariales.

## 🎯 Características

### Autenticación y Autorización
- Autenticación multi-factor (MFA)
- Single Sign-On (SSO)
- OAuth 2.0 / OpenID Connect
- JWT (JSON Web Tokens)
- Gestión de sesiones seguras
- Políticas de contraseñas robustas

### Gestión de Identidades y Accesos (IAM)
- Control de acceso basado en roles (RBAC)
- Control de acceso basado en atributos (ABAC)
- Gestión de usuarios y grupos
- Permisos granulares
- Auditoría de accesos

### Cifrado y Protección de Datos
- Cifrado AES-256-GCM
- TLS/SSL para comunicaciones
- Hashing seguro (bcrypt, Argon2)
- Gestión de claves criptográficas
- Protección de datos sensibles (PII)

### Detección de Amenazas
- Monitoreo en tiempo real
- Detección de anomalías
- Prevención de ataques (DDoS, XSS, CSRF)
- Rate limiting
- Análisis de logs de seguridad

### Cumplimiento Normativo
- GDPR (Protección de datos EU)
- ISO 27001 (Seguridad de la información)
- SOC 2 (Controles de seguridad)
- HIPAA (Datos de salud)
- PCI DSS (Datos de tarjetas)

## 🏗️ Arquitectura

```
sentinel/
├── src/
│   ├── auth/           # Autenticación
│   ├── authorization/  # Autorización
│   ├── encryption/     # Cifrado
│   ├── iam/           # Gestión de identidades
│   ├── monitoring/    # Monitoreo de seguridad
│   └── compliance/    # Cumplimiento normativo
├── policies/          # Políticas de seguridad
├── docs/             # Documentación
└── examples/         # Ejemplos de uso
```

## 🚀 Uso Rápido

### Ejemplo 1: Autenticación con JWT

```javascript
const { Sentinel } = require('orbix-framework');

// Inicializar Sentinel
const security = new Sentinel({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h'
  }
});

// Autenticar usuario
const user = await security.authenticate({
  username: 'usuario@empresa.com',
  password: 'password123'
});

// Generar token
const token = security.generateToken({
  userId: user.id,
  roles: user.roles
});

console.log('Token:', token);
```

### Ejemplo 2: Autorización con RBAC

```python
from sentinel import Authorization

# Configurar roles y permisos
auth = Authorization()

# Definir roles
auth.define_role('admin', [
    'users:read', 'users:write', 'users:delete',
    'reports:read', 'reports:write'
])

auth.define_role('user', [
    'users:read',
    'reports:read'
])

# Verificar permisos
user = {'id': 1, 'roles': ['user']}
has_permission = auth.check_permission(user, 'users:write')
print(f"Can write users: {has_permission}")  # False
```

### Ejemplo 3: Cifrado de Datos

```javascript
const { Encryption } = require('orbix-framework/sentinel');

// Inicializar módulo de cifrado
const encryption = new Encryption({
  algorithm: 'AES-256-GCM',
  keyDerivation: 'PBKDF2'
});

// Cifrar datos sensibles
const sensitiveData = 'Número de tarjeta: 4532-1234-5678-9010';
const encrypted = encryption.encrypt(sensitiveData);
console.log('Cifrado:', encrypted);

// Descifrar datos
const decrypted = encryption.decrypt(encrypted);
console.log('Descifrado:', decrypted);
```

### Ejemplo 4: Detección de Amenazas

```python
from sentinel import ThreatDetection

# Inicializar detector de amenazas
detector = ThreatDetection()

# Monitorear evento
event = {
    'ip': '192.168.1.100',
    'user_id': 123,
    'action': 'login_attempt',
    'timestamp': '2024-01-15T10:30:00Z',
    'failed_attempts': 5
}

# Analizar evento
threat = detector.analyze(event)

if threat.is_threat:
    print(f"Amenaza detectada: {threat.type}")
    print(f"Nivel de riesgo: {threat.risk_level}")
    detector.block_ip(event['ip'])
```

## 🔧 Configuración

### Configuración Básica

```yaml
# config/sentinel.yml
sentinel:
  authentication:
    jwt:
      secret: ${JWT_SECRET}
      expiration: 86400  # 24 horas
      algorithm: 'HS256'
    
    mfa:
      enabled: true
      methods: ['totp', 'sms', 'email']
    
    password_policy:
      min_length: 12
      require_uppercase: true
      require_lowercase: true
      require_numbers: true
      require_special: true
      expiration_days: 90
  
  authorization:
    type: 'rbac'  # o 'abac'
    default_role: 'user'
  
  encryption:
    algorithm: 'AES-256-GCM'
    key_rotation: true
    rotation_days: 30
  
  monitoring:
    enabled: true
    log_level: 'info'
    alert_channels: ['email', 'slack']
  
  compliance:
    gdpr: true
    iso27001: true
    audit_retention_days: 365
```

### Configuración de Políticas de Seguridad

```javascript
// policies/security-policy.js
module.exports = {
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests
    message: 'Demasiadas solicitudes'
  },
  
  // CORS
  cors: {
    origin: ['https://empresa.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  },
  
  // Helmet (seguridad headers)
  helmet: {
    contentSecurityPolicy: true,
    hsts: true,
    noSniff: true
  },
  
  // Sesiones
  session: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 3600000
    }
  }
};
```

## 🛡️ Políticas de Seguridad

### Política de Contraseñas
- Mínimo 12 caracteres
- Combinación de mayúsculas, minúsculas, números y símbolos
- No reutilizar últimas 5 contraseñas
- Expiración cada 90 días
- Bloqueo tras 5 intentos fallidos

### Política de Acceso
- Autenticación multi-factor obligatoria
- Sesiones con tiempo de expiración
- Cierre automático de sesión tras inactividad
- Registro de todos los accesos

### Política de Datos
- Cifrado en tránsito (TLS 1.3)
- Cifrado en reposo (AES-256)
- Anonimización de datos sensibles
- Retención según normativa

## 🚨 Monitoreo y Alertas

### Eventos Monitoreados
- Intentos de login fallidos
- Accesos no autorizados
- Cambios en permisos
- Actividad sospechosa
- Vulnerabilidades detectadas

### Canales de Alerta
- Email
- SMS
- Slack/Teams
- Dashboard en tiempo real
- Logs centralizados

## 📊 Dashboard de Seguridad

Sentinel incluye un dashboard para monitorear:
- Estado de seguridad en tiempo real
- Intentos de acceso bloqueados
- Eventos de seguridad recientes
- Cumplimiento normativo
- Auditoría de accesos
- Alertas activas

## 🔐 Mejores Prácticas

### 1. Autenticación
```javascript
// ✅ CORRECTO: Usar MFA
await sentinel.authenticate({
  username: user.email,
  password: hashedPassword,
  mfaCode: user.mfaToken
});

// ❌ INCORRECTO: Sin MFA
await sentinel.authenticate({
  username: user.email,
  password: password
});
```

### 2. Almacenamiento de Contraseñas
```python
# ✅ CORRECTO: Hash con salt
from sentinel import PasswordHasher
hasher = PasswordHasher()
hashed = hasher.hash(password)  # Usa bcrypt/Argon2

# ❌ INCORRECTO: Hash simple
import hashlib
hashed = hashlib.md5(password.encode()).hexdigest()
```

### 3. Gestión de Tokens
```javascript
// ✅ CORRECTO: Token con expiración corta
const token = jwt.sign(payload, secret, { expiresIn: '15m' });
const refreshToken = jwt.sign(payload, secret, { expiresIn: '7d' });

// ❌ INCORRECTO: Token sin expiración
const token = jwt.sign(payload, secret);
```

## 🐛 Troubleshooting

### Error: "JWT expired"
**Solución:** Implementar refresh token:
```javascript
const newToken = await sentinel.refreshToken(expiredToken);
```

### Error: "MFA code invalid"
**Solución:** Sincronizar reloj del servidor o regenerar código.

### Error: "Rate limit exceeded"
**Solución:** Implementar backoff exponencial en el cliente.

## 📈 Performance y Escalabilidad

- Caché de sesiones con Redis
- Load balancing de autenticación
- Replicación de políticas
- Monitoreo distribuido

## 📚 Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [OAuth 2.0 Specification](https://oauth.net/2/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

## 🤝 Contribuir

Para contribuir a Sentinel, consulta la [guía de contribución](../../CONTRIBUTING.md).

---

**Sentinel** - Seguridad Empresarial de Nivel Corporativo 🛡️
