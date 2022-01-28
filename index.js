const fallback = require('express-history-api-fallback');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const app = express();
const root = path.join(__dirname, '/dist');
app.use(express.static(root));
app.use(fallback('index.html', { root }));
app.use(helmet());
app.listen(process.env.PORT || 3000);
