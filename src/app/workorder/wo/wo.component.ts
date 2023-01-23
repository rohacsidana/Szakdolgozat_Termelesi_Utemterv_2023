import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as DataTableService from '../../data-table/data-table.service';
import { WoService } from '../wo.service';
@Component({
  selector: 'app-wo',
  templateUrl: 'wo.component.html',
  styleUrls: ['wo.component.css'],
  providers: [DataTableService.DataTableService],
})
export class WoComponent /* implements OnInit, OnDestroy */ {
  
}
