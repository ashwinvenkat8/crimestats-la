import { NextResponse } from "next/server";

const fetchData = async (endpoint) => {
    const data = await fetch(`${process.env.ATLAS_URL}/${endpoint}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'apiKey': `${process.env.API_KEY}`
        }
    });
    
    if (data.ok) {
        return await data.json();
    } else {
        console.error(`Failed to fetch QuickStats data from /${endpoint}: ${data.status} ${data.statusText}`);
    }
}

const getQuickStatsData = async (view) => {
    let data = null;
    
    switch(view) {
        case 'Top5Areas':
            data = await fetchData('top5areas');
            break;
        
        case 'Top5Crimes':
            data = await fetchData('top5crimes');
            break;
        
        case 'Top5Premises':
            data = await fetchData('top5premises');
            break;
        
        case 'Top5Weapons':
            data = await fetchData('top5weapons');
            break;
        
        case 'VictimDistribution':
            data = await fetchData('victimDistribution');
            break;
        
        default:
            console.error(`Invalid QuickStats view: ${view}`);
            return data;
    }

    console.log(data);
    return data;
};

export async function GET(request) {
    return NextResponse.json(await getQuickStatsData(request.nextUrl.searchParams.get('view')));
};