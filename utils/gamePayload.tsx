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

export const joinLobbyAction = (playerId: string, lobbyCode: string) => ({
  playerId,
  lobbyCode,
  action: {
    type: 'lobbyJoin',
    details: {
      lobbyCode,
    },
  },
});