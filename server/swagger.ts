const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const distOutputFile = '../server/swagger_output.json'
const endpointsFiles = [
    '../server/index.ts',
]

swaggerAutogen(outputFile, endpointsFiles);
swaggerAutogen(distOutputFile, endpointsFiles);