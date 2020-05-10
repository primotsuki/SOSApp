import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MantenimientoService {
    constructor(private db: DBService){}
    async getMantenimiento(id: number) {
        const sql = `SELECT * FROM suministros WHERE id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items: any = {};
        if(res.rows.length >0){
            return res.rows.item(0);
        }
        return items;
    }
}