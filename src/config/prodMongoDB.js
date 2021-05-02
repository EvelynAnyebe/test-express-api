import mongoose from 'mongoose';

async function connectProdMongoDB() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // OK. console.log("Database up and running.");
  } catch (err) {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  }
}
export default connectProdMongoDB;
