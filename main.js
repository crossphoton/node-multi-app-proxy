const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuration
const PORT = 8080;
const HOST = "localhost";

app.get('/info', (req, res, next) => {
   res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

app.use('/1', createProxyMiddleware({
   target: "http://localhost:8000",
   changeOrigin: true,
   pathRewrite: {
       [`^/1`]: '',
   },
}));

app.use('/2', createProxyMiddleware({
   target: "http://localhost:9000",
   changeOrigin: false,
   pathRewrite: {
       [`^/2`]: '',
   },
}));

app.listen(PORT, HOST, () => {
   console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
