// 'use strict';
const statesList = {
    AL: 'Alabama',
    AK: 'Alaska',
    AS: 'American Samoa',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District Of Columbia',
    FM: 'Federated States Of Micronesia',
    FL: 'Florida',
    GA: 'Georgia',
    GU: 'Guam',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MH: 'Marshall Islands',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    MP: 'Northern Mariana Islands',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PW: 'Palau',
    PA: 'Pennsylvania',
    PR: 'Puerto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VI: 'Virgin Islands',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
};
const apiKey = 'xZh8yIqwos2YqD9qmoiWf6SY2U9OvRmeKcr46WF9';

function generateStateOptions() {
    for (let i=0; i<Object.keys(statesList).length; i++) {
        let stateCode = Object.keys(statesList)[i];
        let stateName = Object.values(statesList)[i];

        $('.scroll').append(`<input type="checkbox" class="state" id="${stateName}" value="${stateCode}"> ${stateName}<br>`);
    }
}

function generateSubmitButton() {
    $('.stateChoice').append(`<input type="submit" value="Submit">`);
}

function handleSubmitButton() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        generateFetchRequest();
    });
}

function createUrl() {
    let checkedItem = $('.state:checked').val().toLowerCase();
    let maxInput = $('.limit').val();
    return `https://api.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=${checkedItem}&limit=${maxInput}`;
}

function generateFetchRequest() {
    fetch(createUrl())
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => handleDisplayResults(responseJson))
        .catch(err => $('.results').empty().append('Something went wrong: ' + err.message));
}

function handleDisplayResults(responseJson) {
    $('.results').empty();

    let results = [];
    for (let i = 0; i < responseJson.data.length; i++) {
        results.push(`
            <section class="park">
                <b>Name:</b> ${responseJson.data[i].fullName}<br>
                <b>Description:</b> ${responseJson.data[i].description}<br>
                <b>Website:</b> <a href="afgadsfd" target="_blank">${responseJson.data[i].url}</a>
            </section>
        `);
    }
    results.join('');

    $('.results').append(results);
}


function renderPage() {
    generateStateOptions();
    generateSubmitButton();
    handleSubmitButton();
}
$(renderPage);