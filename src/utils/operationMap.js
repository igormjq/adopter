const operationMap = new Map();

operationMap.set('animals', {
  toggleFavoriteAnimal: {
    connect: 'addFavoriteAnimal',
    disconnect: 'removeFavoriteAnimal'
  }
});

export default operationMap;