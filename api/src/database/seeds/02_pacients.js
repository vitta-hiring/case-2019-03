
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patients').del()
    .then(function () {
      // Inserts seed entries
      return knex('patients').insert([
        {
          "id": 1,
          "name": "Mandy Ballard"
        },
        {
          "id": 2,
          "name": "Ethel Kelly"
        },
        {
          "id": 3,
          "name": "Deanna Wilkins"
        },
        {
          "id": 4,
          "name": "Cantrell Briggs"
        },
        {
          "id": 5,
          "name": "Elnora Nash"
        },
        {
          "id": 6,
          "name": "Melinda Leonard"
        },
        {
          "id": 7,
          "name": "Minnie Butler"
        },
        {
          "id": 8,
          "name": "Chandra Gamble"
        },
        {
          "id": 9,
          "name": "Lenore Clemons"
        },
        {
          "id": 10,
          "name": "Carpenter Dotson"
        },
        {
          "id": 11,
          "name": "Alvarez Michael"
        },
        {
          "id": 12,
          "name": "Norman Barlow"
        },
        {
          "id": 13,
          "name": "Antoinette Gilbert"
        },
        {
          "id": 14,
          "name": "Alyson Kane"
        },
        {
          "id": 15,
          "name": "Reyes Harrington"
        },
        {
          "id": 16,
          "name": "Willis Ratliff"
        },
        {
          "id": 17,
          "name": "Paula Doyle"
        },
        {
          "id": 18,
          "name": "Sheppard Nunez"
        },
        {
          "id": 19,
          "name": "Millicent Jensen"
        }
      ]);
    });
};
