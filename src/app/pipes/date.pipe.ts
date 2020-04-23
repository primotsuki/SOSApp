import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'DateFormat'
})
export class DatePipe implements PipeTransform {
    transform(text: string) {
    return  moment(new Date(parseInt(text))).format('LL');
    }
}