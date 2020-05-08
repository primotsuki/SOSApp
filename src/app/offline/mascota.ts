import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MascotaService{
    constructor(private db: DBService){}

    async getAll() {
        const sql = 'SELECT * FROM mascota INNER JOIN tipo_mascota on mascota.tipo_id = tipo_mascota.id';
        const res = await this.db.executeSQL(sql);
        let items: any[] = [];
        if(res.rows.length >0) {
            for(var i=0; i < res.rows.length;i++){
                items.push({
                    id: res.rows.item(i).id,
                    nombre: res.rows.item(i).nombre,
                    caracteristicas: res.rows.item(i).caracteristicas,
                    fecha_nacimiento: res.rows.item(i).fecha_nacimiento,
                    color: res.rows.item(i).color,
                    mes_aprox: res.rows.item(i).mes_aprox,
                    year_aprox: res.rows.item(i).year_aprox,
                    submitted: res.rows.item(i).submitted,
                    tipo: {
                        id:  res.rows.item(i).tipo_id,
                        descripcion: res.rows.item(i).descripcion
                    }
                })
            }
        }
        return items;
    }
    async newMascota(mascota: any){
        const data = [mascota.nombre, mascota.caracteristicas, mascota.fecha_nacimiento, mascota.color
                        ,mascota.mes_aprox, mascota.year_aprox, mascota.tipo_id, mascota.sumitted];
        const sql = 'INSERT INTO mascota (nombre, caracteristicas, fecha_nacimiento, color, mes_aprox, year_aprox, tipo_id, submitted) values (?,?,?,?,?,?,?,?)'
        return this.db.executeSQL(sql, data)
    }
    async updateMascota(mascota: any) {
        const data = [mascota.nombre, mascota.caracteristicas, mascota.fecha_nacimiento, mascota.color
            ,mascota.mes_aprox, mascota.year_aprox, mascota.user_id, mascota.unidad_id, false];
        const sql = `UPDATE mascota set nombre=?, caracteristicas=?, fecha_nacimiento=?, color=?, mes_aprox=?, year_aprox=? user_id=?, tipo_id=?, unidad_id=? where id = ${mascota.id}`;
        return this.db.executeSQL(sql,data);
    }
}