import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MedicionMascotaService{
    constructor(private db: DBService){}

    async getAll(mascota_id:number, medicion_id: number) {
        const sql = `SELECT medicion_mascota.*, unidad_medidas.unidad FROM medicion_mascota LEFT OUTER JOIN unidad_medidas ON medicion_mascota.unidad_id = unidad_medidas.id
        WHERE mascota_id = ${mascota_id} AND medicion_id= ${medicion_id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] = [];
        if(res.rows.length >0) {
            for(var i=0; i < res.rows.length;i++){
                items.push({
                    id: res.rows.item(i).id,
                    notas: res.rows.item(i).notas,
                    valor: res.rows.item(i).valor,
                    fecha_medicion: res.rows.item(i).fecha_medicion,
                    submitted: res.rows.item(i).submitted,
                    unidad: {
                        id:  res.rows.item(i).unidad_id,
                        unidad: res.rows.item(i).unidad
                    }
                })
            }
        }
        return items;
    }
    async newmedicion(medicion: any){
        const data = [medicion.notas, medicion.valor ,medicion.fecha_medicion,medicion.medicion_id, 
            medicion.mascota_id,medicion.unidad_id ,medicion.submitted];
        const sql = 'INSERT INTO medicion_mascota (notas, valor, fecha_medicion,medicion_id, mascota_id,unidad_id, submitted) values (?,?,?,?,?,?,?)';
        return this.db.executeSQL(sql, data);
    }
    async updatemedicion(medicion: any) {
        const data =[medicion.notas, medicion.valor ,medicion.fecha_medicion,medicion.medicion_id, 
            medicion.mascota_id,medicion.unidad_id ,medicion.submitted];
        const sql = `UPDATE medicion_mascota set notas=?, valor=?, fecha_medicion=?,medicion_id=?, mascota_id=?,unidad_id=?, submitted=? where id = ${medicion.id}`;
        return this.db.executeSQL(sql,data);
    }
}