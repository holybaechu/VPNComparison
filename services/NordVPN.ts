import { Result } from "../interfaces/Result";
import clipboard from "clipboardy";
import { JSDOM } from "jsdom";

export async function test(): Promise<Result> {
    let contients;

    console.log("Waiting for the content of https://nordvpn.com/servers to be copied to the clipboard...");
    while (true) { 
        try {
            contients = new JSDOM(clipboard.readSync()).window.document.querySelector(".ServersTable:nth-child(1) > table")!.children;
            if (contients && contients.length > 0) {
                console.log("Content copied to clipboard.");
                break;
            }
        } catch (e) {
            continue;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    let totalLocations = 0;
    let totalCountries = 0;
    for (const contient of contients) {
        if (contient.tagName !== "TBODY") continue;

        const countries = contient.querySelectorAll("tr:nth-child(2) > td > div > table > tbody > tr")
        for (const country of countries) {
            totalCountries++;

            const cities = country.querySelector("td > p:nth-child(3)")?.textContent!;
            if (cities) {
                totalLocations += parseInt(cities.substring(1))
            } else {
                totalLocations++;
            }
        }
    }

    return {
        totalLocations: totalLocations,
        totalCountries: totalCountries
    }
}