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
        m: "He nui ngā tīwhiri, he nui hoki te wā."
    },
    intermediateDescription: {
        e: "Shorter time to guess with access to a single hint.",
        m: "He wā poto ki te whakapae me ngā tīwhiri iti"
    },
    proDescription: {
        e: "Minimal time to guess with no hints available.",
        m: "Kāore he tīwhiri, kāore he wā"
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
        m: "A Taihoa"
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
        m: "Ko tō wa kia Kōwhirihia he reta!"
    },
    isCurrentlySelecting: {
        e: "is currently selecting a letter!",
        m: "e kōwhiri ana i te pū!"
    },
    isCurrentlyGuessing: {
        e: "is currently guessing a",
        m: "kei te whakapae i te"
    },
    startingWithTheLetter: {
        e: "starting with the letter",
        m: "e tīmata ana ki te pū"
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
        m: "Ngā Piro whakamutunga Katoa:"
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
        m: "Tepenga Wā"
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
        m: "Ngā Piro Whakamutunga ā te Kaiwhakamahi"
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
        m: "Tohua Te Tau Tānui Kēmu"
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
        m: "Hoki ki te Whārangi Matua"
    },
    howToText1: {
        e: `  
            A fun spoken game for family and friends to practice the Māori
            language! No board or cards needed—just your voice and some good
            company. Players have a time limit to guess, and others can vote
            on pronunciation. Perfect for gatherings and boosting te reo Māori
            skills!
            `
              ,
        m:  `
                He kēmu mō ngā hoa me te whānau mā te whakatairanga i te ako o te Reo Māori. 
                Ko tōu reo, me te wairua ngahau anake e hiahiatia ana. 
                Kei ngā kaitākaro he wā iti hei ako, te kōwhiri i te whakautu, ā, ka taea e te toenga te pōti i runga i tāu i whakahua. 
                Ko te whāinga o tēnei kēmu ko te whakapakari i tōu reo Māori.
            `
    },
    howToText2: {
        e: `
                Pick a category and a letter. Say a word in that category starting with the chosen letter.
            `,
        m:  `
                Kōwhirihia he wahanga me tētehi arapū. Whakaputa he kupu i taua wahanga e timata ana ki te arapū i kōwhirihia e koe.
            `
    },
    howToText3: {
        e: `   
                A letter is picked at random, and you need to say a word that starts with it.
            `,
        m:  `
                Ka kowhirihia he arapū noa, ā me ahei koe te whakahua i te kupu ka timata ki taua arapū.
            `
    },
    gameMode: {
        e: "Game Mode",
        m: "Aratau  Kēmu"
    },
    enterDigit: {
        e: "Enter a 4 digit code",
        m: "Whakauru To Tohu Muna Matiwha"
    },
    howDoYouThinkTheyDid: {
        e: "How do you think they did?",
        m: "He aha o whakaaro mo to rātou mahi?"
    },
}