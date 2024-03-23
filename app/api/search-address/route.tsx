import { NextResponse } from "next/server";

export async function GET(request: any) {
    const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest"
    const { searchParams } = new URL(request.url)
    const searchText = searchParams.get("q")

    const res = await fetch(`${BASE_URL}?q=${searchText}&language=en&limit=10&session_token=0d3f8be6-e3c4-4bd1-88e3-dafa3f304778&country=US&access_token=${process.env.MAP_ACCESS_TOKEN}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const searchResult = await res.json();
    return NextResponse.json(searchResult)
}