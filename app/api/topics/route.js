import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const {nombre, apellido, email, telefono, direccion, modeloCarro, asesorComercial} = await request.json();
    await connectMongoDB();
    await Topic.create({nombre, apellido, email, telefono, direccion, modeloCarro, asesorComercial});
    return NextResponse.json({message: "Registro creado"}, {status: 201});
}

// Función GET que maneja tanto búsquedas específicas como la consulta de todos los datos
export async function GET(request) {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);

    const asesorComercial = searchParams.get('asesorComercial'); 
    const fecha = searchParams.get('fecha');

    let query = {};

    // Si se proporciona asesorComercial, añadimos el filtro
    if (asesorComercial) {
        query.asesorComercial = asesorComercial;
    }

    // Si se proporciona fecha, añadimos el filtro por rango de fecha
    if (fecha) {
        const startOfDay = new Date(fecha);
        startOfDay.setUTCHours(0, 0, 0, 0); // Inicio del día en UTC
        const endOfDay = new Date(fecha);
        endOfDay.setUTCHours(23, 59, 59, 999); // Fin del día en UTC
        query.createdAt = { $gte: startOfDay, $lte: endOfDay }; // Rango de fecha
    }

    // Si no se proporciona ningún parámetro, se devuelven todos los registros
    const topics = await Topic.find(query);

    return NextResponse.json({ topics });
}
