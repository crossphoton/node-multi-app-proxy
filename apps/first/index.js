const app = require('express')();

const PORT=8000;

app.get("/*", (_req, res) => res.json({msg: _req.path, PORT}));

app.listen(PORT);