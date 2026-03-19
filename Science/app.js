const form = document.getElementById("myForm");
const fill = document.getElementById("autofill");
const clear = document.getElementById("clear");

function getInputValues() {
    const unis = parseFloat(document.getElementById("unis").value);
    // land = land.replace(/<[^>]*>?/gm, '');
    const days = parseFloat(document.getElementById("days").value);
    const books = parseFloat(document.getElementById("extra_books").value);

    const fok = document.getElementById("fok");
    const rev = document.getElementById("rev");
    const bookBonus = document.getElementById("book");
   
    const spellUptime = document.getElementById("spell");
    

    return [unis, days, books, fok, rev, bookBonus, spellUptime];
};

function getSelectValues() {
    let results = getInputValues();
    let uniRaw = results[0];
    let days = results[1];
    let foks = results[3];
    let revs = results[4];
    let bookBonus = results[5];
    let spellUptime = results[6];

    let uniBookBonus = 1;
    let uniSciBonus = 1;
    if (uniRaw>50) {
        uniBookBonus = 1+(0.5*0.5);
        uniSciBonus = 1+(2*(0.5*0.5));
    } else {
        uniBookBonus = (1+(uniRaw/100)*((100-uniRaw)/100));
        uniSciBonus = (1+(2*(uniRaw/100)*((100-uniRaw)/100)));
    }

    const foksOptions = foks.selectedOptions;
    const foksValues = [];
    for (let i = 0; i < foksOptions.length; i++) {
        foksValues.push(foksOptions[i].value);
    }
    let fokv = foksValues[0];
    let fok = 0;
    if (fokv == 'yes') {
        fok = 10;
    }

    const revsOptions = revs.selectedOptions;
    const revsValues = [];
    for (let i = 0; i < revsOptions.length; i++) {
        revsValues.push(revsOptions[i].value);
    }
    let revv = revsValues[0];
    
    let rev = 0;
    if (revv == 'yes') {
        rev = 30;
    } else {
        rev = 0;
    }

    const booksOptions = bookBonus.selectedOptions;
    const booksValues = [];
    for (let i = 0; i < booksOptions.length; i++) {
        booksValues.push(booksOptions[i].value);
    }
    let bookv = booksValues[0];
    let bookB = 1;
    if (bookv == '0') {
        bookB = 1;
    } else if (bookv == '10') {
        bookB = 1.1;
    } else if (bookv == '15') {
        bookB = 1.15;
    } else if (bookv == '20') {
        bookB = 1.2;
    } else if (bookv == '25') {
        bookB = 1.25;
    }

    const spellUpOptions = spellUptime.selectedOptions;
    const spellUpValues = [];
    for (let i = 0; i < spellUpOptions.length; i++) {
        spellUpValues.push(spellUpOptions[i].value);
    }
    let spellUpv = spellUpValues[0];
    let spellUp = 1;
    if (spellUpv == '50') {
        spellUp = 0.5;
    } else if (spellUpv == '60') {
        spellUp = 0.6;
    } else if (spellUpv == '65') {
        spellUp = 0.65;
    } else if (spellUpv == '75') {
        spellUp = 0.75;
    } else if (spellUpv == '85') {
        spellUp = 0.85;
    } else if (spellUpv == '92') {
        spellUp = 0.92;
    }

    return [uniBookBonus, uniSciBonus, fok, rev, bookB, spellUp,foksValues[0],revsValues[0],booksValues[0],spellUpValues[0]];

};

