import { db } from "../utils/db.server";
import type { Author } from "./author.service";

type Book = {
    id:number
    title: string;
    isFiction: boolean;
    datePublished: Date;
    author: Author,
    authorId:number
}

type BookCreate = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
    authorId: number
}

export const allBooks = async () : Promise <Book[]> => {
    return db.book.findMany({
        select:{
            id:true,
            title:true,
            isFiction:true,
            datePublished:true,
            authorId:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true
                }
            }
        }
    })
}

export const getBook = async (id: number) : Promise <Book | null> => {
    return db.book.findUnique({
        where:{
            id
        },
        select:{
            id:true,
            title:true,
            isFiction:true,
            datePublished:true,
            authorId:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true
                }
            }
        }
    })
}


export const createBook = async (book: BookCreate) :Promise <BookCreate> => {
    const {title, datePublished, isFiction, authorId} = book;
    const parseDate : Date = new Date(datePublished);
    return db.book.create({
        data:{
            title,
            datePublished: parseDate,
            isFiction,
            authorId
        },
        select:{
            id:true,
            title:true,
            isFiction:true,
            datePublished:true,
            authorId:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true
                }
            }
        }

    })
}


export const updateBook = async (id: number, book: Book) : Promise <Book> =>{
    const {title, isFiction, datePublished,authorId} = book;
    return db.book.update({
        where:{
            id
        },
        data:{
            authorId,
            title,
            isFiction,
            datePublished
        },
        select:{
            id:true,
            title:true,
            isFiction:true,
            datePublished:true,
            authorId:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true
                }
            }
        }
    })
}

export const deleteBook = async (id:number): Promise <void> => {
    await db.book.delete({
        where:{
            id
        }
    })
}

