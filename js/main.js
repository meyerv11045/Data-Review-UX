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
    upc.innerHTML = item["uuid"]

}

function displayImages(){
    const content = document.querySelector("div.review");
    content.style.display = "block";

    let home = document.querySelector("div.home");
    home.style.display = "none";
    
    if (!document.querySelector("button.next")){
        let next = document.createElement("button");
        next.innerHTML = "Next";
        next.className = "next"
        next.onclick = () => {
            console.log("Next");
            entry++;
            displayImg();
            displayUPCInfo();
        };
        
        let previous = document.createElement("button");
        previous.innerHTML = "Previous";
        previous.onclick = () => {
            console.log("Previous");
            entry--;
            displayImg();
            displayUPCInfo();
        };

        let home_btn = document.createElement("button");
        home_btn.innerHTML = "Home";
        home_btn.onclick =() => {
            home.style.display = "block";
            content.style.display = "none";
        }
        const nav = document.querySelector("div.navigation");
        nav.appendChild(home_btn);
        nav.appendChild(previous);
        nav.appendChild(next);

        displayImg();
        displayUPCInfo();
    }
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