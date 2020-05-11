import { DBService } from './db.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VacunaService {
    constructor (private db: DBService){}
    async getAll() {
        const sql = 'SELECT * FROM vacunas';
        const res = await this.db.executeSQL(sql);
        let items: any[] = [];
        if(res.rows.length >0){
            for (var i=0; i<res.rows.length;i++){
                items.push({
                    id: res.rows.item(i).id,
                    descripcion: res.rows.item(i).descripcion
                })
            }
        }
        return items;
    }
    async saveData(vacunas: any[]) {
        for(var i=0; i<vacunas.length;i++){
            let data =[vacunas[i].id,vacunas[i].descripcion]
            const sql = `INSERT OR REPLACE INTO vacunas (id, descripcion) values (?,?)`;
            return this.db.executeSQL(sql,data);
        }
    }
}