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
});
describe("server testing", () => {
  it("should return success", async () => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(200);
  });
});


describe(" blogs testing", () => {
  const blogId = "65dcacb8b83924e439de661d";

   const newBlog = {
     title: "heloo the guys hii",
     description: "today is sunday and I am doing tests for my apis",
     photo: "what.jpg",
   };
  it("should  create a blog and return success ", async () => {
    

    const res = await request(app).post(`/add-blog`).send(newBlog);
  
    expect(res.status).toEqual(201);
  });
  it("should  retrieve all  blogs and return success ", async () => {
    const res = await request(app).get(`/all-blogs`);
    expect(res.status).toEqual(200);
  });
  it("should retrieve single blog and return success ", async () => {
    const res = await request(app).get(`/single-blog/${blogId}`);
    expect(res.status).toEqual(200);
  });
  it("should update blog and return success ", async () => {
    const res = await request(app)
      .put(`/update-blog/${blogId}`).send(newBlog);
    expect(res.status).toEqual(200);
  });
  it("should  delete a blog and return success ", async () => {
    const res = await request(app).delete(`/delete-blog/${blogId}`);
    expect(res.status).toEqual(200);
    return;
  });
});

describe(" messages api testing", () => {
  let messageId = "65dcacb8b83924e439de661d";
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
    const res = await request(app).get("/all-messages");
    expect(res.status).toEqual(200);
  });
  it("should retrieve a single message and return success ", async () => {
    const res = await request(app).get(`/single-message/${messageId}`);
    expect(res.status).toEqual(200);
  });
  it("should  delete a message and return success ", async () => {
    const res = await request(app).delete(`/delete-message/${messageId}`);
    expect(res.status).toEqual(200);
  });
});

describe(" user api testing", () => {
  it("should  create a register a user  and return success ", async () => {
    const aUser = { email: "emma4@gmail.com", password: "todayis" };
    const res = await request(app).post(`/auth/register`).send(aUser);

    expect(res.status).toEqual(201);
  });

  it("should  log in a registered  user  and return success ", async () => {
    const registeredUser = { email: "emma4@gmail.com", password: "todayis" };
    const res = await request(app).post(`/auth/login`).send(registeredUser);
    expect(res.status).toEqual(200);
  });
});
