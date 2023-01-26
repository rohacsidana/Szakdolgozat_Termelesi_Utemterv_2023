import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'rovidit'
})

export class Rovidit implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (value.length > 30) {
            return value.substr(0, 30) + "..."

        } else {
            return value
        }
    }
}
