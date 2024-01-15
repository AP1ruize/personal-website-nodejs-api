
const express =require("express")
const cors=require("cors")
const mongoose=require("mongoose")


const gallery =require("./api/v1/routes/gallery")
const notes =require("./api/v1/routes/notes")


const galleryV2 =require("./api/v2/routes/gallery")
const userRoutes =require("./api/v2/routes/user")
const codeRoutes=require("./api/v2/routes/inviteCode")


const uri = 'mongodburi'
mongoose.connect(uri);

const app = express();
app.use(cors());
app.use('/uploadsPics', express.static('uploadsPics'));
app.use(express.urlencoded());
app.use(express.json());



app.use("/api/v1/gallery", gallery);
app.use("/api/v1/notes", notes);

app.use("/api/v2/gallery", galleryV2);
app.use("/api/v2/user", userRoutes);
app.use("/api/v2/inviteCode", codeRoutes);

// handle unexisted routes
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status(404);
    next(error);  // froward the error request
});

//handle all kinds of errors in the app
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

// export default app;
module.exports=app;