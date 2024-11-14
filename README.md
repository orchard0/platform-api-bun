# Platform API

An API written in Bun / Elysia that provides live, historic and future UK rail departure information. There is also station name search endpoint available to find the station code required to get departure information.

If you prefer a Node / Express version checkout [this repo](https://github.com/orchard0/platform-api).

## Getting Started

1. Run `bun i`

2. Create a `.env.local` file in the root directory with the following key and values:

```
api_key_fastest =
api_key_next =
api_key_departures =

api_url_fastest = https://api1.raildata.org.uk/1010-live-fastest-departures---staff-version/LDBSVWS/api/20220120/GetFastestDeparturesWithDetails
api_url_next = https://api1.raildata.org.uk/1010-live-next-departures-board---staff-version/LDBSVWS/api/20220120/GetNextDeparturesWithDetails
api_url_departures = https://api1.raildata.org.uk/1010-live-departure-board-dep/LDBWS/api/20220120/GetDepBoardWithDetails

PGDATABASE=gb_rail_data
```

You can obtain api keys for the rail data from [raildata.org.uk]()

The default Postgres database will be called `gb_rail_data` you can change that in the `.env` file or specify a remotely hosted database.

3. If using locally, run `psql -f ./db/setup.sql` to setup the local Postgres database.

4. Finally populate the Postgres database by running `bun run dbSeed`

## Development

To start the development server run `bun run dev`.

## API reference

> `/api/services/live/{from}/{to}`

`{from}` and `{to}` are station CRS codes.
e.g. `/api/services/live/EUS/MAN` would give departure information from London Euston to Manchester Piccadilly.

The response will be a list of departures, if any, with useful information and a `type` key describing if that particular service is the fastest to the destination and/or the next to depart.

> `/api/stations/{search}`

`{search}` is the search term i.e. `Euston`. The response will be a list of stations with their corresponding CRS codes.

---

`Created by the grace of God`.
