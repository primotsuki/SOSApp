import {DBService} from './db.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class numericoMascotaService{
    constructor(private db: DBService){}

    async getAll(id:number) {
        const sql = `SELECT test_num_mascota.*, test_numericos.descripcion, unidad_medidas.unidad FROM test_num_mascota LEFT OUTER JOIN test_numericos ON test_num_mascota.numerico_id = test_numericos.id
                    LEFT OUTER JOIN unidad_medidas ON test_num_mascota.unidad_id = unidad_medidas.id
        WHERE mascota_id = ${id}`;
        const res = await this.db.executeSQL(sql);
        let items: any[] = [];
        if(res.rows.length >0) {
            for(var i=0; i < res.rows.length;i++){
                items.push({
                    id: res.rows.item(i).id,
                    notas: res.rows.item(i).notas,
                    margen_bajo: res.rows.item(i).margen_bajo,
                    margen_alto: res.rows.item(i).margen_alto,
                    fecha_test: res.rows.item(i).fecha_test,
                    test: {
                        id:  res.rows.item(i).numerico_id,
                        descripcion: res.rows.item(i).descripcion
                    },
                    unidad: {
                        id: res.rows.item(i).unidad_id,
                        unidad: res.rows.item(i).unidad
                    }
                })
            }
        }
        return items;
    }
    async newnumerico(numerico: any){
        const data = [numerico.notas, numerico.valor, numerico.margen_bajo, numerico.margen_alto,
                        numerico.fecha_test,numerico.numerico_id,numerico.unidad_id, numerico.mascota_id,numerico.submitted];
        const sql = 'INSERT INTO test_num_mascota (notas, valor,margen_bajo,margen_alto, fecha_test,numerico_id,unidad_id, mascota_id, submitted) values (?,?,?,?,?,?,?,?,?)';
        return this.db.executeSQL(sql, data)
    }
    async updatenumerico(numerico: any) {
        const data =[numerico.notas, numerico.resultado, numerico.margen_bajo, numerico.margen_alto,
            ,numerico.fecha_test,numerico.numerico_id,numerico.unidad_id, numerico.mascota_id,numerico.submitted];
        const sql = `UPDATE test_num_mascota set notas=?, resultado=?,margen_bajo=?,margen_alto=?, fecha_test=?,numerico_id=?,unidad_id=?, mascota_id=?, submitted=? where id = ${numerico.id}`;
        return this.db.executeSQL(sql,data);
    }
}