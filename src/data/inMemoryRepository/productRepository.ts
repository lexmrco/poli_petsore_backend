import {Observable} from "rxjs";
import { of } from 'rxjs/observable/of';

import {injectable} from "inversify";
import {Product} from "@/domain/entity";
import {map} from "rxjs/operators";

@injectable()
export default class ProductRepositoryImpl {
  readonly _products: Product[];

  constructor() {
    const products = []
    products.push({
      id: '1',
      name: 'Casa mascotas RIMAX',
      price: 290000,
      selected: false,
      discount : 10,
      thumbnailUrl: "img/casa-mascotas-perros-rimax.jpg",
      description: `Casa para perros de razas mediana y grande marca Rimax`
    });
    
    products.push({
      id: '2',
      name: 'Casa raza grande',
      price: 320000,
      selected: false,
      discount : 5,
      thumbnailUrl: "img/casas-perros-medianos.png",
      description: "Casa para perros de raza grande"
    });
    products.push({
      id: '3',
      name: 'Casa dos niveles',
      price: 450000,
      selected: false,
      discount : 5,
      thumbnailUrl: "img/casa-mascotas-perros-niveles.jpg",
      description: "Casa de madera dos niveles. Raza pequeña"
    })
    products.push({
      id: '4',
      name: 'Casa gato',
      price: 220000,
      selected: false,
      discount : 5,
      thumbnailUrl: "img/casa-gato1.jpg",
      description: "Casa café para gatos"
    });

    products.push({
      id: '5',
      name: 'Casa gimnasio',
      price: 520000,
      selected: false,
      discount : 0,
      thumbnailUrl: "img/casa-gimnasio-gato1.jpg",
      description: "Casa gimnasio "
    });

    products.push({
      id: '6',
      name: 'Casa gimmasio con hamaca',
      price: 420000,
      selected: false,
      discount : 5,
      thumbnailUrl: "img/casa-gimnasio-gato2.jpg",
      description: "Casa divertida gimasio y hamaca"
    });
    products.push({
      id: '7',
      name: 'Collar cuero',
      price: 75000,
      selected: false,
      discount : 5,
      thumbnailUrl: "img/collar-cuero.jpg",
      description: "Collar en cuero café"
    });
    products.push({
      id: '8',
      name: 'Correa collar abeja',
      price: 30000,
      selected: false,
      discount : 5,
      thumbnailUrl: "img/collar-abeja.jpg",
      description: "Decoración animada "
    });

    products.push({
      id: '9',
      name: 'Collar perro',
      price: 30000,
      selected: false,
      discount : 5,
      thumbnailUrl: "img/collar-rojo-azul.jpg",
      description: "Collar para perro azul rojo "
    });


    this._products = products
  }

  public getAll(): Observable<Product[]> {
    return of(null).pipe(
      map(() => this._products)
    )
  }
}
