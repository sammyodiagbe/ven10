require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

// routes
const productRoutes = require("./routes/product_routes");

// configuring cors from cross origin
const corsOptions = {
    origin: "https://ven10-assesment.herokuapp.com" // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", ["https://ven10-assesment.herokuapp.com"]);

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use("/api/v1", productRoutes);

// connect to mongodb database
require("./utils/database_connection")
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Something broke ${err}`);
    });
