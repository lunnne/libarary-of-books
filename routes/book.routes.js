const router = require('express').Router();
const Book = require('../models/Book.model');


router.get('/', (req, res)=> {
  Book.find().then(allBooks => {
    res.render('books/books-list', {books: allBooks})
  }).catch(err => {console.log(err)})
});

router.get('/create', (req, res) => {
  res.render('books/books-create')
})

router.post('/create', (req, res) => {
  const { title , description, author, rating } = req.body;
  Book.create({title , description, author, rating})
    .then((createdBook => {
      console.log(`Book created: ${createdBook}`);
      res.redirect('/books')
    }))
    .catch(err => {console.log(err)})
  })    
  
router.get('/:bookId', (req, res)=> {
  const { bookId } = req.params;
  Book.findById(bookId)
    .then((book) => {
      res.render('books/books-details', { book })
    })  
    .catch(err => {console.log(err)})
})    
  
router.get('/:bookId/edit', (req, res)=> {
  const { bookId } = req.params;
  Book.findById(bookId)
    .then((book) => {
      res.render('books/books-edit', { book })
    })  
    .catch(err => {console.log(err)})
})    

router.post('/:bookId/edit', (req, res)=> {
  const { bookId } = req.params;
  const { title , description, author, rating } = req.body;
  Book.findByIdAndUpdate(bookId, { title , description, author, rating }
    ,{new: true})
  .then((editedBook) => {
    res.redirect(`/books/${editedBook._id}`)
  })  
    .catch(err => {console.log(err)})
})    

router.post('/:bookId/delete', (req, res)=> {
  const { bookId } = req.params;
  const { title , description, author, rating } = req.body;
  Book.findByIdAndDelete(bookId)
  .then(() => {
    res.redirect("/books")
  })  
  .catch(err => {console.log(err)})
})    




module.exports = router;
