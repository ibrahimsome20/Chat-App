import mongoose from 'mongoose'

export const conectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.DB_URI)
        console.log(`Mongo DB connected : ${conn.connection.host}`)
        
    } catch (error) {
        console.error('error happend in conetcted db',error)
        process.exit(1)
    }
}