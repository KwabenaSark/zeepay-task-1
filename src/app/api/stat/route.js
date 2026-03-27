import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";



const filePath = path.join(process.cwd(),"/data.json")

const getData = () => JSON.parse(fs.readFileSync(filePath,"utf-8"))



//Get request
export async function GET() {
    const data = getData()
  
    const stats = {
      totalApplications: data.applications.length,
      pending: data.applications.filter(a => a.status === "Pending").length,
      interviews: data.applications.filter(a => a.status === "Interview").length,
      rejected: data.applications.filter(a => a.status === "Rejected").length
    };
  
    return NextResponse.json(stats);
  }