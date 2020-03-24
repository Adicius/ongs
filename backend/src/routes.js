const express = require('express');

const OngController = require('./controllers/OngController');
const IncidenteController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();
/*
* Query Params: url?name=Diego (request.query)
* Route Params: url/Diego (url/:name ,request.params)
* Request Body: Obj json (app.post, request.body)
*/

//#################Login#########################
routes.post('/session', SessionController.create);
//###############################################
//#################Ongs##########################
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
//###############################################
//##############Incidnets########################
routes.get('/incidents', IncidenteController.index);
routes.post('/incidents', IncidenteController.create);
routes.delete('/incidents/:id', IncidenteController.delete);
//###############################################
//################Profile########################
routes.get('/profile', ProfileController.index);
//###############################################





module.exports = routes;