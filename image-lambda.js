const AWS = require('aws-sdk');

const S3 = new AWS.S3();

exports.handler = async (event) => {
  let { bucket, object } = event.Records[0].s3;

  try {
    let payload = await S3.getObject({ Bucket: bucket.name, Key: 'images.json' }).promise();

    let stringifiedPayload = payload.Body.toString();

    let readThePayload = JSON.parse(stringifiedPayload);
    let newPayload = readThePayload.images;

    console.log(readThePayload);

    const newObjImg = {
      name: object.key,
      size: object.size
    };
    const objectUpdate = {
      images: newPayload,
    };

    if (objectUpdate.images.some((i) => i.name == newObjImg.name)) {
      const indxOf = objectUpdate.images.indxOf(objectUpdate.image.find((i) => i.name == newObjImg));
      objectUpdate.images[indxOf] = newObjImg;
    } else {
      objectUpdate.images.push(newObjImg);
    }
    console.log('HERE I AM OBJECT UPDATE:', objectUpdate);

    let newPhoto = await S3.putObject({
      Bucket: bucket.name,
      Key: 'images.json',
      Body: JSON.stringify(objectUpdate),
      ContentType: 'application/json'
    }).promise();

    console.log('NEW PHOTO FILE HERE::', newPhoto);

  } catch (e) {
    console.log(e);
    // what is the error?
    if (e.code == 'NoSuchKey') {
      let manifest = await S3.putObject({
        Bucket: bucket.name,
        Key: 'images.json',
        Body: JSON.stringify({ images: [{ name: object.key, size: object.size }] }),
        ContentType: 'applcation/json'

      }).promise();
      console.log('THIS IS THE PAYLOAD:', manifest);

      const response = {
        statusCode: 200,
        body: JSON.stringify(manifest),
      };
      return response;
    }
  }
};
