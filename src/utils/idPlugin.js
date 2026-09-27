// Applied to every schema: outputs `id` (string) instead of `_id`/`__v`,
// so every response already matches the frontend's `{ id: string, ... }` shape.
function idPlugin(schema, options = {}) {
  schema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      if (options.hide) options.hide.forEach((field) => delete ret[field]);
    },
  });
}

module.exports = idPlugin;
