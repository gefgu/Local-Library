const Book = require("../models/book");

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

exports.book_list = (req, res) => {
  res.send("NOT IMPLEMENTED: book list");
};

exports.book_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: book detail: ${req.params.id}`);
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
