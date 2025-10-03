/**
 * Ejemplo: Sistema de Autenticación con Sentinel
 * 
 * Este ejemplo muestra cómo implementar autenticación segura
 * con JWT, MFA y gestión de roles.
 */

const Sentinel = require('../src/index.js');

// Inicializar Sentinel
const sentinel = new Sentinel({
  jwt: {
    secret: process.env.JWT_SECRET || 'tu-secret-super-seguro',
    expiresIn: '24h'
  },
  mfa: {
    enabled: true,
    issuer: 'MiEmpresa'
  },
  passwordPolicy: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: true
  }
});

// Definir roles y permisos
sentinel.defineRole('admin', [
  'users:read',
  'users:write',
  'users:delete',
  'settings:read',
  'settings:write',
  'reports:read',
  'reports:write'
]);

sentinel.defineRole('user', [
  'profile:read',
  'profile:write',
  'reports:read'
]);

sentinel.defineRole('guest', [
  'profile:read'
]);

// Ejemplo: Registro de usuario
async function registerUser(userData) {
  console.log('\n=== Registro de Usuario ===');
  
  try {
    // Validar contraseña
    const passwordValid = sentinel.validatePassword(userData.password);
    if (!passwordValid.isValid) {
      console.error('Contraseña inválida:', passwordValid.errors);
      return null;
    }
    
    // Hash de contraseña
    const hashedPassword = await sentinel.hashPassword(userData.password);
    
    // Crear usuario
    const user = {
      id: Date.now(),
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'user',
      mfaEnabled: false,
      createdAt: new Date()
    };
    
    console.log('✓ Usuario registrado:', user.email);
    return user;
    
  } catch (error) {
    console.error('Error en registro:', error.message);
    return null;
  }
}

// Ejemplo: Login con MFA
async function loginUser(email, password, mfaCode = null) {
  console.log('\n=== Login de Usuario ===');
  
  try {
    // Simular búsqueda de usuario en BD
    const user = await findUserByEmail(email);
    
    if (!user) {
      console.error('✗ Usuario no encontrado');
      return null;
    }
    
    // Verificar contraseña
    const passwordMatch = await sentinel.verifyPassword(password, user.password);
    if (!passwordMatch) {
      console.error('✗ Contraseña incorrecta');
      return null;
    }
    
    // Verificar MFA si está habilitado
    if (user.mfaEnabled) {
      if (!mfaCode) {
        console.log('⚠ MFA requerido. Por favor proporciona el código.');
        return { requiresMFA: true };
      }
      
      const mfaValid = sentinel.verifyMFACode(user.mfaSecret, mfaCode);
      if (!mfaValid) {
        console.error('✗ Código MFA inválido');
        return null;
      }
    }
    
    // Generar JWT
    const token = sentinel.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    
    console.log('✓ Login exitoso');
    console.log('Token:', token.substring(0, 50) + '...');
    
    return { user, token };
    
  } catch (error) {
    console.error('Error en login:', error.message);
    return null;
  }
}

// Ejemplo: Verificar permisos
async function checkPermission(token, permission) {
  console.log(`\n=== Verificar Permiso: ${permission} ===`);
  
  try {
    // Verificar y decodificar token
    const decoded = sentinel.verifyToken(token);
    
    // Verificar permiso
    const hasPermission = sentinel.checkPermission(decoded.role, permission);
    
    if (hasPermission) {
      console.log('✓ Permiso concedido');
    } else {
      console.log('✗ Permiso denegado');
    }
    
    return hasPermission;
    
  } catch (error) {
    console.error('Error verificando permiso:', error.message);
    return false;
  }
}

// Ejemplo: Configurar MFA
async function setupMFA(userId) {
  console.log('\n=== Configurar MFA ===');
  
  try {
    // Generar secret de MFA
    const mfaSetup = sentinel.generateMFASecret({
      name: 'MiEmpresa',
      account: `user-${userId}`
    });
    
    console.log('Secret:', mfaSetup.secret);
    console.log('QR Code URL:', mfaSetup.qrCode);
    console.log('\nEscanea el código QR con tu app de autenticación (Google Authenticator, Authy, etc.)');
    
    return mfaSetup;
    
  } catch (error) {
    console.error('Error configurando MFA:', error.message);
    return null;
  }
}

// Función auxiliar para simular búsqueda de usuario
async function findUserByEmail(email) {
  // En producción, esto consultaría la base de datos
  return {
    id: 1,
    email: email,
    password: await sentinel.hashPassword('Password123!'),
    role: 'user',
    mfaEnabled: false,
    createdAt: new Date()
  };
}

// Ejecutar ejemplos
async function main() {
  console.log('=== Sistema de Autenticación con Sentinel ===');
  
  // 1. Registrar usuario
  const newUser = await registerUser({
    email: 'usuario@empresa.com',
    password: 'Password123!',
    role: 'user'
  });
  
  if (newUser) {
    // 2. Login
    const loginResult = await loginUser('usuario@empresa.com', 'Password123!');
    
    if (loginResult && loginResult.token) {
      // 3. Verificar permisos
      await checkPermission(loginResult.token, 'profile:read');
      await checkPermission(loginResult.token, 'users:write');
      
      // 4. Configurar MFA
      await setupMFA(newUser.id);
    }
  }
  
  console.log('\n=== Ejemplos completados ===');
}

// Ejecutar
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  registerUser,
  loginUser,
  checkPermission,
  setupMFA
};
