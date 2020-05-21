import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MascotaService{
    constructor(private db: DBService){}

    async getAll() {
        const sql = 'SELECT mascota.*, tipo_mascota.descripcion FROM mascota LEFT OUTER JOIN tipo_mascota on mascota.tipo_id = tipo_mascota.id';
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
                    photo_uri: res.rows.item(i).photo_uri,
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
    async getById(id: number) {
        const sql = `SELECT mascota.*, tipo_mascota.descripcion FROM  mascota LEFT OUTER JOIN tipo_mascota on mascota.tipo_id = tipo_mascota.id WHERE mascota.id = ${id}`;
        const res = await this.db.executeSQL(sql);
        return {
            id: res.rows.item(0).id,
                    nombre: res.rows.item(0).nombre,
                    caracteristicas: res.rows.item(0).caracteristicas,
                    fecha_nacimiento: res.rows.item(0).fecha_nacimiento,
                    color: res.rows.item(0).color,
                    mes_aprox: res.rows.item(0).mes_aprox,
                    year_aprox: res.rows.item(0).year_aprox,
                    photo_uri: res.rows.item(0).photo_uri,
                    submitted: res.rows.item(0).submitted,
                    tipo: {
                        id:  res.rows.item(0).tipo_id,
                        descripcion: res.rows.item(0).descripcion
                    }
        }
    }
    async newMascota(mascota: any){
        const data = [mascota.nombre, mascota.caracteristicas, mascota.fecha_nacimiento, mascota.color
                        ,mascota.mes_aprox, mascota.year_aprox, mascota.tipo_id,mascota.photo_uri, mascota.sumitted];
        const sql = 'INSERT INTO mascota (nombre, caracteristicas, fecha_nacimiento, color, mes_aprox, year_aprox, tipo_id,photo_uri, submitted) values (?,?,?,?,?,?,?,?,?)'
        return this.db.executeSQL(sql, data)
    }
    async updateMascota(mascota: any) {
        const data = [mascota.nombre, mascota.caracteristicas, mascota.fecha_nacimiento, mascota.color
            ,mascota.mes_aprox, mascota.year_aprox, mascota.tipo_id, mascota.photo_uri, mascota.submitted];
        const sql = `UPDATE mascota set nombre=?, caracteristicas=?, fecha_nacimiento=?, color=?, mes_aprox=?, year_aprox=?, tipo_id=?,photo_uri=?, submitted=? where id = ${mascota.id}`;
        return this.db.executeSQL(sql,data);
    }
}