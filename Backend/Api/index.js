const AWS = require('aws-sdk');
const cors = require("cors");
const express = require("express");

const app = express();
// Set the region 

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET, POST, ', // Ajusta los métodos permitidos según tus necesidades
}));



const customers = [

];




//Configura las credenciales y la región
AWS.config.update({
    region: 'localhost', // Reemplaza con la región correspondiente
    accessKeyId: 'your-access-key-id', // Reemplaza con tu access key ID
    secretAccessKey: 'your-secret-access-key', // Reemplaza con tu secret access key
  });
  
  // Configura el cliente de DynamoDB
  const ddb = new AWS.DynamoDB.DocumentClient({
    endpoint: 'http://localhost:8000', // Reemplaza con la URL de tu instancia local de DynamoDB
  });

// Objeto que deseas guardar en DynamoDB
const objeto = {
    CustomerId: Date.now().toString(36) + Math.random().toString(36),
    DateCreated: new Date().toISOString(),
    customers
  };
  
  // Parámetros para guardar el objeto en DynamoDB
  const params = {
    TableName: "Consents", // Reemplaza con el nombre de tu tabla
    Item: objeto,
  };
  
  // Guarda el objeto en DynamoDB
  ddb.put(params, function (err, data) {
    if (err) {
      console.error('Error al guardar el objeto:', err);
    } else {
      console.log('Objeto guardado correctamente:', data);
    }
  });







app.get("/", (req, res) => {
  res.send("Api Customers Xolo");
});

app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) return res.status(404).send("CUSTOMER WAS NOT FOUND");
  res.send(customer);
});

app.post("/api/customers", (req, res) => {
  const customer = {
    id: customers.length + 1,
    ...req.body,
  };

  customers.push(customer);
  res.send(customer);
});

app.delete("/api/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find((c) => c.id === customerId);
  if (!customer) return res.status(404).send("CUSTOMER WAS NOT FOUND");

  const index = customers.indexOf(customer);
  customers.splice(index, 1);

  res.send(customer);
});


const port = process.env.port || 8080;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));

