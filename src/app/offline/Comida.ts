import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ComidaMascotaService{
    constructor(private db: DBService){}

    async getAll(id:number) {
        const sql = `SELECT * FROM comida_mascota LEFT OUTER JOIN suministros ON comida_mascota.suministro_id = suministros.id where mascota_id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] = [];
        if(res.rows.length >0) {
            for(var i=0; i < res.rows.length;i++){
                items.push({
                    id: res.rows.item(i).id,
                    notas: res.rows.item(i).notas,
                    fecha_comida: res.rows.item(i).fecha_comida,
                    cantidad: res.rows.item(i).cantidad,
                    medida: res.rows.item(i).medida,
                    recordatorio: (res.rows.item(i).recordatorio=1)? true:false,
                    hora_recoratorio: res.rows.item(i).hora_recoratorio,
                    submitted: res.rows.item(i).submitted,
                    suministro: {
                        id:  res.rows.item(i).suministro_id,
                        descripcion: res.rows.item(i).descripcion
                    }
                })
            }
        }
        return items;
    }
    async newComida(comida: any){
        const data = [comida.notas, comida.fecha_comida,comida.cantidad, comida.medida,
                        comida.recordatorio,comida.hora_recoratorio, comida.suministro_id, comida.mascota_id,comida.submitted];
        const sql = 'INSERT INTO comida_mascota (notas, fecha_comida, cantidad, medida, recordatorio,hora_recordatorio, suministro_id, mascota_id, submitted) values (?,?,?,?,?,?,?,?,?)'
        return this.db.executeSQL(sql, data)
    }
    async updateComida(comida: any) {
        const data =[comida.notas, comida.fecha_comida,comida.cantidad, comida.medida,
            comida.recordatorio,comida.hora_recoratorio, comida.suministro_id, comida.mascota_id,comida.submitted];
        const sql = `UPDATE comida_mascota set notas=?, fecha_comida=?, cantidad=?, medida=?, recordatorio=?, hora_recordatorio=? suministro_id=?, mascota_id=?, submitted=? where id = ${comida.id}`;
        return this.db.executeSQL(sql,data);
    }
}