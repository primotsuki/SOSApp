import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';
 
@Injectable({
    providedIn: 'root'
})
export class pruebaService {
    constructor(private db: DBService){}
    async getAll(id: number) {
        const sql = `SELECT * FROM prueba_diagnosticos where mascota_id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] =[];
        if(res.rows.length >0){
            for(var i=0; i < res.rows.length;i++) {
                items.push(res.rows.item(i))
            }
        }
        return items;
    }
    async newprueba(prueba: any) {
        const data =[prueba.descripcion, prueba.notas, prueba.fecha_prueba,
                    prueba.mascota_id, prueba.submitted, new Date(), new Date()]
        const sql = 'INSERT INTO prueba_diagnosticos (descripcion,notas,fecha_prueba,mascota_id,submitted, created_at, updated_at) values(?,?,?,?,?,?,?)';
        return this.db.executeSQL(sql, data);
    }
}