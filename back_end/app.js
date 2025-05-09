const  express = require("express");
const pg = require('pg');
const path = require("path");
const cors = require("cors");
const corsOptions = {origin: ["http://localhost:5173"]}




const {Client } = require('pg');
const client = new Client({
user: 'postgres',
password: 'password',
host: 'localhost',
port: 5432,
database: 'iceCreamShop',
})

//client.connect();

const app = express();
const port = 4444;
app.use(cors(corsOptions));


app.use(express.json());

app.use(express.static("./public"))

app.get('/', async (req, res) => {
    
    res.sendFile(path.resolve((__dirname+'/reservation.html')));
});

 //CUSTOMER SECTION
app.get('/api/customer', async (req, res) => {
    const data = await client.query('SELECT * FROM customer ORDER BY \"id\"');
    res.json(data.rows);
});

app.post('/api/customer/add/:name', async (req, res) => {
    console.log('Sending Post"');
    let {name} = req.params;
    console.log("Tried to get there")
    //console.log(req.body);
    await client.query("INSERT INTO customer (name) VALUES($1)", [ name]);
    res.json('success');
});    

app.delete('/api/customer/delete/:id', async (req, res) =>{
    let{ id } = req.params;
    console.log(id);
    console.log(typeof id) 
    await client.query("DELETE FROM customer WHERE \"id\" = $1", [id]);
    res.json('success');
});

app.put('/api/customer/modify/:name/:id', async (req, res) => {  
    const { name, id } = req.params
    console.log(name)
    console.log(id)
  const data = await client.query("UPDATE customer SET \"name\" = $1 WHERE \"id\" = $2", [name, id]);
  res.json(data.rows);
});

//RESTAURANT SECTION
app.get('/api/restaurant', async (req, res) => {
  const data = await client.query('SELECT * FROM restaurant ORDER BY \"id\"');
  res.json(data.rows);
});

app.post('/api/restaurant/add/:name', async (req, res) => {
  console.log('Sending Post"');
  let {name} = req.params;
  console.log("Tried to get there")
  //console.log(req.body);
  await client.query("INSERT INTO restaurant (name) VALUES($1)", [ name]);
  res.json('success');
});    

app.delete('/api/restaurant/delete/:id', async (req, res) =>{
  let{ id } = req.params;
  console.log(id);
  console.log(typeof id) 
  await client.query("DELETE FROM restaurant WHERE \"id\" = $1", [id]);
  res.json('success');
});

app.put('/api/restaurant/modify/:name/:id', async (req, res) => {  
  const { name, id } = req.params
  console.log(name)
  console.log(id)
const data = await client.query("UPDATE restaurant SET \"name\" = $1 WHERE \"id\" = $2", [name, id]);
res.json(data.rows);
});

//RESERVATION SECTION
app.get('/api/reservation', async (req, res) => {
  const data = await client.query('SELECT c.name, rt.name restaurant, r.date, r.party_count, r.id FROM reservation r JOIN customer c on c.id = r.customer_id JOIN restaurant rt on rt.id = r.restaurant_id ORDER BY \"id\"');
  res.json(data.rows)
});

app.post('/api/reservation', async (req, res) => {
  //const data = await client.query('SELECT * FROM reservation ORDER BY id');
  //res.json(data.rows);
  const {date, numParty, customerID, restaurantID} = req.body
  console.log(date)
  console.log(typeof date)
  console.log(numParty)
  console.log(customerID)
  console.log(restaurantID)
  const data = await client.query("INSERT INTO reservation (date, party_count, customer_id, restaurant_id) VALUES($1, $2, $3, $4)", [ date, numParty, customerID, restaurantID]);
  res.json(data.rows);

});
app.put('/api/reservation', async (req, res) => {
  //const data = await client.query('SELECT * FROM reservation ORDER BY id');
  //res.json(data.rows);
  const {date, numParty, customerID, restaurantID, id} = req.body
  console.log("/n/n")
  console.log(id)
  console.log(date)
  console.log(typeof date)
  console.log(numParty)
  console.log(customerID)
  console.log(restaurantID)
  const data = await client.query("UPDATE reservation SET date = $1, party_count = $2, customer_id = $3, restaurant_id = $4 WHERE id = $5", [ date, numParty, customerID, restaurantID, id]);
  res.json(data.rows);

});


   
app.listen(port, () => {
      console.log(`Server running on port ${port}.`);
      client.connect();
});