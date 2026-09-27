const express = require('express');
const crudFactory = require('../utils/crudFactory');
const { protect } = require('../middleware/auth');

// Builds a standard REST router (list/create/get/update/delete) for a
// straightforward resource model. Used for every collection that doesn't
// need custom business logic beyond plain CRUD.
function resourceRoutes(Model) {
  const { list, getOne, create, update, remove } = crudFactory(Model);
  const router = express.Router();

  router.get('/', protect, list);
  router.post('/', protect, create);
  router.get('/:id', protect, getOne);
  router.put('/:id', protect, update);
  router.delete('/:id', protect, remove);

  return router;
}

module.exports = resourceRoutes;
