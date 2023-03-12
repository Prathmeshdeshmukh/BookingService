const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index') 
const db= require('./models/index')
const {PORT} = require('./config/serverconfig');
const setupAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api' , apiRoutes)

    app.listen(PORT ,()=>{
        console.log('server started on PORT' , PORT);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter : true});
        }
    } )
}

setupAndStartServer();