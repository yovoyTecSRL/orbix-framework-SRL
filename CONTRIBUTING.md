# Guía de Contribución - Orbix Framework

¡Gracias por tu interés en contribuir al Orbix Framework! Este documento proporciona las pautas para contribuir al proyecto.

## 🌟 Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor:
1. Verifica que no haya sido reportado previamente en [Issues](https://github.com/yovoyTecSRL/orbix-framework-SRL/issues)
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs. actual
   - Información del entorno (OS, versión, etc.)
   - Capturas de pantalla si aplica

### Sugerir Mejoras

Para proponer nuevas características:
1. Abre un issue con la etiqueta "enhancement"
2. Describe claramente la funcionalidad propuesta
3. Explica por qué sería útil
4. Proporciona ejemplos de uso si es posible

### Pull Requests

1. **Fork el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/orbix-framework-SRL.git
   cd orbix-framework-SRL
   ```

2. **Crea una rama para tu feature**
   ```bash
   git checkout -b feature/mi-nueva-caracteristica
   ```

3. **Realiza tus cambios**
   - Sigue las convenciones de código del proyecto
   - Añade tests si es necesario
   - Actualiza la documentación

4. **Commit tus cambios**
   ```bash
   git commit -m "Add: descripción clara del cambio"
   ```
   
   Usa prefijos en los commits:
   - `Add:` para nuevas características
   - `Fix:` para corrección de bugs
   - `Update:` para actualizaciones
   - `Docs:` para documentación
   - `Refactor:` para refactorización
   - `Test:` para tests

5. **Push a tu fork**
   ```bash
   git push origin feature/mi-nueva-caracteristica
   ```

6. **Abre un Pull Request**
   - Describe los cambios realizados
   - Referencia issues relacionados
   - Incluye capturas si hay cambios visuales

## 📝 Estándares de Código

### JavaScript/Node.js
- Usa ES6+ features
- Indentación: 2 espacios
- Semicolons: sí
- Quotes: single quotes
- Usa ESLint para validar

### Python
- Sigue PEP 8
- Indentación: 4 espacios
- Usa type hints
- Docstrings para funciones y clases
- Usa pylint/flake8

### Documentación
- Markdown para docs
- Comentarios en código solo cuando sea necesario
- README actualizado en cada módulo
- Ejemplos de uso claros

## 🧪 Testing

- Escribe tests para nuevas características
- Asegura que todos los tests pasen
- Mantén cobertura de tests > 80%

```bash
# Ejecutar tests
npm test
# o
python -m pytest
```

## 🏗️ Estructura de Módulos

Cada módulo sigue esta estructura:
```
modulo/
├── src/           # Código fuente
├── docs/          # Documentación
├── examples/      # Ejemplos
└── tests/         # Tests
```

## 🔍 Code Review

Los Pull Requests serán revisados por los mantenedores. Se verificará:
- Calidad del código
- Tests
- Documentación
- Adherencia a las convenciones
- Performance

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones se licenciarán bajo la licencia MIT del proyecto.

## 👥 Comunidad

- **Discord:** [Join our Discord](https://discord.gg/orbix)
- **Forum:** [community.orbix-framework.com](https://community.orbix-framework.com)
- **Twitter:** [@OrbixFramework](https://twitter.com/OrbixFramework)

## 📧 Contacto

Si tienes preguntas, contacta a:
- Email: info@yovoytec.com
- GitHub: [@yovoyTecSRL](https://github.com/yovoyTecSRL)

## 🎯 Prioridades Actuales

Áreas donde más se necesita ayuda:
1. Documentación y tutoriales
2. Tests y QA
3. Traducciones
4. Ejemplos de uso
5. Optimización de performance

## ⚡ Quick Start para Desarrollo

```bash
# Clonar
git clone https://github.com/yovoyTecSRL/orbix-framework-SRL.git
cd orbix-framework-SRL

# Instalar dependencias
npm install
# o
pip install -r requirements.txt

# Configurar entorno
cp config/example.env config/.env
# Editar .env con tus credenciales

# Ejecutar en modo desarrollo
npm run dev
# o
python main.py --dev

# Ejecutar tests
npm test
# o
pytest
```

## 🙏 Agradecimientos

¡Gracias por contribuir al Orbix Framework y hacer que la automatización empresarial sea accesible para todos!

---

**Orbix Framework** - Construyendo el futuro juntos 🚀
