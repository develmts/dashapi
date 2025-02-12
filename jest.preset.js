//const nxPreset = require('@nx/jest/preset').default;
/*
  "@nx/jest:jest": {
    "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"],
    "cache": true,
    "options": {
      "passWithNoTests": true
    },
    "configurations": {
      "ci": {
        "ci": true,
        "codeCoverage": true
      }
    }
  }
*/

const preset = {
  //"inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"],
  "cache": true,
  // "options": {
  //   "passWithNoTests": true
  // },
  // "configurations": {
  //   "ci": {
  //     "ci": true,
  //     "codeCoverage": true
  //   }
  // }
}

export default preset
//module.exports = { ...preset };
