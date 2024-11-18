# installer Jest pour checker le code :
npm install --save-dev jest @types/jest ts-jest @testing-library/jest-dom


# Ajouter dans le package.json ce script
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
