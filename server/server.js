const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));

// Ruta pentru pagina admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/admin.html'));
});

// Inițializare bază de date SQLite
const db = new sqlite3.Database(path.join(__dirname, '../data/contacts.db'), (err) => {
    if (err) console.error('Eroare la conectare bază de date:', err);
    else console.log('✓ Conectat la baza de date SQLite');
});

// Creare tabel (dacă nu există)
db.run(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Configurare Email (Nodemailer)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-password'
    }
});

// Ruta: Primire și stocare mesaje
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validare
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Toate câmpurile sunt obligatorii' });
    }

    // Salvare în baza de date
    db.run(
        'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
        [name, email, message],
        function(err) {
            if (err) {
                console.error('Eroare la salvare:', err);
                return res.status(500).json({ error: 'Eroare la salvare mesajului' });
            }

            // Trimitere email (opțional)
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.ADMIN_EMAIL || 'admin@example.com',
                subject: `Mesaj nou de la ${name}`,
                html: `
                    <h3>Mesaj nou de pe site</h3>
                    <p><strong>Nume:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mesaj:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                    <p><small>Data: ${new Date().toLocaleString('ro-RO')}</small></p>
                `
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('Mesaj salvat în bază de date, dar email nu s-a trimis:', err);
                    return res.json({ 
                        success: true, 
                        message: 'Mesajul a fost salvat cu succes!' 
                    });
                }
                console.log('Email trimis:', info.response);
                res.json({ 
                    success: true, 
                    message: 'Mesajul a fost salvat și email trimis cu succes!' 
                });
            });
        }
    );
});

// Ruta: Obține toate mesajele (doar pentru admin)
app.get('/api/messages', (req, res) => {
    db.all('SELECT * FROM messages ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            console.error('Eroare la citire:', err);
            return res.status(500).json({ error: 'Eroare la citire mesajelor' });
        }
        res.json(rows);
    });
});

// Ruta: Șterge mesaj (doar pentru admin)
app.delete('/api/messages/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM messages WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Eroare la ștergere:', err);
            return res.status(500).json({ error: 'Eroare la ștergere' });
        }
        res.json({ success: true, message: 'Mesaj șters cu succes' });
    });
});

// Pornire server
app.listen(PORT, () => {
    console.log(`\n🚀 Server pornit pe http://localhost:${PORT}`);
    console.log(`📊 Vizualizează mesajele pe http://localhost:${PORT}/admin`);
});
