import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`https://api.quotable.io/quotes/random?limit=50`);
    console.log(response);
    const result = response.data;
    res.render("index.ejs", 
    { 
      firstquote: response.data[Math.floor(Math.random() * result.length)],
      secondquote: response.data[Math.floor(Math.random() * result.length)],
      thirdquote: response.data[Math.floor(Math.random() * result.length)]

    });
    // console.log(result, response.data[0].content);
  } catch (error) {
    console.error("No activities that match your criteria.", error.message);
    // res.status(500).json({ message: "Error fetching quotes"
    // });
  }
});

app.post("/fetch", async (req, res) => {
  try {
    const response = await axios.get(`https://api.quotable.io/quotes/random?limit=50`);
    const result = response.data;
    const resultQuote = response.data[Math.floor(Math.random() * result.length)];
    res.render("index.ejs", 
    { 
      firstquote: response.data[Math.floor(Math.random() * result.length)],
      secondquote: response.data[Math.floor(Math.random() * result.length)],
      thirdquote: response.data[Math.floor(Math.random() * result.length)],
      tags:resultQuote.tags,
      content: resultQuote.content,
      author:resultQuote.author
    });
    // console.log(result, response.data[0].content);
  } catch (error) {
    console.error("No activities that match your criteria.", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

  app.post("/search", async (req, res) => {
    // console.log(req.body.search);
    try {
      const response = await axios.get(`https://api.quotable.io/search/quotes?query=${req.body.search}`);
      // const response = await axios.get(`https://api.quotable.io/search/quotes?query=life happiness`);
      const result = response.data;
      const resultQuote = response.data.results[Math.floor(Math.random() * result.results.length)];
      res.render("index.ejs", 
      { 
        firstquote: response.data.results[Math.floor(Math.random() * result.results.length)],
        secondquote: response.data.results[Math.floor(Math.random() * result.results.length)],
        thirdquote: response.data.results[Math.floor(Math.random() * result.results.length)],
        tags: resultQuote.tags,
        content: resultQuote.content,
        author: resultQuote.author
      });

   
    // console.log(result);
  } catch (error) {
    const response = await axios.get(`https://api.quotable.io/quotes/random?limit=3`);
    const result = response.data;
    console.error("No quotes that match your criteria.", error.message);
    res.render("index.ejs", {
      firstquote: response.data[Math.floor(Math.random() * result.length)],
      secondquote: response.data[Math.floor(Math.random() * result.length)],
      thirdquote: response.data[Math.floor(Math.random() * result.length)],
      error: "No quotes that match your criteria.",
    });
    }
  });

app.post("/refresh", (req, res) => {
    res.redirect("/");
  });

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });