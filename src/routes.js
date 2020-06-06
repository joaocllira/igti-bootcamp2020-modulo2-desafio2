import { Router } from 'express';

var routes = Router();

routes.get('/list', (request, response) => {
    response.send({ message: "Hello, World!" })
});

export default routes;