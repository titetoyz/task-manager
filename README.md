# Task Manager alkalmazás - powered by Balom Soma T3JIXF

## A Projekt leírása

Ez a projekt egy egyszerű **Task Manager alkalmazás**, amely lehetővé teszi a feladatok nyomon követését, kezelését.

A rendszer egy teljes **end-to-end DevOps pipeline**, a következőket használtam:

- Frontend alkalmazás
- Backend REST API
- MongoDB adatbázis
- Docker containerization
- CI pipeline
- Container registry

---

# Technológiai stack

## Frontend
- Angular 21
- TypeScript
- CSS

## Backend
- ASP.NET Core 10
- C#
- REST API

## Database
- MongoDB 8

## DevOps
- Docker
- Docker Compose
- GitHub Actions
- GitHub Container Registry (GHCR)

---

# Architektúra

A rendszer három fő komponensből áll.

```
Angular Frontend
        | HTTP REST API
        v 
ASP.NET Backend
        | MongoDB Driver
        v
MongoDB Database
```

A frontend HTTP kéréseket küld a backend REST API felé, a backend kezeli az üzleti logikát és kommunikál a MongoDB adatbázissal.

---

# Docker architektúra

A projekt három konténerből áll:

- frontend container
- backend container
- mongodb container

A teljes rendszer **Docker Compose segítségével indul**!

---

# Futtatás Dockerrel

A projekt indítása:

```bash
docker compose up --build
```

Ez elindítja:

- MongoDB
- ASP.NET backend
- Angular frontend

---

# Elérési pontok

Frontend elérhető az alábbi címen:

```
http://localhost:4200
```

Backend API elérhető az alábbi címen:

```
http://localhost:5069/api/tasks
```

---

# Funkciók

Az alkalmazás támogatja a teljes **CRUD működést**!

### Create
Új feladat létrehozása 

### Read
Feladatok listázása

### Update
Feladat státusz módosítása
Státuszok lehetnek:
- Todo
- InProgress
- Done

### Delete
Feladat törlése

---

# CI Pipeline

A projekt **GitHub Actions workflow-t** használ.

A Pipeline működése:

```
code push
   ↓
docker build
   ↓
docker image push
   ↓
GitHub Container Registry
```

A pipeline automatikusan buildeli:

- frontend image
- backend image

és feltölti a **GHCR registry-be**.

---

# Container Registry

A Docker image-ek elérhetőek:

```
ghcr.io/titetoyz/task-manager-backend
ghcr.io/titetoyz/task-manager-frontend
```
---

# Használat

1. Nyisd meg a frontend oldalt:

```
http://localhost:4200
```

2. Hozz létre új taskot

3. Módosítsd a státuszt

4. Töröld a taskot

# Készítette Balom Soma - T3JIXF, B-ALKFET tárgy - minden jog fenntartva :D
