import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';
 
@Injectable({
    providedIn: 'root'
})
export class AlergiaService {
    constructor(private db: DBService){}

    async getAll(id: number) {
        const sql = `SELECT * FROM alergia where mascota_id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] =[];
        if(res.rows.length >0){
            for(var i=0; i < res.rows.length;i++) {
                items.push(res.rows.item(i))
            }
        }
        return items;
    }
    async newAlergia(alergia:any){
        const data =[alergia.nombre, alergia.gravedad, alergia.categoria, alergia.notas,alergia.fecha_diagnostico,
                    alergia.mascota_id,alergia.submitted];
        const sql = 'INSERT INTO alergia (nombre, gravedad, categoria, notas, fecha_diagnostico,mascota_id, submitted) values (?,?,?,?,?,?,?)';
        return this.db.executeSQL(sql,data);
    }
}