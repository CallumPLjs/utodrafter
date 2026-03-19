const form = document.getElementById("myForm");
const fill = document.getElementById("autofill");
const clear = document.getElementById("clear");

clear.addEventListener("click", (event) => {
    event.preventDefault(); // prevent form from submitting and reloading the page
    location.reload();
});

fill.addEventListener("click", (event) => {
    event.preventDefault(); // prevent form from submitting and reloading the page
    document.getElementById("land").value = 2400;
    document.getElementById("homes").value = 0.2;
    document.getElementById("military").value = 12500;
    document.getElementById("total_pop").value = 67500;
    document.getElementById("peons").value = 50000;
    document.getElementById("dr_sci").value = 1.12;
    document.getElementById("pop_sci").value = 1.15;
    document.getElementById("rit_eff").value = 95;
    document.getElementById("ticks1").value = 35;
    document.getElementById("guilds").value = 180;
});

function checkInputLength() {
    let input_length = document.getElementsByClassName("input_field");
        
    for (let i = 0; i < input_length.length; i++){
        
        let input = input_length[i].value;
        if (input.length > 7) {
            input_length[i].nextElementSibling.textContent = 'Must be 7 digits or less';
            e.preventDefault();
            return false; // Stop script execution
        } else {
            input_length[i].nextElementSibling.textContent = '';
        }
    }

    let input_length_s = document.getElementsByClassName("input_field_s");
        
    for (let i = 0; i < input_length_s.length; i++){
        
        let input_s = input_length_s[i].value;
        if (input_s.length > 3) {
            input_length_s[i].nextElementSibling.textContent = 'Must have max 3 digits.';
            e.preventDefault();
            return false; // Stop script execution
        } else {
            input_length_s[i].nextElementSibling.textContent = '';
        }
    }

    let input_length_sx = document.getElementsByClassName("input_field_sx");
        
    for (let i = 0; i < input_length_sx.length; i++){
        
        let input_sx = input_length_sx[i].value;
        if (input_sx.length > 4) {
            input_length_sx[i].nextElementSibling.textContent = 'Must have max 2 decimals.';
            e.preventDefault();
            return false; // Stop script execution
        } else {
            input_length_sx[i].nextElementSibling.textContent = '';
        }
    }
};

function getInputValues() {
    const land = parseFloat(document.getElementById("land").value);
    // land = land.replace(/<[^>]*>?/gm, '');
    const homes = parseFloat(document.getElementById("homes").value);
    const total_pop = parseFloat(document.getElementById("total_pop").value);
    const peons = parseFloat(document.getElementById("peons").value);
    const t1 = parseFloat(document.getElementById("ticks1").value);

    const military = parseFloat(document.getElementById("military").value);
    const dr_sci = parseFloat(document.getElementById("dr_sci").value);
    const ritual = parseFloat(document.getElementById("rit_eff").value);
    const pop_sci = parseFloat(document.getElementById("pop_sci").value);
    const guilds = parseFloat(document.getElementById("guilds").value);

    const spells = document.getElementById("pat");
    const dr_opt = document.getElementById("dr");
    const honor = document.getElementById("honor");

    return [land, homes, total_pop, peons, t1, military, dr_sci, ritual, pop_sci, guilds, spells, dr_opt, honor];
};

function getSelectValues() {
    let results = getInputValues();
    let spells = results[10];
    let dr_opt = results[11];
    let honor = results[12];

    const spellOptions = spells.selectedOptions;
    const spellValues = [];
    for (let i = 0; i < spellOptions.length; i++) {
    spellValues.push(spellOptions[i].value);
    }
    let spell = spellValues[0];
    if (spell == 'yes') {
        pat = 1.3;
    }


    const draftOptions = dr_opt.selectedOptions;
    const draftValues = [];
    for (let i = 0; i < draftOptions.length; i++) {
    draftValues.push(draftOptions[i].value);
    }
    let draft = draftValues[0];
    if (draft == 'res') {
        dr = 0.005
    } else if (draft == 'nor') {
        dr = 0.01
    } else if (draft == 'agg') {
        dr = 0.015
    } else if (draft == 'eme') {
        dr = 0.02
    }
    
    const rankOptions = honor.selectedOptions;
    const rankValues = [];

    for (let i = 0; i < rankOptions.length; i++) {
    rankValues.push(rankOptions[i].value);
    }

    let pop_honor = rankValues[0];
    if (pop_honor == 'pea') {
        pop_hon = 1
    } else if (pop_honor == 'kni') {
        pop_hon = 1.01
    } else if (pop_honor == 'lor') {
        pop_hon = 1.02
    } else if (pop_honor == 'bar') {
        pop_hon = 1.03
    } else if (pop_honor == 'vis') {
        pop_hon = 1.04
    } else if (pop_honor == 'cou') {
        pop_hon = 1.06
    } else if (pop_honor == 'mar') {
        pop_hon = 1.08
    } else if (pop_honor == 'duk') {
        pop_hon = 1.1
    } else if (pop_honor == 'pri') {
        pop_hon = 1.12
    }

    return [pat, dr, pop_hon, spell, draft, pop_honor];

};

