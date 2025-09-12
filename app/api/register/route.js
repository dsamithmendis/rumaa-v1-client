import connectDB from "@/components/lib/mongodb";
import Register from "@/components/models/register";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { username, name, surname, mobile, email, password, gender, city } =
    await req.json();

  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash(password, 10);
    const userID = uuidv4();

    await Register.create({
      userID,
      username,
      name,
      surname,
      mobile,
      email,
      password: hashedPassword,
      gender,
      city,
    });

    return new Response(
      JSON.stringify({ msg: ["Registered successfully"], success: true }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorList = Object.values(error.errors).map((e) => e.message);
      return new Response(JSON.stringify({ msg: errorList, success: false }), {
        status: 400,
      });
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return new Response(
        JSON.stringify({ msg: [`${field} already exists`], success: false }),
        {
          status: 400,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ msg: ["Unable to register user."], success: false }),
        {
          status: 500,
        }
      );
    }
  }
}
