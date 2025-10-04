/**
 * Sentinel - Sistema de Seguridad
 * Orbix Framework - Community Edition
 */

const crypto = require('crypto');

class Sentinel {
  constructor(config = {}) {
    this.config = {
      jwt: {
        secret: config.jwt?.secret || 'default-secret',
        expiresIn: config.jwt?.expiresIn || '24h',
        algorithm: config.jwt?.algorithm || 'HS256'
      },
      mfa: {
        enabled: config.mfa?.enabled || false,
        issuer: config.mfa?.issuer || 'Orbix Framework'
      },
      passwordPolicy: {
        minLength: config.passwordPolicy?.minLength || 12,
        requireUppercase: config.passwordPolicy?.requireUppercase !== false,
        requireLowercase: config.passwordPolicy?.requireLowercase !== false,
        requireNumbers: config.passwordPolicy?.requireNumbers !== false,
        requireSpecial: config.passwordPolicy?.requireSpecial !== false
      },
      ...config
    };
    
    this.roles = new Map();
  }
  
  /**
   * Definir rol con permisos
   */
  defineRole(roleName, permissions) {
    this.roles.set(roleName, permissions);
    return this;
  }
  
  /**
   * Validar contraseña según política
   */
  validatePassword(password) {
    const errors = [];
    const policy = this.config.passwordPolicy;
    
    if (password.length < policy.minLength) {
      errors.push(`La contraseña debe tener al menos ${policy.minLength} caracteres`);
    }
    
    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una mayúscula');
    }
    
    if (policy.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una minúscula');
    }
    
    if (policy.requireNumbers && !/[0-9]/.test(password)) {
      errors.push('La contraseña debe contener al menos un número');
    }
    
    if (policy.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('La contraseña debe contener al menos un carácter especial');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Hash de contraseña
   */
  async hashPassword(password) {
    // Implementación simple - en producción usar bcrypt
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
  }
  
  /**
   * Verificar contraseña
   */
  async verifyPassword(password, hashedPassword) {
    const [salt, originalHash] = hashedPassword.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === originalHash;
  }
  
  /**
   * Generar token JWT
   */
  generateToken(payload) {
    // Implementación simple - en producción usar jsonwebtoken
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
    const body = Buffer.from(JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 // 24 horas
    })).toString('base64');
    
    const signature = crypto
      .createHmac('sha256', this.config.jwt.secret)
      .update(`${header}.${body}`)
      .digest('base64');
    
    return `${header}.${body}.${signature}`;
  }
  
  /**
   * Verificar token JWT
   */
  verifyToken(token) {
    try {
      const [header, body, signature] = token.split('.');
      
      // Verificar firma
      const expectedSignature = crypto
        .createHmac('sha256', this.config.jwt.secret)
        .update(`${header}.${body}`)
        .digest('base64');
      
      if (signature !== expectedSignature) {
        throw new Error('Token inválido');
      }
      
      // Decodificar payload
      const payload = JSON.parse(Buffer.from(body, 'base64').toString());
      
      // Verificar expiración
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new Error('Token expirado');
      }
      
      return payload;
    } catch (error) {
      throw new Error('Error verificando token: ' + error.message);
    }
  }
  
  /**
   * Verificar permisos
   */
  checkPermission(role, permission) {
    const permissions = this.roles.get(role);
    if (!permissions) return false;
    return permissions.includes(permission);
  }
  
  /**
   * Generar secret MFA
   */
  generateMFASecret(options = {}) {
    const secret = crypto.randomBytes(20).toString('hex');
    const name = options.name || 'Orbix Framework';
    const account = options.account || 'user';
    
    // URL para código QR (formato otpauth)
    const qrCode = `otpauth://totp/${name}:${account}?secret=${secret}&issuer=${name}`;
    
    return {
      secret,
      qrCode
    };
  }
  
  /**
   * Verificar código MFA (simplificado)
   */
  verifyMFACode(secret, code) {
    // Implementación simplificada - en producción usar speakeasy o similar
    // Esta es solo una verificación de ejemplo
    return code && code.length === 6 && /^\d+$/.test(code);
  }
}

module.exports = Sentinel;
