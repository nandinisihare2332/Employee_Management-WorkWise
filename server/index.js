require("dotenv").config({
    path:'.env'
})
const cors = require("cors");
const app = require("./src/app");
const {ConnectDB}=require("./src/config/db.config");
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
ConnectDB()
const port = process.env.PORT || 4500
app.listen(port,()=>{
    console.log(`the app is listen at http://localhost:${port}`);
});

