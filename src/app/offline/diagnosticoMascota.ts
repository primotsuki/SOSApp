import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class diagnosMascotaService{
    constructor(private db: DBService){}

    async getAll(id:number) {
        const sql = `SELECT test_diag_mascota.*, test_diagnosticos.descripcion FROM test_diag_mascota LEFT OUTER JOIN test_diagnosticos ON test_diag_mascota.diagnostico_id = test_diagnosticos.id
        WHERE mascota_id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] = [];
        if(res.rows.length >0) {
            for(var i=0; i < res.rows.length;i++){
                items.push({
                    id: res.rows.item(i).id,
                    notas: res.rows.item(i).notas,
                    resultado: res.rows.item(i).resultado,
                    fecha_test: res.rows.item(i).fecha_test,
                    test: {
                        id:  res.rows.item(i).diagnostico_id,
                        descripcion: res.rows.item(i).descripcion
                    }
                })
            }
        }
        return items;
    }
    async newdiagnos(diagnos: any){
        const data = [diagnos.notas, diagnos.resultado
                        ,diagnos.fecha_test,diagnos.diagnostico_id, diagnos.mascota_id,diagnos.submitted];
        const sql = 'INSERT INTO test_diag_mascota (notas, resultado, fecha_test,diagnostico_id, mascota_id, submitted) values (?,?,?,?,?,?)';
        return this.db.executeSQL(sql, data)
    }
    async updatediagnos(diagnos: any) {
        const data =[diagnos.notas, diagnos.resultado
            ,diagnos.fecha_test,diagnos.diagnostico_id, diagnos.mascota_id,diagnos.submitted];
        const sql = `UPDATE test_diag_mascota set notas=?, resultado=?, fecha_test=?,diagnostico_id=?, mascota_id=?, submitted=? where id = ${diagnos.id}`;
        return this.db.executeSQL(sql,data);
    }
}