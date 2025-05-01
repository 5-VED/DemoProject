const os = require('os');
const app = require('./app');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI } = require("./Config/config")

mongoose.connect(MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid}: Server running on port ${PORT}`);
    })
})
