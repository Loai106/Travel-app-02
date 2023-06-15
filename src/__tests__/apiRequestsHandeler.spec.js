import { getGeoLocation ,getPhoto ,getWeather } from "../client/js/apiRequestsHandler";

describe("test the functions if defined or not", ()=>{

    test("testing getting data from geolocatino api ", async()=>{
        expect(getGeoLocation).toBeDefined();
    });

    test("testing getting data from weatherbit api",async()=>{

        expect(getWeather).toBeDefined();
    });

    test("testing getting data from pixabay api",async()=>{
        expect(getPhoto).toBeDefined();
    });

})