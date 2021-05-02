import connectDevMongoDB from './devMongoDB.js';
import connectProdMongoDB from './prodMongoDB.js';


(() => {
  if (process.env.NODE_ENV !== 'development') {
    return connectProdMongoDB();
  }

  return connectDevMongoDB();
})();
