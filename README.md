# PawFinder – Meet Your New Bestie 🐾

## Project Overview
PawFinder is a full‑stack pet‑adoption web platform that lets users browse, adopt, and donate pets.  It includes:
- A responsive, modern UI with a dual‑theme (light/dark) and vibrant teal‑amber palette.
- A Node.js/Express backend with MongoDB Atlas for persistence.
- Razorpay integration (demo mode) for subscription plans.
- Cloud Run deployment for server‑less hosting.

## Tech Stack
- **Frontend**: HTML, CSS (vanilla), JavaScript (ES6)
- **Backend**: Node.js (v20), Express, Mongoose
- **Database**: MongoDB Atlas
- **Payments**: Razorpay (test keys)
- **Hosting**: Google Cloud Run (asia‑south1)
- **Containerisation**: Docker

## Repository Structure
```
Virtual-PromptWars/
├─ .dockerignore          # Files Docker should ignore
├─ Dockerfile             # Container build definition
├─ README.md              # ← This file
├─ index.html             # Front‑end entry point
├─ script.js              # Front‑end logic (theme, API calls)
├─ styles.css             # Styling (glassmorphism, gradients)
├─ server/                # Backend source
│   ├─ server.js          # Express server
│   ├─ models/            # Mongoose schemas (User, Pet, Adoption)
│   └─ ...
└─ images/                # UI assets
```

## Prerequisites
- **Node.js** (v20) and **npm**
- **MongoDB Atlas** account (connection string)
- **Google Cloud SDK** (`gcloud`) installed and authenticated
- **Razorpay** test keys (optional for real payments)

## Local Development
1. Clone the repo and `cd Virtual-PromptWars`
2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```
3. Create a `.env` file in `server/` with:
   ```env
   MONGO_URI=<your‑mongodb‑connection‑string>
   RAZORPAY_KEY_ID=rzp_test_YourKeyHere
   RAZORPAY_KEY_SECRET=YourSecretHere
   ```
4. Run the backend:
   ```bash
   node server.js
   ```
5. Open `index.html` in a browser (or serve the folder with a static server) to see the UI.

## Deployment to Cloud Run
The project is containerised with the following Dockerfile:
```Dockerfile
FROM node:20-slim
WORKDIR /app
COPY . .
WORKDIR /app/server
RUN npm install --production
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
```
1. Ensure the `server/` folder is present (it lives inside the repo).
2. Create an `env.yaml` with the required env vars **except** `PORT` (Cloud Run sets it automatically):
```yaml
MONGO_URI: "mongodb://..."
RAZORPAY_KEY_ID: "rzp_test_YourKeyHere"
RAZORPAY_KEY_SECRET: "YourSecretHere"
```
3. Deploy from the repository root (the folder that contains `Dockerfile` and `server/`):
```bash
gcloud run deploy pawfinder \
  --source . \
  --region asia-south1 \
  --project promptwars-493817 \
  --allow-unauthenticated \
  --env-vars-file env.yaml
```
The service URL will be printed after a successful deployment, e.g.:
```
https://pawfinder-501629533547.asia-south1.run.app
```

## Environment Variables
| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `RAZORPAY_KEY_ID` | Razorpay public key (test) |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key (test) |
| `PORT` | **Do not set** – Cloud Run provides it |

## Features
- **Pet Gallery** – Browse pets with filters and search.
- **Adoption Flow** – Submit adoption applications.
- **User Auth** – Sign‑up / login (password hashed with bcrypt).
- **Subscription Plans** – Razorpay demo integration for Pro/Premium tiers.
- **Responsive Design** – Works on mobile, tablet, and desktop.
- **Dark/Light Theme** – Toggle via UI, persisted in `localStorage`.

## License
MIT – Feel free to fork, modify, and deploy your own version.

---
*Happy pet hunting!*