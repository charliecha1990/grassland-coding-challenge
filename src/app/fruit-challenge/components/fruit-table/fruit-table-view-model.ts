import {Injectable} from '@angular/core';
import {FruityViceService} from '../../services/fruity-vice-service';
import {BehaviorSubject, combineLatest, map} from 'rxjs';
import {Fruit} from '../../models/fruit';

@Injectable()
export class FruitTableViewModel {
  private allFruits = new BehaviorSubject<Fruit[]>([]);
  private filterText = new BehaviorSubject<string>('');
  private sortOption = new BehaviorSubject<string>('Name Ascending');
  columnToAlignRight = 'sugar'; // example of a column that should be aligned to the right

  fruitData$ = combineLatest([
    this.allFruits,
    this.filterText,
    this.sortOption
  ]).pipe(
    map(([fruits, filter, sort]) => {
      const filtered = fruits?.filter(fruit =>
        [fruit.name, fruit.genus, fruit.family, fruit.order]
          .some(field => field.toLowerCase().includes(filter.toLowerCase()))
      ) || [];

      return this.sortFruits(filtered, sort);
    })
  );

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
      this.allFruits.next(fruitResponse);
    });
  }

  setFilterText(value: string) {
    this.filterText.next(value);
  }

  setSortOption(value: string) {
    this.sortOption.next(value);
  }

  private sortFruits(fruits: Fruit[], sort: string): Fruit[] {
    switch (sort) {
      case 'Name Ascending':
        return fruits.sort((a, b) => a.name.localeCompare(b.name));
      case 'Name Descending':
        return fruits.sort((a, b) => b.name.localeCompare(a.name));
      case 'Carbohydrates Ascending':
        return fruits.sort((a, b) => a.nutritions.carbohydrates - b.nutritions.carbohydrates);
      case 'Carbohydrates Descending':
        return fruits.sort((a, b) => b.nutritions.carbohydrates - a.nutritions.carbohydrates);
      default:
        return fruits;
    }
  }
}
