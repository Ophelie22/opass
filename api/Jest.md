# installer Jest pour checker le code :
npm install --save-dev jest @types/jest ts-jest @testing-library/jest-dom


# Ajouter dans le package.json ce script
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}




## Comment effectuer les test ? 

npm install --save-dev jest ts-jest jest-mock-extended


## puis jest.config.js : 

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

## NPM RUN TEST