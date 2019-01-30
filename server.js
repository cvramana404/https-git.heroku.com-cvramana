const exp=require('express');
const app=exp();
const path=require('path');
const http=require('http');

const bodyparser=require ('body-parser');

const api=require('./server/route/api');
//parsers for post data
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
//point static path to dist
app.use(exp.static(path.join(__dirname,'dist/noticeboard')));
//set our api routes
app.use('/api',api);
//catch all other routes and return the index file
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/noticeboard/index.html'));
});
/**
 * get port from environment and store in express
 */
const port=process.env.PORT||'3000';
app.set ('port',port);
/**
 * create http server
 */
const server=http.createServer(app);
/**
 * listen on provided port, on all network interfaces
 */
server.listen(port,()=>{console.log('API running on local host:${port}')});









// app.listen(process.env.PORT||8080,()=>{
//     console.log('server started');
// })


