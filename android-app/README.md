# Garden Helper — Android Prototype

This app is a local garden planning tool with an interactive map, offline data storage, Supabase authentication support, weather-aware advice, and a small on-device guidance engine.

Features:
- Interactive map for garden items: plants, grass, water features, furniture
- Persistent offline storage of garden markers via AsyncStorage
- Supabase authentication and garden sync
- Weather lookup for each garden location using Open-Meteo
- Local garden advice engine (`gemma`) confined to plant and care questions

Setup:

1. Install dependencies:

```bash
cd android-app
npm install
```

2. Configure Supabase:

- Open `utils/supabase.js`
- Replace `SUPABASE_URL` and `SUPABASE_ANON_KEY` with your Supabase project values

4. Create a Supabase table for garden sync:

In Supabase SQL editor, run:

```sql
create table gardens (
  user_id uuid primary key,
  markers jsonb
);
```

5. Run the app locally:

```bash
npm run start
```

4. Launch on Android:

```bash
npm run android
```

Usage:

- Long-press on the map to add a garden item.
- Tap markers to view weather and care guidance.
- Use the panel to ask garden questions and get local advice.
- Sign in to sync your garden markers with Supabase.
