import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'rovidit'
})

export class Rovidit implements PipeTransform {
    //ha a value hossza több mint 80, akkor csak az első 80 karaktert adja vissza.
    transform(value: any, ...args: any[]) {
        if (value.length > 80) {
            return value.substr(0, 80) + "..."

        } else {
            return value
        }
    }
}
