const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

//Essa rota irá buscar todos os Devs no raio de 10km e filtar por tecnologia
module.exports = {

    async index( request, response ) {

        const {  latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

//      Vamos trazer os Devs porém com um filtro por isso a criação de um objeto
        const devs = await Dev.find({
//          1° Devis que trabalham com as tecnologias que eu estou passando
            techs: {

//              'In' dentre essas tecnologias - Operador lógico do moongo DB
                $in: techsArray,
            },

//          2° Localização do Usuário
            location: {

//              'Near' consigo encontra objetos perto de uma localização
//              Ele vai receber dois parâmetros
                $near: {

//                   Ponto
                    $geometry: {

                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },

//                  Máximo de distância que eu quero retornar os objetos
                    $maxDistance: 10000,


                }
            }
        });

        return response.json({ devs })
    }

}