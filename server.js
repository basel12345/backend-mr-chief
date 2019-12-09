const config = require("config");
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const food = require('./router/foods');
const drinks = require("./router/drinks");
const services = require("./router/services");
const purchases = require("./router/purchases");
const table = require("./router/table");
const order = require("./router/order");
const user = require("./router/user");
const auth = require("./router/auth");
const bodyParser = require('body-parser');
const app = express();



if (!config.get("jwtPrivateKey")) {
	console.error("Fetal ERROR: jwtPrivateKey is not defined.");
	process.exit(1);
}



mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://aaxxa:aaxxa@cluster0-8f2yo.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("Connect with mongoDB with successfully"))
	.catch(err => console.log(err))





app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "assets")));
app.use("/drinks", drinks);
app.use("/food", food);
app.use("/services", services);
app.use("/purchases", purchases);
app.use("/table", table);
app.use("/order", order);
app.use("/user", user);
app.use("/auth", auth);



app.get('/', (req, res, next) => {
	res.send('hello');
})



const PORT = process.env.port || 3000;
app.listen(PORT, () => {
	console.log(`server listen on port ${PORT}`);
})