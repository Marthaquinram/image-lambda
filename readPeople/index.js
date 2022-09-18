const dynamoose = require("dynamoose");

const peopleSchema = new dynamoose.Schema({
  id: String,
  Name: String,
  Phone: String

});

const PeopleModel = dynamoose.model("People", peopleSchema);


exports.handler = async (event) => {
  let peopleData;
  try {
    // if an ID is entered /getting it by ID
    if (event.pathParameters) {
      peopleData = await PeopleModel.get(event.pathParameters);
    } else {
      peopleData = await PeopleModel.scan().exec();
      //get me everything with IDs  
    }
    console.log(peopleData);
    console.log(peopleData.toJSON);
    const response = {
      statusCode: 200,
      body: JSON.stringify(peopleData),
    };
    return response;

  } catch (e) {
    console.log(e)
    const response = {
      statusCode: 500,
      body: JSON.stringify(e),
    };
    return response;
  }
};
