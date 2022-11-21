import { Router, Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import * as BookService from '../controllers/book.service';


const bookRouter = Router();

bookRouter.get('/', async (req: Request, res: Response) => {
    try {
        const books = await BookService.allBooks()
        return res.status(200).json({ data: books })
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
})

bookRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const bookId = await BookService.getBook(id)
        if (bookId) {
            return res.status(200).json({ data: bookId })
        }
        return res.status(404).json({ message: 'not found book at ID' })
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
})

bookRouter.post('/',
    body('title').isString(),
    body('authorId').isInt(),
    body('isFiction').isBoolean(),
    body('datePublished').isDate().toDate(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
        const book = req.body
        try {
            const newBook = await BookService.createBook(book)
            return res.status(200).json({data: newBook})
        } catch (error:any) {
        return res.status(500).json({ error: error.message })
        }
    })

bookRouter.put('/:id', 
    body('title').isString(),
    body('authorId').isInt(),
    body('isFiction').isBoolean(),
    body('datePublished').isDate().toDate(),
    async(req:Request, res:Response) => {
        const id = parseInt(req.params.id, 10)
        const book = req.body;
        try {
            const updateBook = await BookService.updateBook(id, book)
            return res.status(200).json({data:updateBook})
        } catch (error:any) {
        return res.status(500).json({ error: error.message })
        } 
    })

bookRouter.delete('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        await BookService.deleteBook(id);
        return res.status(200).json({ message: 'eliminado correctamente!' })
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
})


export default bookRouter;
