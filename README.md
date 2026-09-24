# Gestor de Tareas SPA - MateCode (Proyecto Integrador Módulo 4)
Aplicación web de gestión de tareas desarrollada con un enfoque minimalista y profesional, implementando autenticación de usuarios, persistencia en la nube y notificaciones mediante servicios administrados (BaaS y Serverless).

## 🚀 Tecnologías y Stack
- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend as a Service (BaaS):** Firebase (Authentication + Cloud Firestore)
- **Notificaciones:** AWS SES (Simple Email Service)
- **Serverless API:** Vercel Functions
- **Despliegue:** Vercel

---

## 🏗️ Decisiones Arquitectónicas
El proyecto está estructurado bajo principios de separación de responsabilidades y Clean Architecture básica:
- `src/components/`: Componentes modulares y reutilizables de UI (Navbar, TaskForm).
- `src/pages/`: Vistas principales de la aplicación (AuthPage y Dashboard).
- `src/context/`: Contexto global para la sesión del usuario (`AuthContext`).
- `src/api/`: Capa de integración y conexión con Firebase.
- `src/types/`: Definición de interfaces tipadas de TypeScript (`Task.ts`).
- `api/`: Funciones serverless de Vercel encargadas de procesar el envío seguro de correos electrónicos con AWS SES sin exponer credenciales en el cliente.

---

## ⚙️ Instrucciones de Instalación y Configuración Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/MARCELO0585/PROYECTOM4-ALEJANDROMARCELO.git
   cd gestor-tareas-pi
Instala las dependencias:
Bash
npm install
Configura las variables de entorno creando un archivo .env en la raíz basado en el archivo .env.example:   

Fragmento de código
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_SES_SENDER_EMAIL=tu_correo_verificado@gmail.com
Ejecuta el servidor de desarrollo local:

Bash
npm run dev
🌐 URL de Producción
https://proyectom4am.vercel.app/

## ⚠️ Nota Importante sobre AWS SES (Modo Sandbox)
La funcionalidad de envío de resúmenes por correo electrónico está integrada mediante **AWS SES** ejecutándose a través de funciones serverless. 
- Debido a las políticas de seguridad de AWS, las cuentas nuevas se encuentran por defecto en **modo Sandbox**. 
- En este estado, **el sistema solo permite enviar correos electrónicos a la dirección del remitente que ha sido previamente verificada** en la consola de AWS SES. Cualquier intento de enviar correos a usuarios externos no verificados requerirá solicitar el acceso de producción (*Production Access*) en AWS.
- Correo y contraseña para probar API : alejandropuentesmarcelo@gmail.com, 123456

- ## 🧪 Testing y Pruebas Unitarias
El proyecto incluye una suite de pruebas configurada para cumplir con los requisitos de calidad y robustez de la rúbrica:
- **Herramientas:** Vitest y React Testing Library.
- **Componentes probados:** Renderizado y comportamiento de componentes clave como `TaskForm`.
- **Ejecución de pruebas:** 
  ```bash
  npm test

  
🤖 Integración de Inteligencia Artificial en el Desarrollo
La IA fue utilizada como herramienta de apoyo y mentor de código durante todo el proceso de construcción del Proyecto Integrador:

Efectividad: Fue altamente efectiva en la estructuración inicial de componentes tipados con TypeScript, la resolución rápida de errores de tipado de Firestore y la redacción segura de la función serverless conectada a AWS SES.

Buenas prácticas descubiertas: Consolidar una separación estricta entre la lógica de autenticación mediante Context API y las consultas filtradas por userId en Firestore para garantizar la seguridad de los datos de cada usuario.
