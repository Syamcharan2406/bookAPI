const express = require('express')
const database = require('./database/data')


const codex = express()


codex.use(express.json())

/* 
Route           /books
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
codex.get('/books',(req,res)=>{
    return res.json({ books : database.books})
})

/* 
Route           /books
Description     get specfic book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
codex.get('/books/:isbn',(req,res)=>{
    let getSpecificBook = database.books.filter((book)=>
        book.ISBN === req.params.isbn
    )
    
    if (getSpecificBook.length === 0 ){
        return res.status(404).json({error : `no book found for ISBN of ${req.params.isbn}`})
    }
   
    return res.status(200).json({ book : getSpecificBook})
})

/* 
Route           /books/category/
Description     get specfic book based on category
Access          PUBLIC
Parameters      category
Method          GET
*/
codex.get('/books/category/:category',(req,res)=>{
    let getSpecificBooks = database.books.filter((book)=>
        book.category.includes(req.params.category)
    )
    
    if (getSpecificBooks.length === 0 ){
        return res.status(404).json({error : `no book found in category of ${req.params.category}`})
    }
   
    return res.status(200).json({ book : getSpecificBooks})
})

/* 
Route           /books/authors/
Description     get specific books based on author
Access          PUBLIC
Parameters      author
Method          GET
*/
codex.get('/books/author/:author', (req, res) => {
    const getAuthorId = database.authors.filter(author => author.name === req.params.author)
                                       .map(author => author.id);

    

    // Handle the case when no author is found
    if (getAuthorId.length === 0) {
        return res.status(404).json({ error: `No author found with the name ${req.params.author}` });
    }

    // Now you have the author ID(s), you can use this information as needed.
    // For example, you can find books with this author ID.
    const getSpecificBooks = database.books.filter(book => book.Authors.includes(...getAuthorId));

    return res.status(200).json({ books: getSpecificBooks });
});



/* 
Route           /author
Description     get books based on authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
codex.get('/author',(req,res)=>{
    return res.status(200).json({ authors : database.authors})
})


/* 
Route           /author
Description     get list of author based on a book's isbn
Access          PUBLIC
Parameters      isbn 
Method          GET
*/
codex.get('/author/:isbn',(req,res)=>{
    let getSpecificAuthors = database.authors.filter((author)=>
        author.books.includes(req.params.isbn)
    )
    
    if (getSpecificAuthors.length === 0 ){
        return res.status(404).json({error : `no author found for book's isbn ${req.params.isbn}`})
    }
   
    return res.status(200).json({ author : getSpecificAuthors})
})

/* 
Route           /author/is
Description     get specifc author
Access          PUBLIC
Parameters      name
Method          GET
*/
codex.get('/author/is/:name',(req,res)=>{
    let getSpecificAuthor = database.authors.filter((author)=>
        author.name.includes(req.params.name)
    )
    
    if (getSpecificAuthor.length === 0 ){
        return res.status(404).json({error : `no author found in the name of ${req.params.name}`})
    }
   
    return res.status(200).json({ authorDetails : getSpecificAuthor})
})

/* 
Route           /publication
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
codex.get('/publication',(req,res)=>{
    return res.status(200).json({ publications : database.publications})
})

/* 
Route           /publication
Description     get specific publications
Access          PUBLIC
Parameters      name
Method          GET
*/
codex.get('/publication/:name',(req,res)=>{
    let getSpecificPublication = database.publications.filter((publication)=>
        publication.name.includes(req.params.name)
    )
    
    if (getSpecificPublication.length === 0 ){
        return res.status(404).json({error : `no author found in the name of ${req.params.name}`})
    }
   
    return res.status(200).json({ publication : getSpecificPublication})
})

/* 
Route           /publication/isbn
Description     get publication based on book
Access          PUBLIC
Parameters      isbn
Method          GET
*/
codex.get('/publication/isbn/:isbn', (req, res) => {
    const getPublicationId = database.books.filter(book => book.ISBN === req.params.isbn)
                                       .map(book => book.publication);

    

    // Handle the case when no publication is found
    if (getPublicationId.length === 0) {
        return res.status(404).json({ error: `No publication found for book ISBN ${req.params.isbn}` });
    }

    // Now you have the publication ID(s), you can use this information as needed.
    // For example, you can find publications with this publication ID.
    const getSpecificPublications = database.publications.filter(publication => getPublicationId.includes(publication.id));

    return res.status(200).json({ publisher: getSpecificPublications });
});

/* 
Route           /addbook
Description     adding new book
Access          PUBLIC
Parameters      NONE
Method          POST
*/
codex.post('/addbook',(req,res)=>{
    const { newBook } = req.body
    database.books.push(newBook)
    return res.json({ books : database.books , message : "book was added"})
})

/* 
Route           /addauthor
Description     adding new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
codex.post('/addauthor',(req,res)=>{
    const { newAuthor } = req.body
    database.authors.push(newAuthor)
    return res.json({ authors : database.authors , message : "author was added"})
})

/* 
Route           /addpublication
Description     adding new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/
codex.post('/addpublication',(req,res)=>{
    const { newPublication } = req.body
    database.publications.push(newPublication)
    return res.json({ Publication : database.publications , message : "publication was added"})
})

/* 
Route           /book/update/
Description     update title
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
codex.put('/book/update/:isbn',(req,res)=>{
    database.books.forEach((book)=>{
       if(book.ISBN === req.params.isbn  ) {
        book.Title = req.body.bookTitle
        return
       }
    })

    return res.json({books : database.books})
})

/* 
Route           /book/author/update/
Description     update author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
codex.put('/book/author/update/:isbn', (req, res) => {

    //update the book database
    database.books.forEach((book) => {

        if (book.ISBN  === req.params.isbn)
            return book.authors.push(req.body.newAuthor)
    })

    // update the author database 
    database.authors.forEach((author) => {
        if (author.id === req.body.newAuthor) 
            return author.books.push(req.params.isbn)
    })

    return res.json({
        books : database.books,
        authors : database.authors,
        message : `books and authors got update`
    })
})

/* 
Route           /author/update/
Description     update name
Access          PUBLIC
Parameters      id
Method          PUT
*/
codex.put('/author/update/:id',(req,res)=>{
    database.authors.forEach((author)=>{
       if(author.id === Number(req.params.id) ) {
        author.name = req.body.authorName
        return
       }
      
    })
   
    return res.json({authors : database.authors})
})

/* 
Route           /publication/update/
Description     update name
Access          PUBLIC
Parameters      id
Method          PUT
*/
codex.put('/publication/update/:id',(req,res)=>{
    database.publications.forEach((publication)=>{
       if(publication.id === Number(req.params.id) ) {
        publication.name = req.body.publicationName
        return
       }
      
    })
   
    return res.json({publications : database.publications})
})

/* 
Route           /publication/update/book/
Description     update book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
codex.put('/publication/update/book/:isbn', (req, res) => {

    //update the publication database
    database.publications.forEach((publication) => {
        if (publication.id  === req.body.pubId){
            return publication.books.push(req.params.isbn)
        }
    })

    //update the book database
    database.books.forEach((book) => {

        if (book.ISBN  === req.params.isbn){
            book.publication = req.body.pubId
            return
        }
    })
    
    return res.json({
        books : database.books,
        publications : database.publications,
        message : `books and publications got update`
    })
})

codex.listen(3000, ()=>{
    console.log('server is running.....')
})