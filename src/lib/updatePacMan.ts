import { tileFromScreen, ScreenCoordinates } from './Coordinates';
import { PacMan } from './PacMan';
import { isWayFreeInDirection, DIRECTION_TO_DELTA, isTileCenter } from './Ways';

const movePacMan = (pacManStore: PacMan): void => {
  const delta: ScreenCoordinates = DIRECTION_TO_DELTA[pacManStore.direction];
  pacManStore.moveBy(delta);
};

export const updatePacMan = ({
  pacMan,
  timestamp,
}: {
  pacMan: PacMan;
  timestamp: number;
}): void => {
  pacMan.timestamp = timestamp;

  if (pacMan.state === 'dead') {
    return;
  }

  if (isTileCenter(pacMan.screenCoordinates)) {
    const tile = tileFromScreen(pacMan.screenCoordinates);

    // Change direction if necessary
    if (
      pacMan.direction !== pacMan.nextDirection &&
      isWayFreeInDirection(tile, pacMan.nextDirection)
    ) {
      pacMan.direction = pacMan.nextDirection;
    }

    // Move
    if (isWayFreeInDirection(tile, pacMan.direction)) {
      movePacMan(pacMan);
    }
  } else {
    movePacMan(pacMan);
  }
};