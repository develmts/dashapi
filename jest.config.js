/** @type {import('ts-jest').JestConfigWithTsJest} **/

// const config = {
//   preset: './jest.preset.js'
// };
const config= {
  cache: true,
  // testMatch: ["**/__TESTS__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"]
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"]
}

// ts-jest
Object.assign(config, {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
}) 

console.log(config)
export default config

// export default {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };

