const dynamoose = require("dynamoose");
const peopleSchema = new dynamoose.Schema({

  "id": String,
  "Name": String,
  "Phone": String

});
const PeopleModel = dynamoose.model("Peoples", peopleSchema);

exports.handler = async (event) => {

  const id = event.pathParameters.id;
  const people = {
    name: event.queryStringParameters.Name,
  }

  try {
    let updatePeople = await PeopleModel.update(id, people)

    const response = {
      statusCode: 200,
      body: JSON.stringify(updatePeople),

    }
    return response

  } catch (error) {
    const response = {

      statusCode: 500,
      body: JSON.stringify(new Error('Could not read from the people table')),
    }
    return response;
  }
};
