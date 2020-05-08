import { DBService } from './db.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MedicamentosService {
    constructor (private db: DBService){}
    async getAll() {
        const sql = 'SELECT * FROM medicamentos';
        const result = await this.db.executeSQL(sql);
        return result.rows;
    }
    
}