# ✅ Gestor de Tareas - Aplicación Web Progresiva (PWA)

Este proyecto fue desarrollado como **Trabajo Práctico 1** para la materia **Aplicaciones Web Progresivas**, dictada en la Escuela Superior de Arte Multimedial Leonardo Da Vinci. Consiste en una **aplicación de gestión de tareas**, construida bajo los lineamientos de una PWA (Progressive Web App), con funcionalidades offline, uso de Service Worker, manifiesto web y estrategias de caché.

> 🎨 **Nota:** Todo el diseño visual y la estructura de la aplicación fueron realizados por mí, priorizando la experiencia de usuario, la estética responsiva y la funcionalidad clara y eficiente.

---

## 🛠️ Funcionalidades principales

- ✔️ Agregar, eliminar y marcar tareas como completadas.
- 🌓 Funciona offline gracias a Service Worker y caché estático/dinámico.
- 📱 Interfaz responsiva para dispositivos móviles y escritorio.
- 📦 Instalación como app en la pantalla de inicio.
- ⚙️ Optimización del rendimiento mediante estrategias de caché.

---


---

## 💻 Tecnologías utilizadas

- **HTML5**: Estructura semántica clara.
- **CSS3**: Estilos personalizados y diseño responsivo.
- **JavaScript (ES6+)**: Lógica de gestión de tareas y manipulación del DOM.
- **Service Worker**: Caché de archivos estáticos y experiencia offline.
- **Manifiesto Web App**: Permite instalar la app en dispositivos móviles.

---

## 📦 Detalles técnicos

### 🧾 Manifiesto Web App
Archivo `manifest.json` con:
- Nombre e íconos de la app.
- Colores de tema y fondo.
- Start URL y display tipo "standalone".

### 🔧 Service Worker
Archivo `service-worker.js` que:
- Precacha recursos esenciales en la instalación.
- Usa caché dinámico para tareas agregadas por el usuario.
- Permite que la app funcione sin conexión.

### 📲 Interfaz de usuario
- Responsive (mobile-first).
- Botones accesibles e intuitivos.
- Feedback visual al completar tareas.

---


