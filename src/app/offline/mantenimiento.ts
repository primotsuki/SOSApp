import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MantenimientoMascotaService{
    constructor(private db: DBService){}

    async getAll(mascota_id:number, mantenimiento_id) {
        const sql = `SELECT * FROM mantenimiento_mascota
        WHERE mascota_id = ${mascota_id} AND mantenimiento_id = ${mantenimiento_id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] = [];
        console.log(res);
        if(res.rows.length >0) {
            for(var i=0; i < res.rows.length;i++){
                items.push({
                    id: res.rows.item(i).id,
                    notas: res.rows.item(i).notas,
                    fecha_mantenimiento: res.rows.item(i).fecha_mantenimiento,
                    recordatorio: (res.rows.item(i).recordatorio==1)? true:false,
                    realizado: (res.rows.item(i).realizado==1)? true:false,
                    proximo: res.rows.item(i).proximo,
                    num_prog: res.rows.item(i).num_prog,
                    intervalo_prog: res.rows.item(i).intervalo_prog,
                    programado: (res.rows.item(i).programado==1)? true:false
                })
            }
        }
        return items;
    }
    async newmanten(manten: any){
        let sql ="UPDATE mantenimiento_mascota set realizado = 1 WHERE realizado = 0";
        let res = await this.db.executeSQL(sql);
        console.log(res);
        const data = [manten.notas, manten.fecha_mantenimiento,manten.recordatorio?1:0, manten.realizado? 1:0,
                        manten.proximo,manten.num_prog, manten.intervalo_prog, manten.programado?1:0,manten.mascota_id,manten.mantenimiento_id, manten.submitted?1:0];
        sql = 'INSERT INTO mantenimiento_mascota (notas, fecha_mantenimiento, recordatorio, realizado, proximo, num_prog, intervalo_prog,programado, mascota_id,mantenimiento_id, submitted) values (?,?,?,?,?,?,?,?,?,?,?)'
        return this.db.executeSQL(sql, data)
    }
    async updatemanten(manten: any) {
        const data =[manten.notas, manten.fecha_mantenimiento,manten.recordatorio, manten.realizado,
            manten.proximo,manten.num_prog, manten.intervalo_prog, manten.programado,manten.mascota_id,manten.mantenimiento_id, manten.submitted];
        const sql = `UPDATE mantenimiento_mascota set notas=?, fecha_mantenimiento=?, recordatorio=?, realizado=?, proximo=?, num_prog=?, intervalo_prog=?,programado=?, mascota_id=?,mantenimiento_id=?, submitted=? where id = ${manten.id}`;
        return this.db.executeSQL(sql,data);
    }
    async finishManten(mante_id: number){
        const sql = `UPDATE mantenimiento_mascota set realizado = 1 where id = ${mante_id}`;
        return this.db.executeSQL(sql);
    }
}