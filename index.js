const fs = require('fs')

class AllResultsCsvReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options

    if (!this._options.outputDir) {
      this._options.outputDir = '.'
    }

    if (!this._options.outputFile) {
      this._options.outputFile = 'all_result.csv'
    }
  }

  onRunComplete(contexts, results) {
    let result4csv = ['"suite","case","result"\n']
    const suites = results.testResults
    for (const suite of suites) {
      for (const testCase of suite.testResults) {
        result4csv.push(`"${suite.testFilePath}","${testCase.title}","${testCase.status}"\n`)
      }
    }
    fs.writeFile(`${this._options.outputDir}/${this._options.outputFile}`, result4csv.join(''), err => {
      if (err) {
        console.error(err)
      } else {
        console.log(`write all results to ${this._options.outputFile}`)
      }
    })
  }
}

module.exports = AllResultsCsvReporter 
