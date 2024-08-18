import { existsSync } from 'fs';
import { Service } from './interfaces/Service';

const serviceName = process.argv[2];

if (!existsSync(`./services/${serviceName}.ts`)) {
    console.error(`Service ${serviceName} not found`)
    process.exit(1)
}

const service: Service = await import(`./services/${serviceName}.ts`)

service.test().then(result => {
    console.log(`Total servers: ${result.totalServers}`)
    console.log(`Total locations: ${result.totalLocations}`)
    console.log(`Total countries: ${result.totalCountries}`)
})