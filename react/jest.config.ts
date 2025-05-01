import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom", // <- Ambiente do navegador
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    setupFilesAfterEnv: ["./jest.setup.ts"], // <- Setup personalizado
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: ["**/__tests__/**/*.test.(ts|tsx|js)"],
    moduleNameMapper: {
        // Ignorar imports de CSS/SASS/etc
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        // Mock de imagens
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
    collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
    clearMocks: true,
    globals: {
        "ts-jest": {
            tsconfig: "./tsconfig.json",
        },
    },
};

export default config;
