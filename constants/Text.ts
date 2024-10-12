import { signOut } from "firebase/auth";
import { add, create, partial } from "lodash";

export const languageTexts = {
    pass: {
        e: "Pass",
        m: "Hipa"
    },
    hints: {
        e: "Hints",
        m: "Tuwhiri"
    },
    time: {
        e: "Time",
        m: "Wā"
    },
    selectGameMode: {
        e: "Select Game Mode",
        m: "Whiringa Kemu"
    },
    beginner: {
        e: "Beginner",
        m: "Pipi Paopao"
    },
    intermediate: {
        e: "Intermediate",
        m: "Waenga"
    },
    pro: {
        e: "Pro",
        m: "Tohunga"
    },
    beginnerDescription: {
        e: "Longer time to guess and more access to hints.",
        m: "Hui Nga Tautoko"
    },
    intermediateDescription: {
        e: "Shorter time to guess with access to a single hint.",
        m: "Paku Tautoko"
    },
    proDescription: {
        e: "Minimal time to guess with no hints available.",
        m: "Kare kau Tautoko"
    },
    add: {
        e: "Add",
        m: "Tāpiri"
    },
    success: {
        e: "Success",
        m: "Ana"
    },
    error: {
        e: "Error",
        m: "Hapa"
    },
    good: {
        e: "Good",
        m: "Pai"
    },
    Poor: {
        e: "Poor",
        m: "Kare i Te Pai"
    },
    notsure: {
        e: "Not Sure",
        m: "Aua"
    },
    loading: {
        e: "Loading",
        m: "a Taihoa"
    },
    random: {
        e: "Random",
        m: "Ohorere"
    },
    create: {
        e: "Create",
        m: "Urunga"
    },
    join: {
        e: "Join",
        m: "Oroko"
    },
    begin: {
        e: "Begin",
        m: "Timata"
    },
    selectNextPlayer: {
        e: "Select Next Player",
        m: "Katakaro Whiringa"
    },
    username: {
        e: "Username",
        m: "Ingoa Kaiwhakamahi"
    },
    enterLobbyCode: {
        e: "Enter Lobby Code",
        m: "Tu mai te waehere uru"
    },
    voteTextHow: {
        e: "How do you think they did?",
        m: "I Pewhea Tai Rotou i mahi ai?"
    },
    selectALetter: {
        e: "Select a letter",
        m: "Tinata i te pu"
    },
    category: {
        e: "Category",
        m: "Kāwai"
    },
    startGame: {
        e: "Start Game",
        m: "Timata Kēmu"
    },
    leaveGame: {
        e: "Leave Game",
        m: "Waiho Kēmu"
    },
    endGame: {
        e: "End Game",
        m: "Whakamutu Kēmu"
    },
    welcome: {
        e: "Welcome",
        m: "Kia Ora"
    },
    signOut: {
        e: "Sign Out",
        m: "Takina"
    },
    difficulty: {
        e: "Difficulty",
        m: "Ngawari"
    },
    start: {
        e: "Start",
        m: "Timata"
    },
    select: {
        e: "Select",
        m: "Tīpakohia"
    },
    enterUsername: {
        e: "Enter your username",
        m: "Whakauruhia to ingoa kaiwhakamahi"
    },
    close: {
        e: "Close",
        m: "Katia"
    },
    createProfile: {
        e: "Create Profile",
        m: "Waihanga Kōtaha"
    },
    use: {
        e: "Use",
        m: "Whakamahi"
    },
    thinkOfAWord: {
        e: "Think of a word that starts with the letter:",
        m: "Whakaroa he kupu timata mai i te arapū"
    },
    partialWord: {
        e: "Partial Word",
        m: "wahanga kupu"
    },
    fullWord: {
        e: "Full Word",
        m: "Kupu Katoa"
    },
    itsYourTurn: {
        e: "It's your turn to select a letter!",
        m: "Ko tō tāu e kōwhiri i te pū!"
    },
    isCurrentlyGuessing: {
        e: "is currently guessing a",
        m: "e mahi ana i te"
    },
    startingWithTheLetter: {
        e: "starting with the letter",
        m: "timata mai i te pū"
    },
    didTheyGuessCorrectly: {
        e: "Did they guess correctly?",
        m: "I tika to rātou whakamahi?"
    },
    selectingPlayer: {
        e: "Selecting a player!",
        m: "Kōwhiringa i te kaiwhakamahi!"
    },
    lobbyCode: {
        e: "Lobby Code:",
        m: "Waehere uru:"
    },
    maxTotalScore: {
        e: "Max Total Score:",
        m: "Whaina toa"
    },
    createLobby: {
        e: "Create Lobby",
        m: "Waihanga Waehere"
    },
    games: {
        e: "Games",
        m: "Kēmu"
    },
    addGameType: {
        e: "Add Game Type",
        m: "Tāpiri Kēmu"
    },
    timeLimit: {
        e: "Time Limit",
        m: "Taima Tutuki"
    },
    lobbyName: {
        e: "Lobby Name",
        m: "Ruma Tira"
    },
    cancel: {
        e: "Cancel",
        m: "Whakakore"
    },
    maxPlayerScore: {
        e: "Max Player Score",
        m: "Whainga Toa"
    },
    setLobbyEnd: {
        e: "Set Lobby End Conditions",
        m: "Whakarite i te Whakamutu Waehere"
    },
    maxCategories: {
        e: "Get Max Categories",
        m: "Whaina Nga Kāwai"
    },
    chooseGameMode: {
        e: "Choose Game Mode",
        m: "Tīpakohia Te Arataki Kēmu"
    },
    didYouKnow: {
        e: "Did you know:",
        m: "I mohio koe:"
    },
    scores: {
        e: "Scores",
        m: "Toenga"
    },
    gameGuide: {
        e: "How to Play",
        m: "Me pehea te kēmu"
    },
    goToMainPage: {
        e: "Go to Main Page",
        m: "Haere ki te Whārangi Matua"
    },
        
    





};