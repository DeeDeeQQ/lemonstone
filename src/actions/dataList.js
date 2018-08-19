const API_URL = "https://hn.algolia.com/api/v1/search_by_date?tags=story ";
export const getList = () => dispatch => {
    fetch(API_URL, {
        async: true,
        crossDomain: true,
        method: "GET",
    }).then(response => {
        response.json().then(data => {
            console.log(data);

        });
    });
};