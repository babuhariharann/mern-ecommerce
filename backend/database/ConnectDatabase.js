import mongoose from "mongoose"


const ConnectDatabase = async () => {

  await mongoose.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@mernecommerce.oicrz.mongodb.net/`).then(() => console.log('MongoDB connected successfully')).catch(error => console.log('Error while connecting MongoDB', error))
}

export default ConnectDatabase