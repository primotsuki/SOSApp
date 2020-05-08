import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';
 
@Injectable({
    providedIn: 'root'
})
export class CirugiaService {
    constructor(private db: DBService){}
    async getAll(id: number) {
        const sql = `SELECT * FROM cirugia where mascota_id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] =[];
        if(res.rows.length >0){
            for(var i=0; i < res.rows.length;i++) {
                items.push(res.rows.item(i))
            }
        }
        return items;
    }
    async newCirugia(cirugia: any) {
        const data =[cirugia.tipo_cirugia, cirugia.fecha, cirugia.nombre, cirugia.precio,
                    cirugia.observaciones, cirugia.notas, cirugia.mascota_id, cirugia.submitted]
        const sql = 'INSERT INTO alergia (tipo_cirugia,fecha,nombre,precio,observaciones,notas,mascota_id,submitted) values(?,?,?,?,?,?,?,?)';
        return this.db.executeSQL(sql, data);
    }
}