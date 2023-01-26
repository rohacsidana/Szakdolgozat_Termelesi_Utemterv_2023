import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'rovidit'
})

export class Rovidit implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return value.substr(0, 15) + "..."
    }
}
