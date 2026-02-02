Rulare locală (recomandat) — afișare corectă imagini și video

De ce: Browserele blochează anumite redirecționări și hotlink-uri când deschizi pagini direct cu file://. Cel mai fiabil mod este să servești site-ul prin HTTP local.

1) Metoda rapidă (PowerShell) — folosește scriptul adăugat:

- Deschide File Explorer în folderul proiectului (directorul care conține `index.html`).
- Dă dublu click pe `start-server.ps1` sau rulează în PowerShell:

  .\start-server.ps1

- Deschide în Edge URL-ul:

  http://localhost:8000/pages/history/capitol-1-inceputuri.html

- Oprește serverul cu Ctrl+C în terminal.

2) Alternativ (dacă ai Python instalat):

- Deschide PowerShell în directorul proiectului și rulează:

  py -m http.server 8000

sau

  python -m http.server 8000

3) Alternativ (dacă ai Node.js):

- Deschide PowerShell în directorul proiectului și rulează:

  npx http-server -p 8000

4) Dacă preferi să folosești `file://` (deschidere directă din Explorer):

- Proiectul are acum suport pentru active locale în paginile de istorie; paginile care folosesc doar fișiere locale relative se pot deschide cu file:// din Explorer. Reține însă că unele browsere (în special pe mobil) pot restricționa funcții avansate (service worker, încorporări cross-origin) când rulezi din `file://`.

Notă: Servirea printr-un server HTTP local rămâne cea mai fiabilă opțiune pentru telefon și desktop. Dacă vrei funcționare offline completă (inclusiv videoclipuri), pot descărca și adăuga fallback-uri video locale — spune-mi "da" și le voi include.
