<<<<<<< HEAD
# Evoluția Sistemelor de Operare - Website

Un website modern despre evoluția sistemelor de operare cu formular de contact integrat în bază de date și trimitere de email.

## 📋 Cerințe

- **Node.js** (v14 sau mai nouă) - [Descarcă de aici](https://nodejs.org/)
- **npm** (vine cu Node.js)

## 🚀 Instalare și pornire

### 1. Instalează dependențele

Deschide Terminal/PowerShell în folderul proiectului și rulează:

```bash
npm install
```

### 2. Configurează email-ul (.env)

Editează fișierul `.env` și adaugă:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@example.com
PORT=3000
```

**Pentru Gmail:**
1. Mergi la [Google Account Security](https://myaccount.google.com/security)
2. Activează "2-Step Verification"
3. Mergi la [App Passwords](https://myaccount.google.com/apppasswords)
4. Alege "Mail" și "Windows Computer"
5. Copiază parola generată în `.env`

### 3. Pornește serverul

```bash
npm start
```

Ar trebui să vezi:
```
✓ Conectat la baza de date SQLite
🚀 Server pornit pe http://localhost:3000
```

### 4. Deschide site-ul

Mergi la `http://localhost:3000` în browser

## 📊 Bază de date

Mesajele sunt salvate în `contacts.db` (SQLite). Conține:
- **id** - ID unic
- **name** - Nume
- **email** - Email
- **message** - Mesaj
- **created_at** - Data și ora

## 📧 Fluxul de trimitere

1. Utilizator completează formularul
2. Se trimite la server (`POST /api/contact`)
3. Se salvează în baza de date
4. Se trimite email la admin (dacă e configurat)
5. Se confirmă utilizatorul

## 🔧 API Endpoints

- **POST** `/api/contact` - Trimite mesaj
- **GET** `/api/messages` - Obține toate mesajele
- **DELETE** `/api/messages/:id` - Șterge mesaj

## 📝 Structura fișierelor

```
Evolutia sistemelor de operare/
├── index.html       # Pagina principală
├── style.css        # Stiluri
├── script.js        # Frontend JavaScript
├── server.js        # Backend Node.js
├── package.json     # Dependențe
├── .env             # Configurare (email, etc.)
├── contacts.db      # Bază de date (se creeaza automat)
└── README.md        # Instrucțiuni
```

## 🛠️ Troubleshooting

**Eroare: "Cannot find module 'express'"**
- Rulează `npm install` din nou

**Email-ul nu se trimite**
- Verifica `.env` - introduceți email și parola corecte
- Gmail: asigură-te că ai generat App Password
- Verifica ADMIN_EMAIL în `.env`

**Port 3000 e deja folosit**
- Schimbă `PORT=3000` în `.env` la alt port (ex: 3001)

**Nu conectezi la server**
- Asigură-te că server-ul rulează (npm start)
- Deschide `http://localhost:3000` (nu `file://`)

## 💡 Viitor

Poți adăuga:
- Pagină de admin pentru a gestiona mesajele
- Autentificare
- Backup automat
- Statistici vizitatori
- Imagini și videouri

---

Făcut cu ❤️ pentru evoluția SO-urilor
=======
# Evoluția Sistemelor de Operare - Website

Un website modern despre evoluția sistemelor de operare cu formular de contact integrat în bază de date și trimitere de email.

## 📋 Cerințe

- **Node.js** (v14 sau mai nouă) - [Descarcă de aici](https://nodejs.org/)
- **npm** (vine cu Node.js)

## 🚀 Instalare și pornire

### 1. Instalează dependențele

Deschide Terminal/PowerShell în folderul proiectului și rulează:

```bash
npm install
```

### 2. Configurează email-ul (.env)

Editează fișierul `.env` și adaugă:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@example.com
PORT=3000
```

**Pentru Gmail:**
1. Mergi la [Google Account Security](https://myaccount.google.com/security)
2. Activează "2-Step Verification"
3. Mergi la [App Passwords](https://myaccount.google.com/apppasswords)
4. Alege "Mail" și "Windows Computer"
5. Copiază parola generată în `.env`

### 3. Pornește serverul

```bash
npm start
```

Ar trebui să vezi:
```
✓ Conectat la baza de date SQLite
🚀 Server pornit pe http://localhost:3000
```

### 4. Deschide site-ul

Mergi la `http://localhost:3000` în browser

## 📊 Bază de date

Mesajele sunt salvate în `contacts.db` (SQLite). Conține:
- **id** - ID unic
- **name** - Nume
- **email** - Email
- **message** - Mesaj
- **created_at** - Data și ora

## 📧 Fluxul de trimitere

1. Utilizator completează formularul
2. Se trimite la server (`POST /api/contact`)
3. Se salvează în baza de date
4. Se trimite email la admin (dacă e configurat)
5. Se confirmă utilizatorul

## 🔧 API Endpoints

- **POST** `/api/contact` - Trimite mesaj
- **GET** `/api/messages` - Obține toate mesajele
- **DELETE** `/api/messages/:id` - Șterge mesaj

## 📝 Structura fișierelor

```
Evolutia sistemelor de operare/
├── index.html       # Pagina principală
├── style.css        # Stiluri
├── script.js        # Frontend JavaScript
├── server.js        # Backend Node.js
├── package.json     # Dependențe
├── .env             # Configurare (email, etc.)
├── contacts.db      # Bază de date (se creeaza automat)
└── README.md        # Instrucțiuni
```

## 🛠️ Troubleshooting

**Eroare: "Cannot find module 'express'"**
- Rulează `npm install` din nou

**Email-ul nu se trimite**
- Verifica `.env` - introduceți email și parola corecte
- Gmail: asigură-te că ai generat App Password
- Verifica ADMIN_EMAIL în `.env`

**Port 3000 e deja folosit**
- Schimbă `PORT=3000` în `.env` la alt port (ex: 3001)

**Nu conectezi la server**
- Asigură-te că server-ul rulează (npm start)
- Deschide `http://localhost:3000` (nu `file://`)

## 💡 Viitor

Poți adăuga:
- Pagină de admin pentru a gestiona mesajele
- Autentificare
- Backup automat
- Statistici vizitatori
- Imagini și videouri

---

Făcut cu ❤️ pentru evoluția SO-urilor
>>>>>>> abcbb6b6a5fde656692021ce6d66fcfecfde8768
