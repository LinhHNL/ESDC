// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database'); // Đường dẫn đến tệp cấu hình kết nối cơ sở dữ liệu
const session = require('express-session');
const app = express();
const exphbs  = require('express-handlebars');
const moment = require('moment');

const userRoute = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const inventoryRouter = require('./routes/inventoryRouter');
const importRouter = require('./routes/importRouter');
const exportRouter = require('./routes/exportRouter');
const reportRouter = require('./routes/reportRtouer');
const authenticateToken = require('./middleware/authenticate'); 
require('./helper/helper'); 

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  session({
    secret: 'ling', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } 
  })
);
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const setUserInforMiddleware = (req, res, next) => {

  if(req.session.Name && req.session.Image){
    res.locals.Name = req.session.Name;
    res.locals.Image = req.session.Image;
    let RoleAdmin ;
    if(req.session.Role_ID == 1){
      RoleAdmin = true;
    }else{
      RoleAdmin = false;
    }
    // console.log(RoleAdmin);
    res.locals.RoleAdmin = RoleAdmin;
  }
  next();
};
app.use(setUserInforMiddleware);
app.get('/index',authenticateToken ,(req, res) => {
  res.redirect('/inventory');
});
app.get('/',authenticateToken ,(req, res) => {
  res.redirect('/inventory');
});


app.use('/user', userRoute);
app.use('/product', productRouter); 
app.use('/categories', categoryRouter); 
app.use('/inventory', inventoryRouter); 
app.use('/import', importRouter); 
app.use('/export', exportRouter); 
app.use('/report', reportRouter); 

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
