var express = require('express');
var router = express.Router();
var dl = require('dongnelibrary');

/* GET books listing. */
router.get('/search', function (req, res, next) {
  var title = 'javascript';
  var libraryName = '남양도서관';

  if (req.query.title) {
    title = req.query.title
  }

  if (req.query.libraryName) {
    libraryName = req.query.libraryName
  }

  dl.search({
    title: title,
    libraryName: libraryName
  }, function (err, book) {
    var libraryData = {
      libraryName: libraryName,
      books: []
    };
    if (!err) {
      book.booklist.forEach(function (book) {
        libraryData.books.push({
          title: book.title,
          exist: book.exist
        })
      });
    }
    res.json(libraryData);
  });
});

router.get('/libraryNames', function(req, res, next) {
  res.json(dl.getLibraryNames());
});

module.exports = router;
