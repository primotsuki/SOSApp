import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VacunaMascotaService{
    constructor(private db: DBService){}

    async getAll(id:number) {
        const sql = `SELECT vacunas_mascota.*, vacunas.descripcion FROM vacunas_mascota LEFT OUTER JOIN vacunas ON vacunas_mascota.vacuna_id = vacunas.id
        WHERE mascota_id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] = [];
        if(res.rows.length >0) {
            for(var i=0; i < res.rows.length;i++){
                items.push({
                    id: res.rows.item(i).id,
                    notas: res.rows.item(i).notas,
                    fecha_vacuna: res.rows.item(i).fecha_vacuna,
                    recordatorio: (res.rows.item(i).recordatorio=1)? true:false,
                    realizado: (res.rows.item(i).realizado=1)? true:false,
                    submitted: res.rows.item(i).submitted,
                    vacuna: {
                        id:  res.rows.item(i).vacuna_id,
                        descripcion: res.rows.item(i).descripcion
                    }
                })
            }
        }
        return items;
    }
    async newvacuna(vacuna: any){
        const data = [vacuna.notas, vacuna.fecha_vacuna
                        ,vacuna.recordatorio,vacuna.realizado, vacuna.mascota_id,vacuna.vacuna_id ,vacuna.submitted];
        const sql = 'INSERT INTO vacunas_mascota (notas, fecha_vacuna, recordatorio,realizado, mascota_id,vacuna_id, submitted) values (?,?,?,?,?,?,?)';
        return this.db.executeSQL(sql, data)
    }
    async updatevacuna(vacuna: any) {
        const data =[vacuna.notas, vacuna.fecha_vacuna
            ,vacuna.recordatorio,vacuna.realizado, vacuna.mascota_id,vacuna.vacuna_id ,vacuna.submitted];
        const sql = `UPDATE vacuna_mascota set notas=?, fecha_vacuna=?, recordatorio=?,realizado=?, mascota_id=?,vacuna_id=?, submitted=? where id = ${vacuna.id}`;
        return this.db.executeSQL(sql,data);
    }
}