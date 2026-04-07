// Serveur local pour iPad 1 / appareils sans TLS moderne
// Usage : node server.js
// Puis ouvrir http://[IP-du-Mac]:8080 sur l'iPad

var http  = require('http');
var https = require('https');
var fs    = require('fs');
var url   = require('url');

var PORT = 8080;

http.createServer(function(req, res) {
  var parsed = url.parse(req.url, true);

  // ── Proxy météo ──────────────────────────────────────────────
  if (parsed.pathname === '/api/weather') {
    var lat = parsed.query.lat || '48.8566';
    var lon = parsed.query.lon || '2.3522';
    var apiUrl =
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude='  + encodeURIComponent(lat) +
      '&longitude=' + encodeURIComponent(lon) +
      '&current_weather=true' +
      '&hourly=relativehumidity_2m,surface_pressure,visibility,cloudcover,uv_index' +
      '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,' +
              'precipitation_probability_max,weathercode,sunrise,sunset' +
      '&timezone=auto' +
      '&forecast_days=7';

    https.get(apiUrl, function(apiRes) {
      var body = '';
      apiRes.on('data', function(c) { body += c; });
      apiRes.on('end', function() {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(body);
      });
    }).on('error', function(err) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });
    return;
  }

  // ── Page principale ──────────────────────────────────────────
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) { res.writeHead(404); res.end('Fichier introuvable'); return; }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });

}).listen(PORT, '0.0.0.0', function() {
  var os = require('os');
  var nets = os.networkInterfaces();
  console.log('\n=== Serveur WX-Station démarré ===\n');
  Object.keys(nets).forEach(function(name) {
    nets[name].forEach(function(iface) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log('  Sur l\'iPad, ouvrir :  http://' + iface.address + ':' + PORT);
      }
    });
  });
  console.log('\nCtrl+C pour arrêter.\n');
});
