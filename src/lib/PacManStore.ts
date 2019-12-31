import { observable, action, computed } from "mobx";

import { Direction } from "../components/Types";
import { PacManPhase } from "../components/PacMac";

export class PacManStore {
  @observable
  timestamp = 0;

  @observable
  x = 16;

  @observable
  y = 16;

  @computed
  get phase(): PacManPhase {
    const step = Math.round(this.timestamp / 300) % 4;
    const phase = step === 3 ? 1 : step;
    return phase as PacManPhase;
  }

  @observable
  direction: Direction = "RIGHT";
  nextDirection: Direction = "RIGHT";

  @action.bound
  setPressedKey(pressedKey: string) {
    if (pressedKey === "ArrowLeft") {
      this.nextDirection = "LEFT";
    } else if (pressedKey === "ArrowRight") {
      this.nextDirection = "RIGHT";
    } else if (pressedKey === "ArrowUp") {
      this.nextDirection = "UP";
    } else if (pressedKey === "ArrowDown") {
      this.nextDirection = "DOWN";
    }
  }
}