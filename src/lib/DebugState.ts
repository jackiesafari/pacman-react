import { configure, observable } from 'mobx';
import { Store } from './Store';
import { GhostViewOptions } from './GhostViewOptions';

configure({ enforceActions: 'observed' });

export class DebugState {
  constructor(store: Store) {
    this.store = store;
  }

  store: Store;

  @observable
  ghostViewOptions: GhostViewOptions = {
    hitBox: false,
    target: true,
    wayPoints: false,
  };
}
