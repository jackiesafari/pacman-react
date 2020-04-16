import { action } from 'mobx';
import { detectCollisions } from './detectCollisions';
import { Game } from './Game';
import { updateGhosts } from './updateGhosts';
import { updatePacMan } from './updatePacMan';
import { updateEnergizerTimer } from './updateEnergizerTimer';
import { MilliSeconds } from './Types';

export const TYPICAL_FRAME_DURATION: MilliSeconds = 17;

export const onAnimationFrame = action(
  'onAnimationFrame',
  ({ game, timestamp }: { game: Game; timestamp: number }) => {
    updateExternalTimestamp({ game, externalTimeStamp: timestamp });

    if (game.gamePaused) {
      return;
    }

    updateGameTime(game);

    updateEnergizerTimer(game);

    updatePacMan(game);

    updateGhosts(game);

    detectCollisions(game);
  }
);

// TODO: Extract this function
const updateExternalTimestamp = ({
  game,
  externalTimeStamp,
}: {
  game: Game;
  externalTimeStamp: number;
}) => {
  if (game.externalTimeStamp === null) {
    // The very first frame
    // 1000ms / 60 frames per second
    game.timeSinceLastFrame = TYPICAL_FRAME_DURATION;
  } else {
    // Later frames
    game.timeSinceLastFrame = externalTimeStamp - game.externalTimeStamp;
  }
  game.externalTimeStamp = externalTimeStamp;
};

// TODO: Extract this function
const updateGameTime = (game: Game) => {
  game.timestamp += game.timeSinceLastFrame;
  game.frameCount++;
  return true;
};
