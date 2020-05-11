import { DBService } from './db.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NumericoService {
    constructor (private db: DBService){}
    async getAll() {
        const sql = 'SELECT * FROM test_numericos';
        const result = await this.db.executeSQL(sql);
        return result.rows;
    }
    async saveData(diagnosticos: any[]) {
        for(var i=0; i<diagnosticos.length;i++){
            let data =[diagnosticos[i].id,diagnosticos[i].descripcion]
            const sql = `INSERT OR REPLACE INTO test_numericos (id, descripcion) values (?,?)`;
            return this.db.executeSQL(sql,data);
        }
    }
}