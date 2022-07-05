const Genre = require("../models/genre");
var Book = require("../models/book");
var async = require("async");
const { body, validationResult } = require("express-validator");

exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_genres) {
      if (err) {
        return next(err);
      }

      res.render("genre_list", {
        title: "Genre List",
        genre_list: list_genres,
      });
    });
};

exports.genre_detail = (req, res) => {
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_books: function (callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      if (results.genre == null) {
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }

      res.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

exports.genre_create_get = (req, res) => {
  res.render("genre_form", { title: "Create Genre", genre: undefined, errors: undefined });
};

exports.genre_create_post = [
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      Genre.findOne({ name: req.body.name }).exec(function (err, found_genre) {
        if (err) {
          return next(err);
        }

        if (found_genre) {
          res.redirect(found_genre.url);
        } else {
          genre.save(function (err) {
            if (err) return next(err);
            res.redirect(genre.url);
          });
        }
      });
    }
  },
];

exports.genre_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: genre delete GET");
};

exports.genre_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: genre delete POST");
};

exports.genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: genre update GET");
};

exports.genre_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: genre update POST");
};
