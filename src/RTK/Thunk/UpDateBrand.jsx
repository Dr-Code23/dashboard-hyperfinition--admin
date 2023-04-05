import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let UpDateBrand = createAsyncThunk(
    "brand/UpDateBrand",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(
                `${process.env.REACT_APP_API}/brands/${arg?.id}`,
                {
                    name: { en: arg?.en, ar: arg?.ar, fr: arg?.fr },
                    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAIQAvAMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAABgQFAQP/2gAIAQEAAAAAAffvAZuWAmgNduBzpsBiA124HOmwGIDXbgc6bAYgNduBzpsBiA124HOmwGIDXbgc6bAYgNduBzpsBiA124HOmwGIDXbgc6bAYgNduBzpsBiA124HOmwGIDXbgc6bAYgNduBzpsBiA124HOmwGIDXbgc6bA9tQAAAf//EABoBAQADAQEBAAAAAAAAAAAAAAABAwQFBgL/2gAKAgIQAxAAAAC+oIU2hH3X0wTu4IROe4Isq7AG/wA4ETnuCLKuwBv84ETnuCLKuwBv84ETnuCLKuwBv84ETnuCLKuwBv8AOBE57giyrsAb/OBE57giyrsAXcMAAAP/xAAmEAAAAwkBAQACAwAAAAAAAAACBDQAAQMFFTBAcnNSUxETIDJQ/9oACAEBAAE/AK+c+cFq+c+cFq+c+cFq+c+cFq+c+cFq+c+cFq+c+cFis7NRjMGEIEL8DG35/mcMDLQP2AcH+zmrRrxCatGvEJq0a8QmrRrxCatGvEJq0a8QmrRrxCatGvEKwQXFeobE0SP3DgEFxXqGxNEj9w4BBcV6hsTRI/cOAQXFeobE0SP3DgEFxXqGxNEj9w4BBcV6hsTRI/cOAQXFeobE0SP3DgEFxXqGxNEj9w4BBcV6hsTRI/cOAQXFeobE0SP3DgEFxXqGxNEj9w4BBcV6hsTRI/cOAQXFeobE0SP3DgEFxXqGxNEj9w4BBcV6hsTRI/cP+D//xAAdEQEAAQUBAQEAAAAAAAAAAAABMQASIDBRAhFA/9oACAECAQE/ALfPKt88q3zynyfIwYaue1c9q57Vz3BhwYdDDgw6GHBh0MODDoYcGHQw4MOhhwYfw//EACERAAEBCAMBAAAAAAAAAAAAAAEDAAITIDAxM3ISUVJA/9oACAEDAQE/AOR7bke25HtgTIkAVHAe2gJeA0BLwGgJeA0BLwJBeRHK5sKAvIjlc2FAXkRyubCgLyI5XNhQF5EcrmwoC8iOVzYUBeRHK5sPh//Z",
                },
                Api()
            );
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
