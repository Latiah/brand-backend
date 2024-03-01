import request from "supertest";
import mongoose, { model } from "mongoose";
import app from "../src/index";
import { User } from "../src/models/admin";
import { Blog } from "../src/models/blog";
import { Message } from "../src/models/messages";

beforeAll(async () => {
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
});

afterAll(async () => {
  await User.deleteMany({});

  mongoose.disconnect();
  await mongoose.connection.close();
});

//user api testing
describe(" user api testing", () => {
    const aUser = { email: "emma4@gmail.com", password: "todayis" };
  it("should  create a register a user  and return success ", async () => {
    const res = await request(app).post(`/auth/register`).send(aUser);
    expect(res.status).toEqual(201);
  });
  it("should  create a register a user  and return success ", async () => {
    const res = await request(app).post(`/auth/register`).send({email: "emma4@gmail.com", password: "sostene"});
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("message", "Email already used");

  });
 it("should  log in a registered  user  and return success ", async () => {
   const res = await request(app).post(`/auth/login`).send(aUser);
   expect(res.status).toEqual(200);
});
it("log in unregistered user  and return not found ", async () => {
  const res = await request(app).post(`/auth/login`).send({email:"pitt@gmail.com", password:"yuuuuuu"});
  expect(res.status).toEqual(404);
   //expect(res.body).toHaveProperty("message", "User not ");
});
it("should  log in a user with incorrect password   and return bad request (wrong password) ", async () => {
  const res = await request(app)
    .post(`/auth/login`)
    .send({ email: "emma4@gmail.com", password: "yuuuuuu" });

  expect(res.status).toEqual(400);
  expect(res.body).toHaveProperty("message", "wrong password");
});
});
//server testing
describe ("server testing", () =>{
  it("return a sucess", async()=>{
   const res=await request(app).get("/");
    expect(res.status).toBe(200)
  })
})
//blogs api testing
describe(" blogs testing", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwYjc4ODBmMmZjZWMzMmVlYjZlNTQiLCJlbWFpbCI6ImVtbWE0QGdtYWlsLmNvbSIsImlhdCI6MTcwOTIyNTg5Mn0.inIvXi8d07WLn2hmj1JtMQRrnCVGMwj5a9ghIim3S1o";
  const blogId = "65dcacb8b83924e439de661d";

  const newBlog = {
    title: "heloo the guys hii",
    description: "today is sunday and I am doing tests for my apis",
    photo: "what.jpg",
  };

  it("should  create a blog and return success ", async () => {
    const res = await request(app)
      .post(`/add-blog`)
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toEqual(201);
  });
   it("can  not create a blog without having token ", async () => {
     const res = await request(app)
       .post(`/add-blog`)
       .send(newBlog)
     expect(res.status).toEqual(401);
   });

  it("should  retrieve all  blogs and return success ", async () => {
    const res = await request(app).get(`/all-blogs`);
    expect(res.status).toEqual(200);
  });
  it(" should return error message on displaying  single  blog  ", async () => {
    const res = await request(app).get(`/single-blog/id`);
       expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty(
      "error",
      "An error occured while retrieving one blog"
    );
 });
  it("should retrieve single blog and return success ", async () => {
    const res = await request(app).get(`/single-blog/${blogId}`);
    expect(res.status).toEqual(200);
  });


  it("should update blog and return success ", async () => {
    const res = await request(app)
      .put(`/update-blog/${blogId}`)
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toEqual(200);
  });
  it("error occured during blog update blog when and return success ", async () => {
    const res = await request(app)
      .put(`/update-blog/id`)
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toEqual(500);
  expect(res.body).toHaveProperty(
    "error",
    "An error occurred while Updating the blog."
  );
  });
   it("when a token is missing ", async () => {
     const res = await request(app)
       .put(`/update-blog/${blogId}`)
       .send(newBlog)
     expect(res.status).toEqual(401);
   });
   it("return invalid token ", async () => {
     const res = await request(app)
       .put(`/update-blog/${blogId}`)
       .send(newBlog)
       .set("Authorization", `Bearer "${token}"`);
     expect(res.status).toEqual(401);
   });

  it("should  delete a blog and return success ", async () => {
    const res = await request(app)
      .delete(`/delete-blog/${blogId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toEqual(200);
  });
  it(" error occurred while deleting a blog  ", async () => {
    const res = await request(app)
      .delete(`/delete-blog/id`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toEqual(500);
      expect(res.body).toHaveProperty(
        "error",
        "An error occurred while deleting the blog."
      );
  });
  it("should  delete a blog and return success ", async () => {
    const res = await request(app)
      .delete(`/delete-blog`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toEqual(404);
  });
  it("should  delete a blog and return success ", async () => {
    const res = await request(app)
      .delete(`/delete-blog/${blogId}`)
      .set("Authorization", `Bearer "${token}"`);
    expect(res.status).toEqual(401);
  });

})
describe(" messages api testing", () => {
  let messageId = "65dcacb8b83924e439de661d";
  let messagetoken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwYjc4ODBmMmZjZWMzMmVlYjZlNTQiLCJlbWFpbCI6ImVtbWE0QGdtYWlsLmNvbSIsImlhdCI6MTcwOTIyNTg5Mn0.inIvXi8d07WLn2hmj1JtMQRrnCVGMwj5a9ghIim3S1o";
  it("should  add a message and return success ", async () => {
    const newMessage = {
      name: "Ruthsifah",
      email: "satifah2@gmail.com",
      message: "I can open your eyes and show you all that you want",
    };
    const res = await request(app).post("/Add-message").send(newMessage);
   
    expect(res.status).toEqual(201);
  });
  it("should  retrieve all  messages and return success ", async () => {
    const res = await request(app)
      .get("/all-messages")
      .set("Authorization", `Bearer ${messagetoken}`);
    expect(res.status).toEqual(200);
  });
  it("No token provided and the mesages will not appear", async () => {
    const res = await request(app)
      .get("/all-messages")
    expect(res.status).toEqual(401);
  });

  it("should retrieve a single message and return success ", async () => {
    const res = await request(app)
      .get(`/single-message/${messageId}`)
      .set("Authorization", `Bearer ${messagetoken}`);
    expect(res.status).toEqual(200);
  });
  it("should retrieve a single message and return success ", async () => {
    const res = await request(app)
      .get(`/single-message/id`)
      .set("Authorization", `Bearer ${messagetoken}`);
    expect(res.status).toEqual(500);
    expect(res.body).toHaveProperty(
      "error",
      "error occured retrieving one message"
    );
  });
   it("should retrieve a single message and return success ", async () => {
     const res = await request(app)
       .get(`/single-message/${messageId}`)
     expect(res.status).toEqual(401);
   });

  it("should  delete a message and return success ", async () => {
    const res = await request(app)
      .delete(`/delete-message/${messageId}`)
      .set("Authorization", `Bearer ${messagetoken}`);
    expect(res.status).toEqual(200);
  });
  it("should  delete a message and return success ", async () => {
    const res = await request(app)
      .delete(`/delete-message/id`)
      .set("Authorization", `Bearer ${messagetoken}`);
    expect(res.status).toEqual(500);
     expect(res.body).toHaveProperty(
       "error",
       "error occured while deleting a message"
     );
  });
    it("should  delete a message and return success ", async () => {
      const res = await request(app)
        .delete(`/delete-message/${messageId}`)
      expect(res.status).toEqual(401);
    });
})
