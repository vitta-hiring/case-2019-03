'use strict'

const ImportDrugsInteractionService = use('App/Services/ImportDrugsInteractionService')

const { Command } = require('@adonisjs/ace')

class ImportDrugsInteraction extends Command {
  static get signature () {
    return 'import:drugs_interaction'
  }

  static get description () {
    return 'Read drugs interactions data from json files and store into database'
  }

  async handle (args, options) {
    await (new ImportDrugsInteractionService()).run()
      .then(() => this.completed('import', 'Drugs interaction imported'))
  }
}

module.exports = ImportDrugsInteraction
