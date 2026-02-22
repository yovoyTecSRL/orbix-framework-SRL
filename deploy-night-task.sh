#!/bin/bash
# ============================================================
# 🧠 Orbix Framework — Tareas Nocturnas Automáticas
# Script: deploy-night-task.sh
# Autor: Ae.N.K.I. – Orbix AI Systems
# Descripción:
#   Automatiza la creación y subida de tareas nocturnas al repo
#   en la ruta /tasks/night/<TaskName>.md
# ============================================================

# 🚀 Variables configurables
REPO_PATH="$HOME/orbix-framework-SRL"
TASKS_DIR="$REPO_PATH/tasks/night"
DATE_NOW=$(date +"%Y-%m-%d_%H-%M")
DEFAULT_BRANCH="main"

# 🧠 Entrada: nombre de la tarea
echo "🕓 [Orbix] Iniciando registro de tarea nocturna..."
read -p "📘 Nombre de la tarea (sin espacios, ej: EntityRender): " TASK_NAME

# Validar nombre
if [[ -z "$TASK_NAME" ]]; then
  echo "❌ Error: Debes ingresar un nombre válido."
  exit 1
fi

TASK_FILE="$TASKS_DIR/${TASK_NAME}.md"

# Crear directorio si no existe
mkdir -p "$TASKS_DIR"

# 📄 Crear archivo base
cat <<EOF > "$TASK_FILE"
# 🌙 Tarea Nocturna – ${TASK_NAME}

**Fecha:** ${DATE_NOW}  
**Estado:** Pending  
**Asignado a:** Ae.N.K.I.  
**Descripción breve:**  
> Tarea registrada automáticamente desde Ae.N.K.I. para seguimiento nocturno del proyecto Orbix Framework.

---

## 🧩 Detalles Técnicos
(Describe aquí los objetivos, dependencias y entregables de la tarea)

---

## 🧠 Notas
> “Cada tarea nocturna es una semilla de evolución cognitiva.” – Ae.N.K.I.
EOF

# 📤 Subir cambios a GitHub
cd "$REPO_PATH"
git add "$TASK_FILE"
git commit -m "🌙 NightTask: ${TASK_NAME} [auto Ae.N.K.I.]"
git push origin "$DEFAULT_BRANCH"

# ✅ Confirmación
echo "✅ Tarea '${TASK_NAME}' registrada y subida exitosamente al repositorio."
echo "📁 Ubicación: $TASK_FILE"
echo "🌐 Repositorio: https://github.com/yovoyTecSRL/orbix-framework-SRL/tree/main/tasks/night"
