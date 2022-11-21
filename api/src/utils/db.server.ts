import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

//definimos nnuestro prismaClient global para tener solo una conexion a nuestra db:
declare global {
    var __db: PrismaClient | undefined;
}

//si no existe lo volvemos a crear:
if (!global.__db) {
    global.__db = new PrismaClient();
}


db = global.__db;

//exportamos:
export { db };