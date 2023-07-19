const AWS = require('aws-sdk');
const cors = require("cors");
const express = require("express");
const Joi = require('joi');

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.URL_DOMAIN || "http://localhost:3000",
  methods: 'GET, POST',
}));

const consentsSchema = Joi.object({
  hasAllergies: Joi.string().allow("yes", "no"),
  allergies: Joi.string().optional(),
  isInMaternity: Joi.string().allow("yes", "no"),
  hasADisease: Joi.string().allow("yes", "no"),
  disease: Joi.string().optional(),
  hasAMedication: Joi.string().allow("yes", "no"),
  medication: Joi.string().optional(),
  hasAcneMedication: Joi.string().allow("yes", "no"),
  hasAMedicalDevice: Joi.string().allow("yes", "no"),
  hasASkinTreatment: Joi.string().allow("yes", "no"),
  skinTreatment: Joi.string().optional(),
  isUsingSkinProducts: Joi.string().allow("yes", "no"),
  skinProducts: Joi.string().optional(),
  fullName: Joi.string().required(),
  signature: Joi.string().required(),
});

AWS.config.update({
  region: 'localhost',
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
});
  
const dynamoDbClient = new AWS.DynamoDB.DocumentClient({
  endpoint: 'http://localhost:8000',
});

app.get("/", (req, res) => {
  res.send("Ok");
});

app.post("/consents", async (req, res) => {
  const { value, error } = consentsSchema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).send({
      message: "Invalid parameters"
    });
  }

  const consent = {
    customerId: Date.now().toString(36) + Math.random().toString(36),
    dateCreated: new Date().toISOString(),
    ...value,
  };
  
  const params = {
    TableName: "consents",
    Item: consent,
  };
  
  try {
    await dynamoDbClient.put(params).promise();
    return res.send(consent);
  } catch (error) {
    return res.status(500).send({
      message: "Database is not available"
    });
  }
});

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
