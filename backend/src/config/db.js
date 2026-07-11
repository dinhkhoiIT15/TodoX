import mongoose from 'mongoose';

export const connectDB = async () => {
      try{
            await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
            console.log('Lien ket database thanh cong');
      }catch (error) {
            console.log('Loi ket noi database', error);
            process.exit(1); //Thoat voi trang thai that bai
      }
}