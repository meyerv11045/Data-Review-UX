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

function displayImages(){
    const nav = document.querySelector("div.navigation");
    nav.style.display = "block";
    
    let home = document.querySelector("div.home");
    home.style.display = "none";
    
    
    if (!document.querySelector("button.next")){
        let next = document.createElement("button");
        next.innerHTML = "Next";
        next.className = "next"
        next.onclick = () => {
            console.log("Next");
            entry++;
        };
        
        let previous = document.createElement("button");
        previous.innerHTML = "Previous";
        previous.onclick = () => {
            console.log("Previous");
            entry--;
        };

        let home_btn = document.createElement("button");
        home_btn.innerHTML = "Home";
        home_btn.onclick =() => {
            home.style.display = "block";
            nav.style.display = "none";
        }

        nav.appendChild(home_btn);
        nav.appendChild(previous);
        nav.appendChild(next);
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