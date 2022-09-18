'use strict';

const dynamoose = require("dynamoose");
const peopleSchema = new dynamoose.Schema({
  "id": String,
  "Name": String,
  "Phone": String

});

const PeopleModel = dynamoose.model("Peoples", peopleSchema);

exports.handler = async (event) => {

  const id = event.pathParameters.id;

  try {
    let PeopleToDelete = await PeopleModel.get(id);
    await PeopleModel.delete(id);

    const response = {
      statusCode: 200,
      body: JSON.stringify(`${PeopleToDelete.Name} was successfully deleted`),
    }
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify(new Error('Could not delete the people from the table')),
    }
    return response;
  }
};
