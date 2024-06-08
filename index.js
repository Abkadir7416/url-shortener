import express from 'express';
import urlRoute from './routes/url.js'
import connectToMongoDB from './models/db.js';
import URL from './models/url.js';
import path from 'path';
import staticRouter from './routes/staticRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('mongodb connected'))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// app.set('views', path.join(__dirname, 'views'));

app.use('/url', urlRoute);
app.use('/', staticRouter);

app.get('/test', async(req, res) => {
console.log("path ",path.resolve("./views"));

    const allURLs = await URL.find({});
    console.log('allURLs ', allURLs);
    return res.render('home', {
        urls: allURLs,
    })
})

app.get('/url/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    console.log('shortID ', shortId)
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            }
        }
    );
    // console.log('entry ', entry);
    console.log('maggy point')
    res.redirect(entry.redirectUrl);
})

app.listen(8000, ()=>{
    console.log('server is running on port 8000');
})