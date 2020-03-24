const conn = require('../db/conn');

module.exports = {
    async create(request,response){
        const {id} = request.body;

        const ong = await conn('ongs')
        .where('id',id)
        .select('name')
        .first();
        if(!ong){
            return response.status(400).json({erro : 'Ong não existe'});
        }
        return response.json(ong);
    },

};