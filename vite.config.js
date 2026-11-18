import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function rsvpPlugin() {
  const dataDir = path.resolve(process.cwd(), 'data');
  const filePath = path.join(dataDir, 'rsvps.json');

  const getRsvps = () => {
    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(filePath, JSON.stringify([], null, 2));
        return [];
      }
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      return [];
    }
  };

  const saveRsvps = (rsvps) => {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(rsvps, null, 2));
  };

  return {
    name: 'vite-rsvp-backend',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/rsvps' && req.method === 'GET') {
          const list = getRsvps();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, data: list }));
          return;
        }

        if (req.url === '/api/rsvp' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const newEntry = JSON.parse(body);
              newEntry.id = 'rsvp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
              newEntry.createdAt = new Date().toISOString();
              const list = getRsvps();
              list.unshift(newEntry);
              saveRsvps(list);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, entry: newEntry, count: list.length }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
            }
          });
          return;
        }

        if (req.url && req.url.startsWith('/api/rsvp/') && req.method === 'DELETE') {
          const id = req.url.replace('/api/rsvp/', '');
          const list = getRsvps().filter((r) => r.id !== id);
          saveRsvps(list);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, count: list.length }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), rsvpPlugin()],
  base: './',
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
});
