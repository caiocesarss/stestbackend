const knex = require('../../config/db');
const _ = require('lodash');
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  knex('parties').select().then(data => {
    res.send(data)
  })
})

router.get('/getById/:party_id', function (req, res) {
  knex.select().from('parties').where('party_id', req.params.party_id).then(data => {
    res.send(data)
  })
})

router.post('/', async function (req, res) {
  const createdAt = new Date();
  const partyData = {
    party_name: req.body.party_name,
    created_at: createdAt,
    cpf: req.body.cpf,
    email: req.body.email,
    birth_date: req.body.birth_date
  }

  const partyId = await knex.insert(partyData).into('parties').then(data => {
    return data[0];
  })

  const locationData = {
    party_id: partyId,
    address_line: req.body.address_line,
    zip_code: req.body.zip_code,
    district: req.body.district,
    city_id: req.body.city,
    number: req.body.number
  }

  const locationIt = await knex.insert(locationData).into('locations').then(data => {
    return data[0];
  })

  res.send({ party_id: partyId })
})



router.post("/select/", function (req, res, next) {
  const table = req.body.table;
  const params = req.body;

  let whereType = "";
  let whereParams = "";
  if (params) {
    whereType = "where";
    whereParams = params;
  } else {
    whereType = "whereRaw";
    whereParams = "1=1";
  }
  knex('parties')
  [whereType](whereParams)
    .select("*")
    .then(data => {
      res.send(data);
    });
});


router.put('/', async function (req, res) {
  const updatedAt = new Date();
  let pushData = { ...req.body, updated_at: updatedAt };
  pushData = _.omit(pushData, ['created_at']);
  const ret = await knex('parties').where({ party_id: pushData.party_id }).update(pushData).then(function (data) {
    return data[0]
  })
  res.send({ dados: ret })
})

router.delete('/:party_id', async function (req, res) {
  try {
    const result = await knex('parties').where({ party_id: req.params.party_id }).del().then(function (data) {
      return data
    })
    const locations = await knex('locations').where({ party_id: req.params.party_id }).del().then(function (data) {
      return data
    })
    const phones = await knex('phones').where({ party_id: req.params.party_id }).del().then(function (data) {
      return data
    })

    res.status(200)

  } catch (e) {
    res.status(400)
    res.send(e.message)
  }
})

module.exports = router