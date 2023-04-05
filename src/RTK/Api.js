import axios from "axios";

// export let Api = axios.create({
//     baseURL: `${process.env.REACT_APP_API}`,
//     headers: {
//         Locale: localStorage.getItem("language") || "en",
//         Accept: "application/json",
//         Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
//     },
// });
export let Api = () => {
    return {
        headers: {
            Locale: localStorage.getItem("language") || "en",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
    };
};
