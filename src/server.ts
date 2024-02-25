import mongoose from "mongoose";
import app from './index';
mongoose
  .connect(
    "mongodb+srv://kimtifah2:fNqsrpAUmHIox43t@cluster0.gw0mecl.mongodb.net/portifolio?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("the database connection was successful");
  })
  .catch((err: any) => {
    console.log(err);
  });
const port: number | string = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});