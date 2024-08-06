import { updateCollectionForUserId } from "@/database/firebaseFunctions";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request) {
    const data = request.body
    console.log("Data: ",data)
    
    const result = await streamToString(data)
    const objectResult = JSON.parse(result)

    console.log("objectResult: ", objectResult)

    try{
        await updateCollectionForUserId(objectResult.uid,objectResult.pokeCollection)
        return NextResponse.json({message: "All data synced successfully"})
    }
    catch(e){
        return NextResponse.json({message: "An error has occurred.", error: JSON.stringify(e)})
    }
}

// This function was based on a proposed solution from the following page:
// https://stackoverflow.com/questions/10623798/how-do-i-read-the-contents-of-a-node-js-stream-into-a-string-variable
async function streamToString (stream) {
    const chunks = [];
    for await(const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("utf-8");
  }
  
