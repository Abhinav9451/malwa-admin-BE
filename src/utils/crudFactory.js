const asyncHandler = require('./asyncHandler');
const ApiError = require('./ApiError');

// Builds standard list/get/create/update/delete handlers for a Mongoose
// model, so each simple resource (customers, projects, materials, ...)
// doesn't need its own hand-written boilerplate controller.
function crudFactory(Model) {
  const list = asyncHandler(async (req, res) => {
    const docs = await Model.find().sort({ createdAt: -1 });
    res.json({ [Model.collection.name]: docs });
  });

  const getOne = asyncHandler(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) throw new ApiError(404, `${Model.modelName} not found`);
    res.json({ [Model.modelName.toLowerCase()]: doc });
  });

  const create = asyncHandler(async (req, res) => {
    // The frontend addresses records by `id`; Mongo's primary key is `_id`.
    const { id, ...rest } = req.body;
    const doc = await Model.create(id ? { _id: id, ...rest } : rest);
    res.status(201).json({ [Model.modelName.toLowerCase()]: doc });
  });

  const update = asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw new ApiError(404, `${Model.modelName} not found`);
    res.json({ [Model.modelName.toLowerCase()]: doc });
  });

  const remove = asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) throw new ApiError(404, `${Model.modelName} not found`);
    res.status(204).end();
  });

  return { list, getOne, create, update, remove };
}

module.exports = crudFactory;
