import { Result } from "../interfaces/Result"

interface Continents {
    [key: string]: {
        servers: number;
        cities: {
            code: string;
            name: string;
            servers: number;
        }[];
        name: string;
        iso_code: string;
    }[];
}

export async function test(): Promise<Result> {
    const continents: Continents = await fetch("https://assets-cms.privateinternetaccess.com/servers/pia/servers_countries_continents_en.json").then(res => res.json())

    let totalServers = 0
    let totalLocations = 0
    let totalCountries = 0
    for (const continentName in continents) {
        const continent = continents[continentName]
        
        for (const country of continent) {
            totalServers += country.servers
            totalLocations += country.cities.length
        }
        totalCountries += continent.length
    }

    return {
        totalServers: totalServers,
        totalLocations: totalLocations,
        totalCountries: totalCountries
    }
}