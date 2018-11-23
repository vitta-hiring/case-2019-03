
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('doctors').del()
    .then(function () {
      // Inserts seed entries
      return knex('doctors').insert([
        {
          "id": 1,
          "name": "Fuller Lucas"
        },
        {
          "id": 2,
          "name": "Daisy Howard"
        },
        {
          "id": 3,
          "name": "Roxie Washington"
        },
        {
          "id": 4,
          "name": "Sheree Adkins"
        },
        {
          "id": 5,
          "name": "Preston Lamb"
        },
        {
          "id": 6,
          "name": "Wyatt Shaw"
        },
        {
          "id": 7,
          "name": "Richardson Salazar"
        },
        {
          "id": 8,
          "name": "Stephenson Thomas"
        },
        {
          "id": 9,
          "name": "Yolanda Swanson"
        },
        {
          "id": 10,
          "name": "Hughes Suarez"
        }
      ]);
    });
};
