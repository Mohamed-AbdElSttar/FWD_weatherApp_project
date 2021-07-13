/* Global Variables */
const zip_inp = document.getElementById("zip");
const feelings_inp = document.getElementById("feelings");

const api_key = "c9d46b244b22d681cdb66e7549190e10";
const base_url = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const generate_btn = document.getElementById("generate");

function generate() {
    let zip_code = `${zip_inp.value}&appid=`;
    let feelings_val = feelings_inp.value;
    getData(base_url + zip_code + api_key)
        .then(data => {
            const temp_val = data.main.temp;
            post_res = postData('/saveprojectData', { date: newDate, temp: temp_val, feelings: feelings_val })
                .then(updateUI());
        });
}

const getData = async (url = '') => {

    const res = await fetch(url)
    try {

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `date : ${allData.projectData.date}`;
        document.getElementById('temp').innerHTML = `temprature : ${allData.projectData.temp}`;
        document.getElementById('content').innerHTML = `feelings : ${allData.projectData.feelings}`;

    } catch (error) {
        console.log("error", error);
    }
}

generate_btn.addEventListener("click", generate)


