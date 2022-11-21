//cargar datos default a nuestra db y definir sus tipos:
// @ts-nocheck
import { db } from "../src/utils/db.server";

type Author = {
    firstName: string;
    lastName: string;
};

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
};


//creamos los datos en la bd:
async function  seed() {
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data:{
                    firstName: author.firstName,
                    lastName: author.lastName
                }
            })
        })
    );

    const author = await db.author.findFirst({
        where:{
            firstName: 'Mariana'
        }
    });

    await Promise.all(
        getBooks().map((book) => {
            const {title, isFiction, datePublished} = book
            return db.book.create({
                data:{
                    title,
                    isFiction,
                    datePublished,
                    authorId: author?.id 
                }
            })
        })
    )
}

seed();

function getAuthors() : Array<Author> {
    return [
        {
            firstName: 'John',
            lastName:'Velasuez'
        },
        {
            firstName: 'Mariana',
            lastName:'Perez'
        },
        {
            firstName: 'Miguel',
            lastName:'Cervantez'
        }
    ]
}

function getBooks(): Array<Book> {
    return[
        {
            title:'nueva era',
            isFiction: true,
            datePublished: new Date()
        },
        {
            title:'La Paradoja',
            isFiction: true,
            datePublished: new Date()
        },
        {
            title:'Geometria',
            isFiction: false,
            datePublished: new Date()
        }
    ]
}


