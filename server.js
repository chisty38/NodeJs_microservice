// Create a new SenecaJS application
var seneca = require('seneca')();

seneca  
  .use('basic')
  .use('entity')
  .use('mongo-store', {
    uri: 'mongodb://localhost/test'
});
  
//Function to add product in Mongo db Product Collection
seneca.add({"role": "product", "cmd": "create"}, (args, done) => {  
  var product = seneca.make$("Product");
  product.name = args.name;
  product.description = args.description;
  product.price = args.price;
  product.save$((err, savedProduct) => {
    done(err, savedProduct);
    console.log("Product Inserted -- product Id = " + savedProduct.id);
  });
});

//Function to remove product from Mongo db Product Collection
seneca.add({"role": "product", "cmd": "remove"}, (args, done) => {  
  var product = seneca.make$("Product");
  
  product.remove$({id: args.id}, (err, savedProduct) => {
    done(err, savedProduct);
  });
});

//Function to Update product  based on product ID
seneca.add({"role": "product", "cmd": "update"}, (args, done) => {  
  var product = seneca.make$("Product");
  product.name = args.name;
  product.description = args.description;
  product.price = args.price;
  product.save$({id: args.id}, (err, savedProduct) => {
    done(err, savedProduct);
  });
});

//Function to display product db Product Collection based on product name
seneca.add({"role": "product", "cmd": "display"}, (args, done) => {  
  var product = seneca.make$("Product");
  
  product.list$({name: args.name}, (err, savedProduct) => {
    console.log("List of Product => ");
    done(err, savedProduct);
  });
});


//add product into mongodb database
seneca.act({"role":"product","cmd":"create","name":"Star Treck Jacket","price":600.00,"description":"Cool!"}, 
seneca.util.print);
seneca.act({"role":"product","cmd":"create","name":"Star War Jacket","price":200.00,"description":"Black color!"}, 
seneca.util.print);

//display product by its property-- name
seneca.act({"role":"product","cmd":"display","name":"Marvel Jacket"}, 
seneca.util.print);

//remove product from database based on ID
seneca.act({"role":"product","cmd":"remove","id":"5cb265b68be72f257801acb2"}, 
seneca.util.print);


// Update product base on product ID
seneca.act({"role":"product","cmd":"update","id":"5cb27aa20a803f1874cf1f3d","name":"Marvel Jacket","price":250.00,"description":" Jacket with Marvel logo!"}, 
seneca.util.print);

