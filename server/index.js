const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const  fileupload = require('express-fileupload')
const cors = require('cors');
const fileUpload = require('express-fileupload');
var app = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
); // support encoded bodies
app.use(express.static("public"));
app.use(fileUpload());
app.use(cors()); //lintas antar port front and back
// app.use(cors);
const port = 5000;

app.get('/', (req, res) => {
	res.send('Hello Express !');
});


require('./router/productRouter')(app);
require('./router/photorouter')(app);

//listen to defined port
app.listen(port, () => console.log('App listening at http://', port));
