import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { DatePipe } from './date.pipe';

@NgModule({
    declarations: [FiltroPipe, DatePipe],
    exports: [FiltroPipe, DatePipe]
})

export class PipesModule {}