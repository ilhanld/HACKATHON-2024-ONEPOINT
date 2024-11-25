import fp from 'fastify-plugin';
import sensible from '@fastify/sensible';

export default fp(async function (fastify, opts) {
    console.log('Plugin sensible chargé !');
    fastify.register(sensible, {
        errorHandler: false,
    });
});
