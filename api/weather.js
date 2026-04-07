export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var lat = req.query.lat;
  var lon = req.query.lon;
  var url =
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude='  + lat +
    '&longitude=' + lon +
    '&current_weather=true' +
    '&hourly=relativehumidity_2m,surface_pressure,visibility,cloudcover,uv_index' +
    '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,' +
            'precipitation_probability_max,weathercode,sunrise,sunset' +
    '&timezone=auto' +
    '&forecast_days=7';
  try {
    var upstream = await fetch(url);
    var data = await upstream.json();
    res.setHeader('Cache-Control', 's-maxage=600');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
