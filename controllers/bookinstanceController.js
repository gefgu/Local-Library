const { nextTick } = require("async");
const BookInstance = require("../models/bookinstance");

exports.bookinstance_list = (req, res) => {
  BookInstance.find()
    .populate("book")
    .exec(function (err, list_bookinstances) {
      if (err) {
        return nextTick(err);
      }
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: list_bookinstances,
      });
    });
};

exports.bookinstance_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: bookinstance detail: ${req.params.id}`);
};

exports.bookinstance_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: bookinstance create GET");
};

exports.bookinstance_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: bookinstance create POST");
};

exports.bookinstance_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: bookinstance delete GET");
};

exports.bookinstance_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: bookinstance delete POST");
};

exports.bookinstance_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: bookinstance update GET");
};

exports.bookinstance_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: bookinstance update POST");
};
