const express = require("express");
const Author = require("../models/author");
const router = express.Router();

//all authors route
router.get("/", async (req, res) => {
  let searchOption = {};
  if(req.query.name !== null && req.query.name !=='')
  {
    searchOption.name = RegExp(req.query.name, 'i') //regular expression to get result even we only type in a part of author, i means insensitive
  }
    try{
        const allAuthor = await Author.find(searchOption)
        res.render("authors/index", {
          authors: allAuthor,
          searchOption: req.query //response to user the result
        });
    }
    catch{
        res.redirect('/')
    }
});

//new author route
router.get("/new",  (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//create author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    //res.redirect(`authors/${newAuthor.id}`) //redirect to the new author
    res.redirect(`authors`)
  } catch {
    res.render("authors/new", {
      author: author, //keep the name that user typed in
      errorMessage: `Error creating author ${author.name}`,
    });
  }

});

module.exports = router;
