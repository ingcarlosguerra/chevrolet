import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {

    const {nombre,apellido,email,telefono,direccion,modeloCarro,asesorComercial} =await request.json();
    await connectMongoDB();
    await Topic.create({nombre,apellido,email,telefono,direccion,modeloCarro,asesorComercial});
    return NextResponse.json({message:"Registro creado"},{status:201})
}

// export async function GET () {
//     await connectMongoDB();
//     const topics = await Topic.find();
//     return NextResponse.json({topics}); 
// }

export async function GET(request) {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const asesor = searchParams.get('asesor');

    const topics = await Topic.find({ asesor });

    return NextResponse.json({ topics });
}