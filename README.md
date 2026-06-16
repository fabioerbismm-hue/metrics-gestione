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

## Login cliente

Gli admin sono:

- `fabio.erbi.smm@gmail.com`
- `info@fabiofregoni.com`

Per dare accesso a un cliente:

1. In Supabase vai su `Authentication` > `Users`.
2. Crea un utente con l'email del cliente e una password.
3. Nella piattaforma, apri `Clienti`.
4. Nella riga del cliente compila `Login cliente` con la stessa email.
5. Il cliente, entrando con quella email, vede solo il CRM del suo cliente.

Se un utente Supabase non e admin e non e associato a nessun cliente, non vede la piattaforma.

## Import CRM

Il CSV CRM deve avere queste colonne, in questo ordine:

`Nome e cognome`, `Ragione sociale`, `Telefono`, `Email`, `LinkedIn`, `Sito web`, `Canale`, `Campagna`, `Data ingresso`, `Provincia / Area`, `Profilo`, `Livello interesse`, `Stato`, `Data appuntamento`, `Link Teams`, `Link inviato via mail`, `Reminder inviato`, `Comunicato su gruppo WA`, `Note Back-Office`, `Prossimo follow-up`, `Tipo follow-up`, `Esito ultimo contatto`, `Note post-call`, `Motivo scarto`, `Lead grezzi`.

Quando importi un CSV, il CRM del cliente aperto viene sostituito con i contatti del file.

## Zapier CRM

Per aggiungere contatti da Zapier, riesegui `supabase-schema.sql` e usa una chiamata `POST` verso:

`https://zonutshwipeqitzjlhkq.supabase.co/rest/v1/rpc/metrics_add_crm_lead`

Header consigliati:

- `apikey`: la `service_role key` di Supabase, da tenere solo dentro Zapier.
- `Authorization`: `Bearer <service_role key>`.
- `Content-Type`: `application/json`.

Body esempio:

```json
{
  "lead": {
    "client": "Nome cliente",
    "name": "Mario Rossi",
    "company": "Azienda SRL",
    "phone": "+39 333 0000000",
    "email": "mario@azienda.it",
    "channel": "Meta Ads",
    "campaign": "Campagna giugno",
    "interest": "Medio-Alto",
    "status": "Da contattare",
    "followups": [
      {
        "date": "2026-06-20",
        "type": "Chiamata",
        "outcome": "Da fare",
        "notes": "Primo contatto"
      }
    ],
    "backofficeNotes": "Arrivato da Zapier"
  }
}
```
