const DataURI = require("datauri");
const path = require("path");

const data_uri = new DataURI();

module.exports = (req) => {
    return data_uri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
};
