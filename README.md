# orbix-framework-SRL
communidad-Orbix-framework


Orbix Framework Ce – Bootstrap (readme + Compose + Env)
· other
# README.md


@app.get("/")
def root():
    return {"status": "ok", "message": "Hello, Orbix CE"}
```


**`examples/avatars/index.html` (demo 9:16 adaptable):**
```html
<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Avatares – Orbix CE</title>
<style>
  body{margin:0;display:grid;place-items:center;height:100vh;background:#0b0f14;color:#eaeef3;font-family:system-ui}
  .wrap{width:min(95vw,420px);aspect-ratio:9/16;border:1px solid #223;border-radius:16px;overflow:hidden;background:#111}
  iframe{width:100%;height:100%;border:0}
  .hint{margin:12px 0 0;opacity:.7;font-size:.9rem;text-align:center}
</style></head>
<body>
  <div class="wrap">
    <iframe src="https://example.com/avatar-demo" title="Avatar"></iframe>
  </div>
  <div class="hint">9:16 responsive • reemplaza el src por tu HeyGen/TalkingHead</div>
</body></html>
```


---


# .env.example


```dotenv
# ==== Postgres ====
POSTGRES_USER=orbix
POSTGRES_PASSWORD=orbix123
POSTGRES_DB=orbix_ce
POSTGRES_PORT=5432


# ==== Redis ====
REDIS_PORT=6379


# ==== Servicios demo ====
API_PORT=8000
AVATAR_PORT=8080
PORTAINER_PORT=9000


# ==== Integraciones (placeholders) ====
# OPENAI_API_KEY=sk-xxxx
# TELEGRAM_BOT_TOKEN=xxxx
# ODOO_URL=https://erp.example.com
# ODOO_KEY=xxxx
```


---


> Archivos opcionales sugeridos para próximas confirmaciones: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `.gitignore`, plantillas de PR/Issue y workflows de CI actualizados a `actions/*@v4`.
