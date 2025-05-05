import {Injectable} from '@angular/core';
import {FruityViceService} from '../../services/fruity-vice-service';
import {BehaviorSubject} from 'rxjs';
import {Fruit} from '../../models/fruit';

@Injectable()
export class FruitTableViewModel {

  fruitData$ = new BehaviorSubject<Fruit[]>(null);
  loadingFruit$ = new BehaviorSubject<boolean>(false);
  columns = [
    { name: 'name', label: 'Name', valueGetter: (fruit: Fruit) => fruit.name },
    { name: 'id', label: 'ID', valueGetter: (fruit: Fruit) => fruit.id },
    { name: 'genus', label: 'Genus', valueGetter: (fruit: Fruit) => fruit.genus },
    { name: 'calories', label: 'Calories', valueGetter: (fruit: Fruit) => fruit.nutritions.calories },
    { name: 'carbohydrates', label: 'Carbohydrates', valueGetter: (fruit: Fruit) => fruit.nutritions.carbohydrates },
    { name: 'sugar', label: 'Sugar', valueGetter: (fruit: Fruit) => fruit.nutritions.sugar }
  ]; // define the columns for the table

  columnsToDisplay = this.columns.map(col => col.name); // map to get the column names

  constructor(private fruitService: FruityViceService) {
    this.loadingFruit$.next(true);
    this.fruitService.getAllFruits().subscribe(fruitResponse => {
      this.loadingFruit$.next(false);
      this.fruitData$.next(fruitResponse);
    });
  }
}
