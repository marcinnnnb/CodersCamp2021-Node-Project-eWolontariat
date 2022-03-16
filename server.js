const app = require('./app');
const { dataCategories } = require('./api/Categories');
const port = process.env.PORT || 3000;

app.listen(port, () => {
//dataCategories();
console.log(`Listening on port ${port}...`);
})
