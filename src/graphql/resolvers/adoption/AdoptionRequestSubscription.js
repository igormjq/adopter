export default {
  adoptionRequest: {
    subscribe: (parent, { id }, { pubsub }, info) => {
      return pubsub.asyncIterator(`adoptionRequest ${id}`);
    }
  }
}