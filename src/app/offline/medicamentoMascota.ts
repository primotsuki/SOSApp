import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MedicamentoMascotaService{
    constructor(private db: DBService){}

    async getAll(id:number) {
        const sql = `SELECT medicamento_mascota.*, medicamentos.descripcion FROM medicamento_mascota LEFT OUTER JOIN medicamentos ON medicamento_mascota.medicamento_id = medicamentos.id
        WHERE mascota_id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] = [];
        if(res.rows.length >0) {
            for(var i=0; i < res.rows.length;i++){
                items.push({
                    id: res.rows.item(i).id,
                    notas: res.rows.item(i).notas,
                    fecha_medicamento: res.rows.item(i).fecha_medicamento,
                    recordatorio: (res.rows.item(i).recordatorio=1)? true:false,
                    realizado: (res.rows.item(i).realizado=1)? true:false,
                    submitted: res.rows.item(i).submitted,
                    medicamento: {
                        id:  res.rows.item(i).medicamento_id,
                        descripcion: res.rows.item(i).descripcion
                    }
                })
            }
        }
        return items;
    }
    async newMedicamento(medicamento: any){
        const data = [medicamento.notas, medicamento.fecha_medicamento
                        ,medicamento.recordatorio,medicamento.realizado, medicamento.mascota_id,medicamento.medicamento_id ,medicamento.submitted];
        const sql = 'INSERT INTO medicamento_mascota (notas, fecha_medicamento, recordatorio,realizado, mascota_id,medicamento_id, submitted) values (?,?,?,?,?,?,?)';
        return this.db.executeSQL(sql, data)
    }
    async updatemedicamento(medicamento: any) {
        const data =[medicamento.notas, medicamento.fecha_medicamento
            ,medicamento.recordatorio,medicamento.realizado, medicamento.mascota_id,medicamento.medicamento_id ,medicamento.submitted];
        const sql = `UPDATE medicamento_mascota set notas=?, fecha_medicamento=?, recordatorio=?,realizado=?, mascota_id=?,medicamento_id=?, submitted=? where id = ${medicamento.id}`;
        return this.db.executeSQL(sql,data);
    }
}