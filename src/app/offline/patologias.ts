import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';
 
@Injectable({
    providedIn: 'root'
})
export class PatologiaService {
    constructor(private db: DBService){}
    async getAll(id: number) {
        const sql = `SELECT * FROM patologia where mascota_id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] =[];
        if(res.rows.length >0){
            for(var i=0; i < res.rows.length;i++) {
                items.push(res.rows.item(i))
            }
        }
        return items;
    }
    async newpatologia(patologia: any) {
        const data =[patologia.nombre, patologia.gravedad, patologia.acciones, patologia.notas,
                    patologia.fecha, patologia.mascota_id, patologia.submitted]
        const sql = 'INSERT INTO patologia (nombre,gravedad,acciones,notas,fecha,mascota_id,submitted) values(?,?,?,?,?,?,?)';
        return this.db.executeSQL(sql, data);
    }
}