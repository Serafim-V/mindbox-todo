export default {
  preset: 'ts-jest', // Use ts-jest for TypeScript
  testEnvironment: 'node', // Specify the environment (Node.js in this case)
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files with ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // File extensions to handle
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Match test files
};