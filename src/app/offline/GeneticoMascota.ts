import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class geneticoMascotaService{
    constructor(private db: DBService){}

    async getAll(id:number) {
        const sql = `SELECT test_gen_mascota.*, test_geneticos.descripcion FROM test_gen_mascota LEFT OUTER JOIN test_geneticos ON test_gen_mascota.genetico_id = test_genticos.id
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
                        id:  res.rows.item(i).genetico_id,
                        descripcion: res.rows.item(i).descripcion
                    }
                })
            }
        }
        return items;
    }
    async newgenetico(genetico: any){
        const data = [genetico.notas, genetico.resultado
                        ,genetico.fecha_test,genetico.genetico_id, genetico.mascota_id,genetico.submitted];
        const sql = 'INSERT INTO test_gen_mascota (notas, resultado, fecha_test,genetico_id, mascota_id, submitted) values (?,?,?,?,?,?,?)';
        return this.db.executeSQL(sql, data)
    }
    async updategenetico(genetico: any) {
        const data =[genetico.notas, genetico.resultado
            ,genetico.fecha_test,genetico.genetico_id, genetico.mascota_id,genetico.submitted];
        const sql = `UPDATE test_gen_mascota set notas=?, resultado=?, fecha_test=?,genetico_id=?, mascota_id=?, submitted=? where id = ${genetico.id}`;
        return this.db.executeSQL(sql,data);
    }
}