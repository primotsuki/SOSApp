import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';
import { HashLocationStrategy } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TipoMascotaService {
    constructor(private db: DBService){}

    async getAll() {
        const sql = 'SELECT * FROM tipo_mascota';
        const res = await this.db.executeSQL(sql);
        let items: any[] = [];
        console.log('se ejecuto el query');
        console.log(res.rows);
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
    async saveData(tipos: any[]) {
        for(var i=0; i<tipos.length;i++){
            let data =[tipos[i].id,tipos[i].descripcion]
            const sql = `INSERT OR REPLACE INTO tipo_mascota (id, descripcion) values (?,?)`;
            return this.db.executeSQL(sql,data);
        }
    }
}