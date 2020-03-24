const conn = require('../db/conn');

module.exports = {
    async index (request,response){
        const{page = 1 } = request.query;
        const [count] = await conn('incidents').count();
        const incidents = await conn('incidents')
        .join('ongs','ongs.id', '=','incidents.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request,response){
        const {title,description,value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conn('incidents').insert({
            description,
            ong_id,
            title,
            value
        });

        return response.json({id});
    },
    
    async delete (request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await conn('incidents').where('id',id).select('ong_id').first();
        
        if(ong_id !== incidents.ong_id){
            return response.status(401).json({erro : "Esse incidente pertence a outa Ong"});
        }

        await conn('incidents').where('id',id).delete();
            

        return response.status(204).send();
    },

};