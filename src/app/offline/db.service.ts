import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  db:SQLiteObject;
  databaseName: string = 'SOSApp.db'

  constructor(
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter,
    private httpClient: HttpClient
  ) { }

  async openDatabase(){
    try {
      this.db = await this.sqlite.create({
        name: this.databaseName,
        location: 'default'})
        await this.createDatabase();
    } catch (error) {
      console.error('Hubo un problema creando la base de datos', error);
    }
  }
  async createDatabase() {
    this.httpClient.get(
      'assets/data.sql',
      {responseType: 'text'}
    ).subscribe(data =>{
      this.sqlitePorter.importSqlToDb(this.db, data)
      .then(data=> console.log('data aimported'))
    });
  }
  executeSQL(sql: string, params?: any[]){
    return this.db.executeSql(sql, params);
  }
}
