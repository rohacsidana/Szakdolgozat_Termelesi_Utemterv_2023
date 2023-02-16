import { Component, OnInit } from "@angular/core";
import { DataTableService } from "../data-table/data-table.service";
import { DataStorageService } from "../shared/data-storage.service";
import { XWo } from "../shared/interfaces";

@Component({
    selector: 'app-xwo',
    templateUrl: 'xwo.component.html',
    styleUrls: ['xwo.component.css'],
    providers: [DataTableService]
})

export class XWoCoponent implements OnInit {
    woData: XWo[] = [
        {
            wo_lot: 1
            , wo_nbr: '1'
            , wo_part: 1
            , pt_desc: 'elem'
            , wo_qty_ord: 10
            , part_um: 'db'
            , wo_line: '1'
            , ln_desc: 'gysor1'
            , item_per_hour: 1
            , wo_est_run: '01:13'
            , wo_seq: 1
            , wo_rel_date: '2023-01-25'
            , wo_start_date: '2022-01-24'
            , wo_start_time: '23:30'
            , wo_end_time: '00:00'
            , wo_pld_downtime: '00:00'
            , wo_unpld_downtime: '01:01'
        }
    ];

    xwoHeaders: {
        name: string, szoveg: string, input?: {
            type: string;
            step?: number;
        }
    }[] = [
            { name: "wo_lot", szoveg: "GYR azon" },
            { name: "wo_nbr", szoveg: "GYR szám" },
            { name: "wo_part", szoveg: "GYR tételkód" },
            { name: "pt_desc", szoveg: "Megnevezés" },
            { name: "wo_qty_ord", szoveg: "Mennyiség" },
            { name: "part_um", szoveg: "Mértékegység" },
            { name: "wo_line", szoveg: "Gyártósor" },
            { name: "ln_desc", szoveg: "Gyártósor megnevezés" },
            { name: "item_per_hour", szoveg: "Óránkénti elkészülési egység" },
            { name: "wo_est_run", szoveg: "Várható elkészülési idő" },
            { name: "wo_seq", szoveg: "sorrend", input: { type: "number", step: 10 } },
            { name: "wo_rel_date", szoveg: "Kibocsátási dátum" },
            { name: "wo_start_date", szoveg: "Esedékesség dátum" },
            { name: "wo_start_time", szoveg: "Kezdési idő" },
            { name: "wo_end_time", szoveg: "Végzési idő" },
            { name: "wo_pld_downtime", szoveg: "Tervezett állási idő" },
            { name: "wo_unpld_downtime", szoveg: "Nem tervezett állási idő" },
        ];
    constructor(private datatableservice: DataTableService, private dataStorageService: DataStorageService) {
    }

    ngOnInit() {
        this.datatableservice.emitDataChanged(this.woData.slice());
        this.dataStorageService.fetchUtemterv(1,'line_01');
    }
}
/*
wo_lot, szoveg: "GYR azon,"
wo_nbr, szoveg: "GYR szám,"
wo_part, szoveg: "GYR tételkód,"
pt_desc, szoveg: "Megnevezés,"
wo_qty_ord, szoveg: "Mennyiség,"
part_um, szoveg: "Mértékegység,"
wo_line, szoveg: "Gyártósor,"
ln_desc, szoveg: "Gyártósor megnevezés,"
item_per_hour, szoveg: "Óránkénti elkészülési egység
wo_est_run, szoveg: "Várható elkészülési idő,"
wo_seq, szoveg: "sorrend,"
wo_rel_date, szoveg: "Kibocsátási dátum,"
wo_start_date, szoveg: "Esedékesség dátum,"
wo_start_time, szoveg: "Kezdési idő,"
wo_end_time, szoveg: "Végzési idő,"
wo_pld_downtime, szoveg: "Tervezett állási idő,"
wo_unpld_downtime, szoveg: "Nem tervezett állási idő
*/

