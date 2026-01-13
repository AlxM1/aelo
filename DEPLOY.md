# Deployment Guide

## Option 1: Vercel (Recommended to Start)

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Add Environment Variables**
   In Vercel Dashboard → Project → Settings → Environment Variables:

   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | Your Neon PostgreSQL URL |
   | `NEXTAUTH_URL` | `https://your-project.vercel.app` |
   | `NEXTAUTH_SECRET` | Your secret key |
   | `STRIPE_SECRET_KEY` | Your Stripe key |
   | `NEXT_PUBLIC_BASE_URL` | `https://your-project.vercel.app` |

4. **Deploy**
   - Click "Deploy"
   - Done! Your site is live.

---

## Option 2: Self-Hosted VPS (Docker)

### Prerequisites
- VPS with Docker & Docker Compose installed
- Domain pointing to your VPS IP
- SSL certificate (use Caddy or Let's Encrypt)

### Deploy Steps

1. **Clone to your VPS**
   ```bash
   git clone https://github.com/your-repo/aelo.git
   cd aelo
   ```

2. **Create `.env` file**
   ```bash
   cp .env.example .env
   nano .env
   ```

   Update these values:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_URL="https://yourdomain.com"
   NEXTAUTH_SECRET="your-secret"
   NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
   ```

3. **Build and run**
   ```bash
   docker compose up -d --build
   ```

4. **Set up SSL with Caddy** (recommended)

   Create `Caddyfile`:
   ```
   yourdomain.com {
       reverse_proxy app:3000
   }
   ```

   Uncomment the Caddy section in `docker-compose.yml` and restart:
   ```bash
   docker compose up -d
   ```

### Useful Commands

```bash
# View logs
docker compose logs -f app

# Restart
docker compose restart

# Rebuild after code changes
docker compose up -d --build

# Stop
docker compose down

# Run database migrations
docker compose exec app npx prisma migrate deploy
```

---

## Option 3: Self-Hosted VPS (Without Docker)

### Prerequisites
- Node.js 20+ installed
- PM2 process manager
- Nginx or Caddy for reverse proxy

### Deploy Steps

1. **Clone and install**
   ```bash
   git clone https://github.com/your-repo/aelo.git
   cd aelo
   npm ci
   ```

2. **Set environment variables**
   ```bash
   cp .env.example .env
   nano .env
   # Update all values for production
   ```

3. **Build**
   ```bash
   npx prisma generate
   npm run build
   ```

4. **Run with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "aelo" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Add SSL with Certbot**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Migration: Vercel → VPS

When you're ready to migrate from Vercel to VPS:

1. Your code is already Docker-ready (no changes needed)
2. Your database stays on Neon (no migration needed)
3. Just deploy using Option 2 or 3 above
4. Update your domain DNS to point to VPS IP
5. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` if domain changes

**Zero code changes required!**

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `NEXTAUTH_URL` | Full URL of your site | `https://yourdomain.com` |
| `NEXTAUTH_SECRET` | Random 32+ char secret | `openssl rand -base64 32` |
| `STRIPE_SECRET_KEY` | Stripe API secret key | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `NEXT_PUBLIC_BASE_URL` | Public URL (same as NEXTAUTH_URL) | `https://yourdomain.com` |
