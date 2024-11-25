import fastify from 'fastify';
import sensible from './Plugin/sensible.js';
import ollama from 'ollama';
import cors from '@fastify/cors';
import axios from 'axios';

const app = fastify();



app.register(sensible);

app.register(cors, {
    origin: 'http://localhost:5173',
});


app.route({ method: 'GET', url: '/', handler: async (request, reply) => {

    // const apidata = await axios.get('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbres-plantes-par-projet/records');
    //         const greatdata = apidata.data;
    //         console.log("Les données JSON sont : ", JSON.stringify(greatdata, null, 2));

    // const response = await ollama.chat({
    //     model: 'jpacifico/chocolatine-3b',
    //     messages: [
    //         { role: 'user', content: 'Combien il y a t-il de platane à Paris accède aux données que je t ai fournis stp  ?' },
    //         { role: 'tool', content: `Peux-tu me donner les coordonnées géographiques pour l'Alignement 2020-2021 - 05e arrondissement ? Voici les données : ${JSON.stringify(greatdata)}` }
    //     ],
    // });
    //     console.log(response.message.content)
    //     if (response.message.content) {
    //         reply.send(response.message.content);
    //     } else {
    //         reply.send('No response');
    //     }
    }
});

app.route({ method: 'POST', url: '/chat', handler: async (request, reply) => {
    const { message } = request.body;
    console.log(message);
    const apidata = await axios.get('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbres-plantes-par-projet/records');
            const greatdata = apidata.data;
            //console.log("Les données JSON sont : ", JSON.stringify(greatdata, null, 2));

    const response = await ollama.chat({
        model: 'jpacifico/chocolatine-3b',
        messages: [
            { role: 'user', content: message },
            { role: 'tool', content: `Peux-tu me donner les coordonnées géographiques pour l'Alignement 2020-2021 - 05e arrondissement ? Voici les données : ${JSON.stringify(greatdata)}` }
        ],
    });
        // console.log("Les données JSON sont : ", JSON.stringify(response.message.content, null, 2));
        if (response.message.content) {
            return reply.send({ response: response.message });
        } else {
            reply.send('No response');
        }
    }
});

const start = async () => {
    console.log('Starting server...');
    try {
        await app.listen({ port: 3000 });
        console.log('Server listening on http://localhost:3000');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
