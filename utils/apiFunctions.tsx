
export const createLobbyAction = (playerId: string, gameId: string, gameType: string) => ({
  playerId,
  gameId,
  action: {
    type: 'lobbyUpsert',
    details: {
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

