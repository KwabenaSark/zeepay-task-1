import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";



const filePath = path.join(process.cwd(),"/data.json")

const getData = () => JSON.parse(fs.readFileSync(filePath,"utf-8"))
const saveData =(data) => fs.writeFileSync(filePath,JSON.stringify(data,null,2))


//Get request
export async function GET() {
    
    const data = getData();
    return NextResponse.json(data.applications);
}


//Post request

export async function POST(request){
    const {companyName, jobTitle,status,jobLink} = await request.json()
    const data = getData()

    const newData = {id:Date.now(),companyName,jobTitle,dateApplied: new Date().toISOString().split("T")[0],status,jobLink}

    data.applications.push(newData)

    saveData(data)

    return NextResponse.json({success:true});
}


//Extra; Delete

export async function DELETE(request) {
    const { id } = await request.json();
  
    const data = getData();
  
    const updated = data.applications.filter(
      (item) => item.id !== id
    );
  
    data.applications = updated;
  
    saveData(data);
  
    return NextResponse.json({ success: true });
  }