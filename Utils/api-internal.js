// import axios from 'axios';

export const getPhotos = (query) => {
    fetch(`http://localhost:3000/api/${query}`, {
        method: "GET",
        // headers: {
        //     "Content-type": "application/json; charset=UTF-8"
        // },
    })
}

export const postPhotos = (query, data) => {
    fetch(`http://localhost:3000/api/${query}`, {
        method: "POST",
        body: JSON.stringify({
            base64: data
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}


