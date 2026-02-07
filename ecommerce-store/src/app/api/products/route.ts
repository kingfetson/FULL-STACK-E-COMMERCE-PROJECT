// Update the import path if the data file is located elsewhere, for example:
import { products } from "../lib/data"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(products)
}
