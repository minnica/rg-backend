import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Keysar Cosmetics APIs',
    version: '1.0.0',
    description: 'Documentación de mi API REST',
  },
  servers: [
    {
      url: 'https://keysarcosmetics.fly.dev/',
      description: 'Servidor de producción',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
