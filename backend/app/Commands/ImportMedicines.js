'use strict'

const ImportMedicinesService = use('App/Services/ImportMedicinesService')

const { Command } = require('@adonisjs/ace')

class ImportMedicines extends Command {
  static get signature () {
    return 'import:medicines'
  }

  static get description () {
    return 'Read medicine data from json files and store into database'
  }

  async handle (args, options) {
    await (new ImportMedicinesService).run()
      .then(() => this.completed('import', 'Medicines imported'))
  }
}

module.exports = ImportMedicines
