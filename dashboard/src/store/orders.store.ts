import { Subject } from 'rxjs';

interface Item {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id?: number;
  customerId?: number;
  items: Item[]
}

const subject = new Subject();

const initialState: { data: Order[] } = {
  data: []
}; 

let state = initialState;

interface orderStore {
  init: () => void;
  subscribe: (setState: any) => void;
  addOrder: (order: Order) => void
}

const ordersStore: orderStore = {
  init: () => subject.next(initialState),
  subscribe: setState => subject.subscribe(setState),
  addOrder: (order) => {
    state = {
      ...state,
      data: [...state.data, order]
    };
    subject.next(state);
  }
}

export default ordersStore;