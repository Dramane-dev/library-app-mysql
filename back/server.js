require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}...`);
    db.authenticate()
     .then(() => console.log('connected to mysql db successfuly ! ✅'))
     .catch(err => console.log('Impossible de se connecter à la base de données : ❌ ' + error ));
});





