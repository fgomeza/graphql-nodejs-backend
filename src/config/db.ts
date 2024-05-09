import mongoose from 'mongoose'

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI
    if (MONGO_URI) {
        const conn = await mongoose.connect(MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } else {
        throw new Error('Cannot connect to database with empty URI')
    }
}

export default connectDB