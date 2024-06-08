import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShortUrl (req, res) {
  const body = req.body;
  console.log('body ', body);
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = nanoid(8);
  console.log("shortID ", shortID);
   const entry = await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  // console.log('entry ', entry)
  return res.render('home', {
    id: shortID
  })
  // return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  console.log('result ', result)
  console.log('end')
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  })
}

export  { handleGenerateNewShortUrl, handleGetAnalytics };
