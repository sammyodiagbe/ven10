require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

// routes
const productRoutes = require("./routes/product_routes");

// configuring cors from cross origin
var whitelist = ["https://ven10-assesment.herokuapp.com", ""];
var corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
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
