const knex = require('../../config/db');
const express = require('express')
const _ = require('lodash');
const router = express.Router()


router.get('/locationById/:location_id', function (req, res) {
  knex.select().from('locations')
  .where('location_id', req.params.location_id).then(data => {
    res.send(data)
  })
})

router.get('/:party_id', function (req, res) {
  knex('locations')
    .join('cities', 'locations.city_id', 'cities.city_id')
    .join('ufs', 'cities.uf_id', 'ufs.uf_id')
    .where('party_id', req.params.party_id)
    .select('locations.location_id'
      ,  'locations.address_line'
      , 'locations.number'
      , 'locations.zip_code'
      , 'cities.name as city_name'
      , 'ufs.code as uf').then(data => {
        res.send(data);
      });

})

router.post('/', function (req, res) {
  knex.insert(req.body).into('locations').then(data => {
    res.send(data)
  })
})

router.put('/', async function (req, res) {
  const ret = await knex('locations').where({ location_id: req.body.location_id }).update(pushData).then(function (data) {
    return data[0]
  })
  res.send({ data: ret })
})

router.patch('/:location_id', function (req, res) {
  const updatedAt = new Date();
  const pushData = { ...req.body, updated_at: updatedAt };
  knex('locations').where({ location_id: req.params.location_id }).update(pushData).returning('*').then(data => {
    res.send(data)
  })
})

router.delete('/:location_id', function (req, res) {
  knex('locations').where({ location_id: req.params.location_id }).del().then(data => {
    res.status(200);
  })
})


module.exports = router