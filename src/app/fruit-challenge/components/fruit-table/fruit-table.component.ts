import { Component, OnInit } from '@angular/core';
import { FruitTableViewModel} from './fruit-table-view-model';
import { FruitDetailDialogComponent } from '../fruit-dialog/fruit-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Fruit } from '../../models/fruit';

@Component({
  selector: 'app-fruit-table',
  templateUrl: './fruit-table.component.html',
  styleUrls: ['./fruit-table.component.scss'],
  providers: [FruitTableViewModel]
})

export class FruitTableComponent implements OnInit {  
  constructor(public viewModel: FruitTableViewModel, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openFruitDialog(fruit: Fruit): void {
    this.dialog.open(FruitDetailDialogComponent, {
      width: '500px',
      data: fruit,
      autoFocus: false
    });
  }
}