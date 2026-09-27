# Malwa Builders Backend

Node.js + Express + MongoDB (Mongoose) backend for the Malwa Builders admin
panel (the Next.js app in `../../Test Folder/malwa-admin`): projects,
customers, payment milestones/receipts, materials, vendors, vendor
commitments, reminders, website media and firm settings.

## Setup

```bash
cd backend
cp .env.example .env   # then edit MONGO_URI / JWT_SECRET if needed
npm install
npm run dev            # nodemon, or `npm start` for plain node
```

MongoDB must be running locally (or point `MONGO_URI` at a remote cluster).
On first start, two demo staff accounts are seeded automatically if the
`users` collection is empty (same accounts the frontend used to seed into
localStorage): `admin@malwabuilders.com` / `admin123` and
`manager@malwabuilders.com` / `manager123`.

## How the frontend connects (see also the frontend's own README/comments)

The admin panel used to keep its entire dataset in `localStorage` and never
made a network call. It now talks to this backend two ways:

1. **`POST /api/auth/login`** — real auth: password checked with bcrypt,
   returns a JWT. **`GET /api/auth/demo-users`** is a dev-only convenience
   endpoint that powers the login page's "tap to fill" list; it only ever
   returns the two seeded demo accounts, never a real password hash.
2. **`GET /api/db`** / **`PUT /api/db`** — the frontend loads its whole
   dataset in one call on startup, and after any edit (via its existing
   `update`/`save`/`remove` calls, unchanged) pushes the collections that
   changed back with `PUT /api/db`. This mirrors exactly what it used to do
   with `localStorage.setItem` on every change, just persisted in MongoDB
   instead of the browser. **`users` is never included** in a sync — staff
   accounts aren't editable from the admin panel's UI.

Every other resource collection also has a full REST CRUD API of its own
(see table below) for direct use/testing, even though the frontend itself
only calls `/api/db`.

## Endpoints

| Resource | Endpoints | Notes |
| --- | --- | --- |
| Auth | `POST /api/auth/login`, `GET /api/auth/me`, `GET /api/auth/demo-users` | JWT bearer auth |
| Whole dataset | `GET /api/db`, `PUT /api/db` | what the frontend actually uses |
| Settings | `GET /api/settings`, `PUT /api/settings` | singleton firm profile |
| Customers | `GET/POST /api/customers`, `GET/PUT/DELETE /api/customers/:id` | |
| Projects | `GET/POST /api/projects`, `GET/PUT/DELETE /api/projects/:id` | |
| Milestones | `GET/POST /api/milestones`, `GET/PUT/DELETE /api/milestones/:id` | one instalment of a project's payment schedule |
| Payments | `GET/POST /api/payments`, `GET/PUT/DELETE /api/payments/:id` | a receipt against a milestone |
| Materials | `GET/POST /api/materials`, `GET/PUT/DELETE /api/materials/:id` | |
| Vendors | `GET/POST /api/vendors`, `GET/PUT/DELETE /api/vendors/:id` | |
| Commitments | `GET/POST /api/commitments`, `GET/PUT/DELETE /api/commitments/:id` | what's owed to a vendor |
| Reminders | `GET/POST /api/reminders`, `GET/PUT/DELETE /api/reminders/:id` | |
| Media | `GET/POST /api/media`, `GET/PUT/DELETE /api/media/:id` | website photos/videos |

All routes above (except `POST /api/auth/login` and `GET /api/auth/demo-users`)
require `Authorization: Bearer <token>`.

## Folder structure

```
backend/src/
  config/db.js             MongoDB connection
  models/                  User, Customer, Project, Milestone, Payment,
                            Material, Vendor, Commitment, Reminder, Media, Settings
  controllers/              authController, settingsController, dbController
  routes/                    authRoutes, settingsRoutes, dbRoutes,
                             resourceRoutes.js (generic CRUD router factory)
  middleware/               auth.js (JWT check), errorHandler.js
  utils/                    crudFactory (generic list/get/create/update/delete),
                             idPlugin (Mongo `_id` -> frontend `id`), ensureDemoUsers
  app.js / server.js         Express app wiring / process entry point
```

Every non-`User` model accepts the frontend's own string `id` as its Mongo
`_id` (instead of an auto-generated ObjectId), so ids created client-side
(e.g. a new payment's receipt) round-trip unchanged through `/api/db`.