function fillTable() {
    
    let results = getInputValues();
    let selectResults = getSelectValues();

    let land = results[0];
    let homes = results[1];
    let total_pop = results[2];
    let peons = results[3];
    let t1 = results[4];
    let military = results[5];
    let dr_sci = results[6];
    let ritual = results[7];
    let pop_sci = results[8];
    let guilds = results[9];
    let pat = selectResults[0];
    let dr = selectResults[1];
    let pop_hon = selectResults[2];

    let solds_drafted = 0;
    let initial_peons = peons;
    let home_peons = Math.floor((land*homes*10)*pop_sci*pop_hon);
    let wiz_prod = Math.floor(guilds*0.02);
    let total_peons = Math.floor(peons + home_peons);
    let total_solds = solds_drafted;
    let total_military = military;
    let tot_pop = total_pop + home_peons + wiz_prod;
    let mpa = total_military/land;
    let ppa = total_peons/land;
    let rit = 1+(((ritual/100)*20)/100);
    let dr_perc = (total_military*100)/tot_pop;

    let table = document.getElementById("tab1");
    table.innerHTML = "";

    for (let hrs = 0; hrs<t1; hrs++) {

        let row = table.insertRow(hrs);
        let tickCell = row.insertCell(0);
        let peonCell = row.insertCell(1);
        let ppaCell = row.insertCell(2);
        let draftedCell = row.insertCell(3);
        let totalSoldsCell = row.insertCell(4);
        let militaryCell = row.insertCell(5);
        let drPercCell = row.insertCell(6);
        let mpaCell = row.insertCell(7);

        // row = table.insertRow(hrs+1);
        tickCell.innerHTML = hrs+1;
        
        solds_drafted = Math.floor(total_peons*dr*pat*rit*dr_sci);
        rit = rit - 0.0004;
        
        total_peons = total_peons - solds_drafted - wiz_prod;
        peonCell.innerHTML = total_peons;
        ppa = (total_peons/land).toFixed(2);
        ppaCell.innerHTML = ppa;
        
        draftedCell.innerHTML = solds_drafted;
        total_solds += solds_drafted;
        totalSoldsCell.innerHTML = total_solds;
        
        total_military += solds_drafted;
        militaryCell.innerHTML = total_military;
        dr_perc = ((total_military*100)/tot_pop).toFixed(1);
        drPercCell.innerHTML = dr_perc;
        mpa = (total_military/land).toFixed(2);
        mpaCell.innerHTML = mpa;
    }
    return [initial_peons, homes, total_solds, t1, total_military, mpa, total_peons, ppa];
    
};

function buildResultCard() {
    
    let result = fillTable();

    let initial_peons = result[0];
    let homes = result[1];
    let total_solds = result[2];
    let t1 = result[3];
    let total_military = result[4];
    let mpa = result[5];
    let total_peons = result[6];
    let ppa = result[7];

    let selectResults = getSelectValues();
    let spell = selectResults[3];
    let draft = selectResults[4];
    let rank = selectResults[5];

    let card_container = document.getElementById("results");
    // card_container.classList.add("grid-container", "results");
    // document.body.appendChild(card_container);
    let card = document.createElement("div");
    card.classList.add("grid-item","result-card");
    card_container.appendChild(card);


    let cardTop = document.createElement("div");
    cardTop.classList.add("card-part", "card-top", "parameter");
    card.appendChild(cardTop);

    let p0 = document.createElement("p");
    p0.innerHTML = "<h4>Starting values</h4>";
    cardTop.appendChild(p0);

    let p1 = document.createElement("p");
    p1.innerHTML = "Peons: <span style=color:green>" + initial_peons + "</span>" + " || " + "Future homes: <span style=color:green>" + homes*100 + "%</span>";
    cardTop.appendChild(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = "Pat active: <span style=color:red>" + spell + "</span>" + " || " + "Draft rate: <span style=color:red>" + draft + "</span>";
    cardTop.appendChild(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "Ritual strength: <span style=color:yellow>" + document.getElementById("rit_eff").value + "</span>"+ " || " + "Rank: <span style=color:red>" + rank + "</span>";
    cardTop.appendChild(p3);



    let cardBottom = document.createElement("div");
    cardBottom.classList.add("card-part", "card-bottom", "end-list");
    card.appendChild(cardBottom);

    let p20 = document.createElement("p");
    p20.innerHTML = "<h4>Resulting values</h4>";
    cardBottom.appendChild(p20);

    let p21 = document.createElement("p");
    p21.innerHTML =  "Total sold drafted: <span style=color:green>" + total_solds + "</span>" + " || " + "Ticks: <span style=color:green>" + t1 + "</span>";    
    cardBottom.appendChild(p21);

    let p22 = document.createElement("p");
    p22.innerHTML = "Final peons: <span style=color:green>" + total_peons + "</span>" + " || " + "Ppa: <span style=color:green>" + ppa + "</span>";
    cardBottom.appendChild(p22);

    let p23 = document.createElement("p");
    p23.innerHTML = "Final military: <span style=color:green>" + total_military + "</span>" + " || " + "Mpa: <span style=color:green>" + mpa + "</span>";
    cardBottom.appendChild(p23);

};

form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent form from submitting and reloading the page
    checkInputLength();
    fillTable();
    buildResultCard();
});