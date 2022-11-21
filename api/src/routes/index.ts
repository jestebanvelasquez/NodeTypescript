import {Router, Request, Response} from 'express';
import {body, validationResult} from 'express-validator'; 
import * as AuthorService from '../controllers/author.service'
import author from './author.routes';
import bookRouter from './book.routes';

const router = Router()

router.use('/author', author );
router.use('/book', bookRouter );



export default router;