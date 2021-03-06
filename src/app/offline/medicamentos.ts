import { DBService } from './db.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MedicamentosService {
    constructor (private db: DBService){}
    async getAll() {
        const sql = 'SELECT * FROM medicamentos';
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
    async saveData(medicamentos: any[]) {
        for(var i=0; i<medicamentos.length;i++){
            let data =[medicamentos[i].id,medicamentos[i].descripcion]
            const sql = `INSERT OR REPLACE INTO medicamentos (id, descripcion) values (?,?)`;
            return this.db.executeSQL(sql,data);
        }
    }
}