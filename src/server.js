const cluster = require('cluster');
const os = require('os');
const app = require('./app');
const mongoose = require('mongoose');
const {PORT,MONGODB_URI} = require("./Config/config")

if(cluster.isPrimary){
    const cpus = os.cpus().length;

    for(let i=0; i<cpus;i++){
        cluster.fork();
    }
    cluster.on("exit",(worker,code,signal)=>{
       console.log(`Worker ${worker.process.pid} died (${signal || code }). Restarting... `) 
    })
}else {
    mongoose.connect(MONGODB_URI).then(()=>{
        console.log(`Worker process ${process.pid} connected to MongoDB`);
        app.listen(PORT,()=>{
            console.log(`Worker ${process.pid}: Server running on port ${PORT}`);
        })
    })
}