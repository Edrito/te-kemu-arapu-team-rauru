export const createLobbyAction = (playerId: string, gameId: string, gameType: string) => ({
  playerId,
  gameId,
  action: {
    type: 'lobbyUpsert',
    details: {
      gameId,
      settings: {
        endConditions: {
          time: 0,
          score: 0,
        },
        games: {
          '0': {
            type: gameType,
            endConditions: {
              duration: 60,
              score: 10,
            },
          },
        },
      },
    },
  },
});

export const playerAction = (playerId: string, lobbyCode: string, playerAction : string, details: {}) => ({
  playerId,
  lobbyCode,
  action: {
    type: playerAction,
    details,
  },
});
