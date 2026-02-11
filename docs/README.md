# Evoluția Sistemelor de Operare - Website

Un website modern despre evoluția sistemelor de operare, cu pagini statice și backend pentru formularul de contact.

## 📋 Cerințe

- **Browser modern** pentru vizualizare.
- **Node.js + npm** pentru serverul de contact/admin.
- **Python** sau **Node.js** pentru server local static (opțional).

## 🚀 Pornire rapidă

### Varianta 1: Static (fără backend)

- Rulează `start-server.ps1` din rădăcina proiectului (folosește Python).
- Alternativ: `npx http-server -p 8000`.
- Deschide `http://localhost:8000/index.html`.

### Varianta 2: Backend (formular + admin)

1. Instalează dependențele:
```bash
npm install
```
2. Configurează email-ul în `config/.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@example.com
PORT=3000
```
3. Pornește serverul:
```bash
npm start
```
4. Deschide `http://localhost:3000`.

## 📊 Bază de date

Mesajele sunt salvate în `data/contacts.db` (SQLite).

## 🔧 API Endpoints

- **POST** `/api/contact`
- **GET** `/api/messages`
- **DELETE** `/api/messages/:id`

## 🧪 Teste (arhivă)

Testele HTML sunt în `docs/tests/`.

## 📝 Structura fișierelor

```
Evolutia sistemelor de operare/
├── index.html
├── pages/
├── css/
├── js/
├── windows/
├── server/
├── config/.env
├── data/contacts.db
├── docs/
└── README_LOCAL_SERVER.md
```

## 🛠️ Troubleshooting

- **Cannot find module 'express'**: rulează `npm install`.
- **Email-ul nu se trimite**: verifică `config/.env`.
- **Port ocupat**: schimbă `PORT` în `config/.env`.
- **Nu conectezi la server**: verifică `npm start` și `http://localhost:3000`.

Făcut cu ❤️ pentru evoluția SO-urilor
