import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UnidadesService{
    constructor(private db: DBService){}

    async getAll(id:number) {
        const sql = `SELECT tipo_medicions.descripcion, unidad_medidas.*
        FROM tipo_medicions LEFT OUTER JOIN unidad_medidas ON tipo_medicions.id = unidad_medidas.medida_id
        WHERE unidad_medidas.medida_id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items : any ={};
        let sub_items: any[] = [];
        if(res.rows.length >0) {
            for(var i=0; i < res.rows.length;i++){
                sub_items.push({
                    id: res.rows.item(i).id,
                    unidad: res.rows.item(i).unidad
                })
            }
            items = {
                id: res.rows.item(0).medida_id,
                descripcion: res.rows.item(0).descripcion,
                unidades: sub_items
            }
        }
        return items;
    }
    async saveData(numericos: any[]) {
        for(var i=0; i<numericos.length;i++){
            let data =[numericos[i].id,numericos[i].unidad]
            const sql = `INSERT OR REPLACE INTO unidad_medidas (id, unidad) values (?,?)`;
            return this.db.executeSQL(sql,data);
        }
    }
}