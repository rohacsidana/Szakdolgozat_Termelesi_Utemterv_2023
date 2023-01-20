
import { Component } from "@angular/core";
import { DataTableService } from "../data-table/data-table.service";

@Component({
    selector: 'app-wo-list',
    templateUrl: 'wo-list.component.html',
    styleUrls: ['wo-list.component.css'],
    providers: [DataTableService]
})

export class WoListComponent {
    woHeaders: {name: string, szoveg: string}[] = [
        {name: 'wo_lot', szoveg: 'Gyártási Rendelés szám'},
        {name: 'wo_nbr', szoveg: 'Rendelés szám'},
        {name: 'wo_user', szoveg: 'Aki felvette ezt a GYR-t'},
        {name: 'wo_part', szoveg: 'Tétel'},
        {name: 'wo_line', szoveg: 'Gyártósor'},
        {name: 'wo_seq', szoveg: 'sorszám'},
        {name: 'wo_qty_ord', szoveg: 'Rendelt mennyiség'},
        {name: 'wo_ord_date ', szoveg: 'Rendelési dátum'},
        {name: 'wo_due_date', szoveg: 'Határidő'},
        {name: 'wo_start_date', szoveg: 'Gyártás kezdetének dátuma'},
        {name: 'wo_rel_date', szoveg: 'Kibocsájtási dátum'},
        {name: 'wo_est_run', szoveg: 'Várható elkészülési idő'},
        {name: 'wo_start_time', szoveg: 'Kezdési idő'},
        {name: 'wo_end_time', szoveg: 'Végzési idő'},
        {name: 'wo_pld_downtime', szoveg: 'Tervezett átállásidő'},
        {name: 'wo_unpld_downtime', szoveg: 'Tervezetlen átállásidő'},
        {name: 'wo_activated', szoveg: 'Élesítve'},
        {name: 'wo_status', szoveg: 'státusz'},

    ]
}


