# 🚀 Despliegue API NestJS en AWS (ECS + RDS)

Este documento explica **de forma sencilla** cómo desplegar esta API en AWS usando **ECS (Docker)** y **RDS (PostgreSQL)**, cómo manejar **secretos con AWS Secrets Manager** y un **ejemplo básico de Terraform**.

> ⚠️ Nota: Este es un diseño **realista y profesional**, pero explicado para alguien que **está aprendiendo AWS desde cero**.

---

## 🧱 Arquitectura general

```
Usuario
  ↓
Load Balancer (ALB)
  ↓
ECS (NestJS en Docker)
  ↓
RDS (PostgreSQL)
```

---

## 1️⃣ Despliegue de la API en AWS ECS

### 🔹 ¿Qué es ECS?

ECS es donde corre tu aplicación
Piensa en ECS como: “El lugar en AWS que mantiene tu API prendida 24/7"

---

### 🔹 Paso 1: Dockerizar la API

En la raíz del proyecto:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

Esto permite que la API corra igual en local y en AWS.

---

### 🔹 Paso 2: Subir imagen a ECR

1. Crear repositorio en **Amazon ECR**
2. Build de la imagen
3. Push al repositorio


## 2️⃣ Base de datos con AWS RDS

### 🔹 ¿Qué es RDS?

RDS es una base de datos **administrada** (PostgreSQL en este caso).
Piensa en RDS como: “El PostgreSQL de la nube, pero ya configurado y cuidado por AWS”


Configuración típica:

* Engine: PostgreSQL
* DB Name: `productos_db`
* No accesible públicamente
* Conectada a la misma VPC que ECS

---

## 3️⃣ Manejo de secretos con AWS Secrets Manager

### 🔹 ¿Por qué usar secretos?

Nunca debes poner esto en el código:
Piensa en Secrets Manager como: "Las variables de entorno de tu proyecto" 

* Usuario DB
* Password DB
* Host

---

### 🔹 Crear secreto

Ejemplo en Secrets Manager:

```json
{
  "DB_HOST": "productos-db.xxxxxx.rds.amazonaws.com",
  "DB_PORT": "5432",
  "DB_USER": "postgres",
  "DB_PASSWORD": "password_seguro",
  "DB_NAME": "productos_db"
}
```

---

### 🔹 Usar el secreto en ECS

En la **Task Definition**:

* Environment → Secrets
* Conectar cada key al secreto

NestJS los lee con `ConfigService`:

```ts
process.env.DB_HOST
```

---

## 4️⃣ Terraform – Crear RDS

Terraform crea infraestructura automáticamente
Piensa en Terraform como: “Un script que crea cosas en AWS por ti”

Ejemplo **simple** de Terraform:

```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_db_instance" "postgres" {
  identifier        = "productos-db"
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  allocated_storage = 20

  db_name  = "productos_db"
  username = "postgres"
  password = "password_seguro"

  skip_final_snapshot = true
}
```

Terraform permite crear infraestructura **como código**.

---

## 5️⃣ Variables de entorno esperadas

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

## ✅ Conclusión

* ECS ejecuta la API
* RDS guarda los datos
* Secrets Manager protege credenciales
* Terraform automatiza infraestructura

Este enfoque es **usado en producción real**.

---

## 📌 Estado del proyecto

* ✔️ CRUD completo
* ✔️ Tests
* ✔️ Swagger
* ✔️ Listo para despliegue en AWS
