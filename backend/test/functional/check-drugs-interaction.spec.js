'use strict'

const { test, trait } = use('Test/Suite')('CheckDrugsInteraction')
const CheckDrugsInteractionService = use('App/Services/CheckDrugsInteractionService')

trait('Test/ApiClient')

test('check drugs interaction', async ({ assert }) => {

  let params = {
    "doctor_id":7,
    "patient_id":39,
    "medicines":[
      {
        "id":5798,
        "name":"CARDICORON",
        "route_of_administration":"ORAL",
        "dosage":"10 vezes por dia"
      },
      {
        "id":28438,
        "name":"ZOLAMOX",
        "route_of_administration":"ORAL",
        "dosage":"4 vezes por ano"
      },
      {
        "id":14821,
        "name":"GLUCOBAY",
        "route_of_administration":"ORAL",
        "dosage":"10 vezes na vida"
      }
    ]
  }

  const response = await (new CheckDrugsInteractionService()).run(params).then((data) => data)

  assert.lengthOf(response, 2)
})
