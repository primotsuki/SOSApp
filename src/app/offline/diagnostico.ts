import { DBService } from './db.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DiagnosticoService {
    constructor (private db: DBService){}
    async getAll() {
        const sql = 'SELECT * FROM test_diagnosticos';
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
    async saveData(diagnosticos: any[]) {
        for(var i=0; i<diagnosticos.length;i++){
            let data =[diagnosticos[i].id,diagnosticos[i].descripcion]
            const sql = `INSERT OR REPLACE INTO test_diagnosticos (id, descripcion) values (?,?)`;
            return this.db.executeSQL(sql,data);
        }
    }
}