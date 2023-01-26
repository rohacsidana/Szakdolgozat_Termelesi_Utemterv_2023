;
import { Component } from "@angular/core";
import { XWo } from "../data-table/data-table.service";

@Component({
    selector: 'app-xwo',
    templateUrl: 'xwo.component.html',
    styleUrls: ['xwo.component.css']
})

export class XWoCoponent {
    woData: XWo[] = [
        {item_per_hour: 1, ln_desc: 'gysor1', part_um: 'db', pt_desc: 'elem', wo_activated: false, wo_end_time: '00:00', wo_est_run: '01:13', wo_line: '1', wo_lot: 1, wo_nbr:'1', wo_part:1, wo_pld_downtime:'00:00', wo_qty_ord:10, wo_rel_date:'2023-01-25', wo_seq:1,wo_start_date:'2022-01-24', wo_start_time:'23:30', wo_unpld_downtime:'01:01'}
    ];
}


