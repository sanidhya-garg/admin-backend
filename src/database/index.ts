import mongoose, { model, connect } from 'mongoose';
import { IStartup, IJob, IStudent, Startup, Job, Student } from './models';

// 1. Create an interface representing a document in MongoDB.

mongoose.connection.once('connected', () => console.log("Connected to Database"))
mongoose.connection.on('disconnected', () => console.log("Disconnected from Database"))
mongoose.connection.on('error', (err) => console.error('MongoDB Connection Error:', err))
mongoose.connection.on('timeout', () => console.error('MongoDB connection timeout'))
mongoose.connection.on('reconnecting', () => console.log("Reconnecting to MongoDB"))
mongoose.connection.on('reconnected', () => console.log('Reconnected to MongoDB'))
mongoose.connection.on('reconnectFailed', () => console.error('All reconnection attempts failed'))

export {mongoose as mongoConnecter}



// // 2. Create a Schema corresponding to the document interface.
// const userSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   avatar: String
// });

// // 3. Create a Model.
// const User = model<IUser>('User', userSchema);

// run().catch(err => console.log(err));

// async function run() {
//   // 4. Connect to MongoDB
//   await connect('mongodb://127.0.0.1:27017/test');

//   const user = new User({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     avatar: 'https://i.imgur.com/dM7Thhn.png'
//   });
//   await user.save();

//   console.log(user.email); // 'bill@initech.com'
// }


// export async function mongoCheckConnection(){

//   if (mongoose.connection.readyState !== 1) await mongoConnect()

// }

// const studentSchema = new mongoose.Schema({
//   EntryNo : String,
//   hash : String,
//   lastSlot : String,
//   useHistory : [String],
// });
// const Student = mongoose.model('ShivaStudentTesting', studentSchema);


// export async function mongoCreateStudent(EntryNo : string, hash : string){

//   const foundStudent = await Student.findOne({EntryNo})

//   if (foundStudent){
//       foundStudent.hash = hash
//       foundStudent.save()
//       return;
//   }


//   const student = new Student({EntryNo : EntryNo, hash : hash})
//   await student.save()
// }
