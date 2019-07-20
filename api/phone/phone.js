const knex = require('../../config/db');
const express = require('express')
const _ = require('lodash');
const router = express.Router()


router.get('/phoneById/:phone_id', function (req, res) {
  knex.select().from('phones')
  .where('phone_id', req.params.phone_id)
  .then(data => {
    res.send(data)
  })
})

router.get('/:party_id', function (req, res) {
  knex('phones')
    .where('party_id', req.params.party_id)
    .select().then(data => {
        res.send(data);
      });
})

router.post('/', function (req, res) {
  let pushData = req.body;
  knex.insert(pushData).into('phones').then(data => {
    res.send(data)
  })
})

router.put('/', async function (req, res) {
  const ret = await knex('phones').where({ phone_id: req.body.phone_id }).update(req.body).then(function (data) {
    return data[0]
  })
  res.send({ data: ret })
})



router.delete('/:phone_id', function (req, res) {
  knex('phones').where({ phone_id: req.params.phone_id }).del().then(data => {
    res.send(200);
  })
})


module.exports = router