import EnImg from "../assets/Img/en.jpg";
import ArImg from "../assets/Img/ar.jpg";
import FrImg from "../assets/Img/fr.jpg";

const allLanguagesAsObject = {
    'ar': {
        'image': ArImg,
        'translatedWord': "Arabic"
    },
    'en': {
        image: EnImg,
        translatedWord: 'English'
    },
    'fr': {
        'image': FrImg,
        translatedWord: 'French'
    }
};
const  defaultLanguage = 'en';
const allLanguagesAsArray = ['en' , 'ar' , 'fr'];

function getCurrentUserLanguage()
{
    let languageFromLocalStorage = localStorage.getItem('language') || 'en';

    return allLanguagesAsArray.includes(languageFromLocalStorage)
        ? languageFromLocalStorage
        : defaultLanguage
}
export {
    allLanguagesAsObject ,
    allLanguagesAsArray ,
    defaultLanguage ,
    getCurrentUserLanguage
}