function getResult() {
    let fields = getInputValues();
    let days = fields[1];
    let ticks = days*24;
    let extraBooks = fields[2];
    let selects = getSelectValues();
    let uniBB = selects[0].toFixed(2);
    let uniSB = selects[1].toFixed(2);
    let fok = selects[2];
    let rev = selects[3];
    let otherBB = selects[4];
    let spellUptime = selects[5];



    let s1 = new Scientist();
    let s2 = new Scientist();
    let s3 = new Scientist();
    let s4 = new Scientist();
    let s5 = new Scientist();

    let scientists = [s1, s2, s3, s4, s5];
    let totalBooks = extraBooks;
    let sciGen = 0;  
    let netRev = 1+((rev*spellUptime)/100);
    
    let sciGenStep = (2*uniSB*netRev);
    console.log(sciGenStep);
    let netFok = 1+((fok*spellUptime)/100);
    let bookProdMultiplier = (netFok*otherBB*uniBB);
    console.log(bookProdMultiplier);

    let table = document.getElementById("tab2");
    table.innerHTML = "";
    let header = document.getElementById("header2");
    

    for (let i=0; i<ticks; i++) {
        
        let row = table.insertRow(i);
        let tickCell = row.insertCell(0);
        let dayCell = row.insertCell(1);
        let TBCell = row.insertCell(2);
        sciGen += sciGenStep;
        
        if (sciGen>=100) {
            sciGen -=100;
            scientists.push(new Scientist());
            let sciIndex = scientists.length+2;
            let headerCell = header.insertCell(sciIndex);
            headerCell.innerHTML = 'S'+(sciIndex-2);                       
        }
               
        // let totalExp = 0;
        // let bookProd = 70;
        scientists.forEach(function(element, index) {
            let cell = row.insertCell(index+3);
            // console.log('initial total books: ' + totalBooks);
            let totalExp = Math.floor(element.setExp(bookProdMultiplier));
            let bookProd = Math.floor((element.setProd(element.setRank(totalExp)))*bookProdMultiplier);

            cell.innerHTML = totalExp.toLocaleString();
            
            // scientist.setProd(scientist.setRank(exp));
            totalBooks += bookProd;
            
            // console.log('sci exp: ' + totalExp); 
            // console.log(' sci prod: ' + bookProd); 
            // console.log('after books: ' + totalBooks);
        });  
        tickCell.innerHTML = i+1;
        dayCell.innerHTML = Math.floor(i/24);
        TBCell.innerHTML = totalBooks.toLocaleString();
              
    }
    return [scientists.length, totalBooks, uniBB, uniSB];
    
}

function buildResultCard() {
    let results = getResult();
    let fields = getInputValues();
    let unis = fields[0];
    let days = fields[1];
    let sciNo = results[0];
    let books = results[1];
    let uniBB = results[2];
    let uniSB = results[3];

    let selValues = getSelectValues();
    let fok = selValues[6];
    let rev = selValues[7];
    let otherBB = selValues[8];
    let spellUp = selValues[9];

    let card_container = document.getElementById("sci_results");
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
    p1.innerHTML = "Fok: <span style=color:green>" + fok + "</span>" + " || " + "Rev: <span style=color:green>" + rev + "</span>";
    cardTop.appendChild(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = "Other book bonus: <span style=color:yellow>" + otherBB + "</span>" + " || " + "Spell uptime: <span style=color:yellow>" + spellUp + "%</span>";
    cardTop.appendChild(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "Uni perc: <span style=color:yellow>" + unis + "%</span>"+ " || " + "Age length: <span style=color:yellow>" + days + "</span> days";
    cardTop.appendChild(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = "Uni B bonus: <span style=color:yellow>" + uniBB + "</span>"+ " || " + "Uni S bonus: <span style=color:yellow>" + uniSB + "</span>";
    cardTop.appendChild(p4);



    let cardBottom = document.createElement("div");
    cardBottom.classList.add("card-part", "card-bottom", "end-list");
    card.appendChild(cardBottom);

    let p20 = document.createElement("p");
    p20.innerHTML = "<h4>Resulting values</h4>";
    cardBottom.appendChild(p20);

    let p21 = document.createElement("p");
    p21.innerHTML =  "Total scientists: <span style=color:green>" + sciNo + "</span>" + " || " + "Ticks: <span style=color:green>" + days*24 + "</span>";    
    cardBottom.appendChild(p21);

    let p22 = document.createElement("p");
    p22.innerHTML = "Final books: <span style=color:green>" + books.toLocaleString() + "</span>";
    cardBottom.appendChild(p22);   
}

clear.addEventListener("click", (event) => {
    event.preventDefault(); // prevent form from submitting and reloading the page
    location.reload();
});

fill.addEventListener("click", (event) => {
    event.preventDefault(); // prevent form from submitting and reloading the page
    document.getElementById("days").value = 15;
    document.getElementById("unis").value =20;
    document.getElementById("extra_books").value =0;
});

form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent form from submitting and reloading the page
    getResult();
    buildResultCard();
});