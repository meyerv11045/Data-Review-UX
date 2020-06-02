let excelRows;
let entry = 0;

function handleFile(event) {
    let files = event.target.files;
    let f = files[0];
    
    let reader = new FileReader();

    reader.onload = function(e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: 'array'});
        processExcel(workbook);
    };
    reader.readAsArrayBuffer(f);
}

function processExcel(workbook) {
    let sheet1 = workbook.SheetNames[0];
    excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet1]);
}

function displayImg(){
    const images = document.querySelector("div.images");
    ff_img_url = excelRows[entry]["FF Image URL"];
    kg_img_url = excelRows[entry]["Kroger Image URL"];
    wmrt_img_url = excelRows[entry]["Walmart Image URL"];

    let img = document.getElementById("FF");
    if (ff_img_url !== "NA") {
        img.src = ff_img_url;
    } else {
        img.src = "../imgs/noImage.jpeg";
    }
    img = document.getElementById("Kroger");
    if (kg_img_url !== "NA") {
        img.src = kg_img_url;
    } else {
        img.src = "../imgs/noImage.jpeg";
    }
    img = document.getElementById("Walmart");
    if (wmrt_img_url !== "NA") {
        img.src = wmrt_img_url;
    } else {
        img.src = "../imgs/noImage.jpeg";
    }
}

function displayUPCInfo(){
    let item = excelRows[entry];
    let ul = document.getElementById("UPCInfo");
    ul.children[0].innerHTML = item["name"];
    ul.children[1].innerHTML = item["sizeDisplay"];
    ul.children[2].innerHTML = item["brand"];
    ul.children[3].innerHTML = item["basePrice"];

    let upc = document.getElementById("ItemID");
    upc.innerHTML = `${item["uuid"]} (Item ${entry + 1} out of ${excelRows.length} in this section)`;

    let kg_url = document.getElementById("KGurl");
    kg_url.href = item["Kroger URL"];
    let wmrt_url = document.getElementById("WMRTurl");
    wmrt_url.href = item["Walmart URL"];
}

function home() {
    const home = document.querySelector("div.home");
    home.style.display = "block";
    const content = document.querySelector("div.review");
    content.style.display = "none";
}

function previous() {
    console.log("Previous");
    entry--;
    displayImg();
    displayUPCInfo();
}

function next() {
    console.log("Next");
    entry++;
    displayImg();
    displayUPCInfo();
}

function displayImages(){
    const content = document.querySelector("div.review");
    content.style.display = "block";

    let home = document.querySelector("div.home");
    home.style.display = "none";

    displayImg();
    displayUPCInfo();
}

const file_input = document.getElementById('fileUpload');
file_input.addEventListener('change',handleFile);

/*
Excel to Json Example Reponse: (each row has a 0 indexed key)
{
    0: {Country: "Mexico", Id: 1, Name: "Vikram "},
    1: {Country: "Canada", Id: 2, Name: "Joen"},
    2: {Country: "USA", Id: 3, Name: "Lucy"}
}
*/