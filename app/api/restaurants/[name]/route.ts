import { NextResponse } from "next/server";
import { redisClient } from "@/lib/redis";

export const dynamic = "force-dynamic"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const choosenRestaurant = await redisClient.get(name)
    if (choosenRestaurant) {
      const restaurantData = JSON.parse(choosenRestaurant);
      return NextResponse.json({ data: restaurantData, status: 200 });
    } else {
      return NextResponse.json({ message: "Requested resturant does not exists", status: 503 })
    }
  } catch (error) {
    console.log(error)
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const body = await request.json();
    const res = await redisClient.set(`${name}`, JSON.stringify(body));

    if (res == "OK") {
      return NextResponse.json({
        message: "Added data successfully",
        requestBody: body,
        res,
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "Error occured",
        requestBody: body,
        res,
        status: 500,
      });
    }
  } catch (error) {
    console.log(error)
  }
}