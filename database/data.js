const books =[
    {
        ISBN : '12345ONE',
        Title : 'Life',
        Authors : [1,3],
        Languages : 'Tel',
        pubDate : '2023-06-24',
        numOfPages : 500,
        category : ['adventures', 'programming', 'web dev', 'fiction'],
        publication : 1
    },
    {
        ISBN : '12345TWO',
        Title : 'Life after schooling',
        Authors : [1,2,3],
        Languages : 'Tel',
        pubDate : '2023-06-24',
        numOfPages : 50,
        category: ['adventures', 'thriller', 'real',],
        publication : 2
    },
]

const authors = [
    {
        id : 1,
        name : 'syam',
        books : ['12345ONE','12345TWO']
    },
    {
        id : 2,
        name : 'charan',
        books : ['12345ONE']
    },
    {
        id : 3,
        name : 'rsc',
        books : ['12345ONE']
    },
]


const publications = [
    {
        id : 1,
        name : 'chakra',
        books : ['12345ONE']
    },
    {
        id : 2,
        name : 'galaxy',
        books : ['12345TWO']
    },
]

module.exports = {books, authors, publications}