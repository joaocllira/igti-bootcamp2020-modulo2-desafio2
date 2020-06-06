import express from 'express';
import routes from './routes.js';

var app = express();

app.use(express.json());
app.use('/grades-control-api', routes);

app.listen(3333, function () {
    console.log('Server running on port 3333!');
});