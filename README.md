# Metrics gestione

Web app per gestire clienti, attivita, tempi, costi, margini, acquisizione e rinnovi di Metrics.

## Uso locale

Apri `index.html` nel browser oppure servi la cartella con un piccolo server locale.

I dati della versione attuale vengono salvati nel browser tramite `localStorage`.

## Prossimi step

- Aggiungere login/admin.
- Pubblicare su hosting con deploy automatico da GitHub.

## Database online con Supabase

La app supporta Supabase come database condiviso.

1. Crea un progetto su Supabase.
2. Apri `SQL Editor`.
3. Incolla ed esegui il contenuto di `supabase-schema.sql`.
4. Vai in `Project Settings` > `API`.
5. Copia `Project URL` e `anon public key`.
6. Inseriscili in `config.js`.

Finche `config.js` non contiene le credenziali Supabase, l'app continua a salvare i dati in locale nel browser.

## Login e registro modifiche

La versione online richiede login Supabase.

1. In Supabase apri `Authentication` > `Users`.
2. Crea un utente per Fabio e uno per Frego.
3. Usa email e password per accedere alla piattaforma.
4. Riesegui `supabase-schema.sql` se hai una versione precedente dello schema.

Il registro modifiche salva email utente, area modificata, azione e dettaglio del cambio.
