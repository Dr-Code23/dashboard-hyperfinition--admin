export let finalDate = (date) => {
    let dateString = date;

    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString();
    const day = dateObj.getDate().toString();

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
