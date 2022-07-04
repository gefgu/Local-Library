const Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
var BookInstance = require("../models/bookinstance");

var async = require("async");

exports.index = (req, res) => {
  async.parallel(
    {
      book_count: (callback) => {
        Book.countDocuments({}, callback);
      },
      book_instance_count: (callback) => {
        BookInstance.countDocuments({}, callback);
      },
      book_instance_available_count: (callback) => {
        BookInstance.countDocuments({ status: "Available" }, callback);
      },
      author_count: (callback) => {
        Author.countDocuments({}, callback);
      },
      genre_count: (callback) => {
        Genre.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results,
      });
    }
  );
};

exports.book_list = (req, res, next) => {
  Genre.find({}, "").exec((err, list) => {
    if (err) {
      return next(err);
    }

    console.log(list[0].url);
  });

  Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec((err, list_books) => {
      if (err) {
        return next(err);
      }

      res.render("book_list", { title: "Book List", book_list: list_books });
    });
};

exports.book_detail = (req, res, next) => {
  async.parallel(
    {
      book: function (callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      book_instance: function (callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.book == null) {
        const err = new Error("Book not found");
        err.status = 404;
        return next(err);
      }

      res.render("book_detail", {
        title: results.book.title,
        book: results.book,
        book_instances: results.book_instance,
      });
    }
  );
};

exports.book_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: book create GET");
};

exports.book_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: book create POST");
};

exports.book_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: book delete GET");
};

exports.book_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: book delete POST");
};

exports.book_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: book update GET");
};

exports.book_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: book update POST");
};
