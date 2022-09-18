'use strict';

const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  "id": String,
  "Name": String,
  "Phone": String
});

const peopleModel = dynamoose.model('Peoples', peopleSchema);

exports.handler = async (event) => {

  const people = {
    id: event.queryStringParameters.id,
    Name: event.queryStringParameters.Name,
    Phone: event.queryStringParameters.Phone,
  };

  try {
    let newpeople = await peopleModel.create(people);
    const response = {
      statusCode: 200,
      body: JSON.stringify(newpeople),
    }
    return response;
  } catch (error) {

    const response = {
      statusCode: 500,
      body: JSON.stringify(new Error('Could not read from the People table'))
    };
    return response;


  }
};
