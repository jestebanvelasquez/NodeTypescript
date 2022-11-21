import {Router, Request, Response} from 'express';
import {body, validationResult} from 'express-validator'; 
import * as AuthorService from '../controllers/author.service'

const authorRoute = Router()

authorRoute.get('/', async (req:Request, res:Response) =>{
        try {
            const authors = await AuthorService.allAuthors()
            return res.status(200).json({data:authors})
        } catch (error:any) {
            return res.status(500).json({error:error.message})
        }
})

authorRoute.get('/:id', async (req:Request, res:Response) => {
        const id: number = parseInt(req.params.id, 10)
    try {
        const authorId = await AuthorService.idAuthor(id);
        if(authorId){
            return res.status(200).json({data:authorId})
        }
        return res.status(404).json({message: 'author not found'})
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
})

authorRoute.post('/', body('firstName').isString(), body('lastName').isString(), async (req:Request, res:Response) => {
    const errors = validationResult(req);
    //validamos si errors no esta vacio:
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    try {
        const author = req.body
        const newAuthor = await AuthorService.createAuthor(author)
        return res.status(200).json({data:newAuthor})
    } catch (error:any) {
        return res.status(200).json({error:error.message})
    }
})

authorRoute.put('/:id', body('firstName').isString(), body('lastName').isString(), async (req:Request, res:Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty) return res.status(400).json({errors: errors.array()})
    try {
        const id = parseInt(req.params.id, 10)
        const author = req.body
        const updateAuthor = await AuthorService.updateAuthor(author, id)
        return res.status(200).json({data:updateAuthor})
    } catch (error:any) {
        return res.status(500).json({error: error.message})
    }
})


authorRoute.delete('/:id', async (req:Request, res:Response) => {
    const id:number = parseInt(req.params.id, 10);
    try {
        await AuthorService.deleteAuthor(id)
        return res.status(200).json({message: 'Author ha sido eliminado correctamente'})
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
} )

export default authorRoute;