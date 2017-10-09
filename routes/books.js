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
  }, function (err, data) {
    var libraryData = {
      libraryName: libraryName,
      books: []
    };
    if (err) {
      res.json({
        err: '서버 접속에 실패했습니다.',
        libraryName: libraryName,
        books: []
      });
    } else {
      data.booklist.forEach(function (book) {
        libraryData.books.push({
          title: book.title,
          exist: book.exist
        })
      });
      res.json(libraryData);
    }
  });
});

/* GET libraryName listing. */
router.get('/libraryNames', function (req, res, next) {
  res.json(dl.getLibraryNames());
});

module.exports = router;
