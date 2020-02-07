import { observable, computed } from 'mobx';

import { GhostPhase } from '../components/GhostsView';
import { Direction, SPEED } from '../components/Types';
import { GameInterface } from './GameInterface';
import { Coordinates } from './Coordinates';

export class Ghost {
  constructor(game: GameInterface) {
    this.game = game;
  }

  @observable
  ghostPaused = false;

  game: GameInterface;

  @observable
  timestamp = 0;

  ghostNumber = 0;

  color = 'ghost color';

  @observable
  x = 16;

  minX = 16;
  maxX = 17 * 16;

  @observable
  y = 16;

  minY = 16;
  maxY = 17 * 16;

  @computed
  get phase(): GhostPhase {
    return Math.round((this.timestamp + this.ghostNumber * 100) / 300) % 2 === 0
      ? 0
      : 1;
  }

  @observable
  direction: Direction = 'LEFT';

  @observable
  wayPoints: Coordinates[] | null = null;
}
