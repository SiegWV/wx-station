// api/weather.js — Vercel serverless proxy for Open-Meteo
// No API key needed. Fetches current + hourly + daily data.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  var lat = req.query.lat;
  var lon = req.query.lon;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat/lon' });
  }

  var latF = parseFloat(lat);
  var lonF = parseFloat(lon);
  if (isNaN(latF) || isNaN(lonF) || latF < -90 || latF > 90 || lonF < -180 || lonF > 180) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  var url =
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude='  + latF +
    '&longitude=' + lonF +
    '&current_weather=true' +
    '&hourly=relativehumidity_2m,surface_pressure,visibility,cloudcover,uv_index' +
    '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,' +
            'precipitation_probability_max,weathercode,sunrise,sunset' +
    '&timezone=auto' +
    '&forecast_days=7';

  try {
    var upstream = await fetch(url);
    if (!upstream.ok) {
      return res.status(502).json({ error: 'Open-Meteo error', status: upstream.status });
    }
    var data = await upstream.json();
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=60');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Fetch failed', detail: err.message });
  }
}
