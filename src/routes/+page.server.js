import { API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const actions = {
    default: async({fetch, request}) => {
        const url = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${API_KEY}`;
        const myFormData = await request.formData();
        console.log("awaiting data");
        const dataObject = Object.fromEntries(myFormData);
        const { street, locality, region } = dataObject;
        const formattedData = {
            "address": {
                "regionCode": region,
                "locality": locality,
                "addressLines": [ street ]
            }
        };
        const jsonData = JSON.stringify(formattedData);
        console.log("formatted data probably: ", formattedData);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: jsonData,
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            const myResponse = await response.json();
            const { result } = myResponse;
            const myKeys = Object.keys(result);
            // [ 'verdict', 'address', 'geocode', 'metadata', 'uspsData' ]
            let temp = result["address"].formattedAddress;
            console.log(result);
            console.log("temp: ", temp);
            if(!response.ok){
                error(400, "bad request");
            }
            return myResponse;
        } catch(err) {
            console.log("err: ", err);
            console.error("there is a problem with your POST request");
            throw err;
        }
        
    }   

}

//https://developers.google.com/maps/documentation/places/web-service/place-autocomplete