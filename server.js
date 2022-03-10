const app = require('./app');
<<<<<<< HEAD


const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Listening on port ${port}...`));
=======
const {dataCategories}  = require('./api/Categories');
const port = process.env.PORT || 3000;

>>>>>>> main


app.listen(port, () => {
dataCategories();
console.log(`Listening on port ${port}...`);
})
