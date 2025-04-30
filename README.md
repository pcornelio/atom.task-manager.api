# Task Manager API

API para el sistema de gestión de tareas desarrollado con Firebase Functions.

## 🚀 Características

- Gestión de tareas
- Autenticación de usuarios
- API RESTful
- Despliegue automático con GitHub Actions

## 📋 Prerequisitos

- Node.js 18 o superior
- npm o yarn
- Cuenta de Firebase
- Cuenta de GitHub

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/pcornelio/atom.task-manager.api.git
cd task-manager-api
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita el archivo .env con tus credenciales
```

## 🛠️ Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run serve
```

Para ejecutar las pruebas:

```bash
npm test
```

## 📦 Despliegue

### Despliegue Manual

1. Inicia sesión en Firebase:
```bash
firebase login
```

2. Despliega las funciones:
```bash
firebase deploy --only functions
```

### Despliegue Automático con GitHub Actions

El proyecto está configurado con GitHub Actions para despliegue automático. Para que funcione, necesitas configurar los siguientes secrets en tu repositorio de GitHub:

1. `FIREBASE_SERVICE_ACCOUNT`: La clave de cuenta de servicio de Firebase en formato JSON
2. `FIREBASE_PROJECT_ID`: El ID de tu proyecto de Firebase

Para obtener estos valores:

1. Ve a la consola de Firebase
2. Ve a Configuración del proyecto > Cuentas de servicio
3. Genera una nueva clave privada
4. Copia el contenido del archivo JSON generado
5. Ve a la configuración de tu repositorio en GitHub
6. Ve a Secrets and variables > Actions
7. Crea los secrets mencionados anteriormente

El despliegue automático se activará cuando:
- Se haga push a la rama `main`
- Se cree un pull request a la rama `main`

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request