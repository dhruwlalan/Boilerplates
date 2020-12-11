require('dotenv').config();
const app = require('./app.js');

///Start Server///
app.listen(process.env.PORT || 8000, () => {
   console.log('Server is listening on port 8000..');
});
