var express = require('express');
var router = express.Router();
var dongnelibrary = require('dongnelibrary');

/* GET books listing. */
router.get('/search', function(req, res, next) {
    var title = 'javascript';
    var libraryName = '남양도서관';

    //console.log('query: '+ JSON.stringify(req.query, null, 2));

    if(req.query.title) {
      title = req.query.title
    }

    if(req.query.libraryName) {
      libraryName = req.query.libraryName
    }

    dongnelibrary.search({
        title: title,
        libraryName: libraryName
      }, function (books) {

        var libraryData = {
          libraryName: libraryName,
          books: []
        };

        books.forEach(function (book) {
            //console.log(book.title);
            libraryData.books.push({
              title: book.title,
              exist: book.exist
            })
        });

        res.json(libraryData);

    });
});

router.get('/libraryNames', function(req, res, next) {
    res.json(dongnelibrary.getLibraryNames());
});

module.exports = router;
