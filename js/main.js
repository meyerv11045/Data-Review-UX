let excelRows;

function handleFile(event) {
    let files = event.target.files;
    let f = files[0];
    console.log(f); 

    let reader = new FileReader();

    reader.onload = function(e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: 'array'});
        processExcel(workbook)
    };
    reader.readAsArrayBuffer(f);
}

function processExcel(workbook) {
    let sheet1 = workbook.SheetNames[0];
    excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet1]);
    
}

const file_input = document.getElementById('fileUpload');
file_input.addEventListener('change',handleFile)

/*
Excel to Json Example Reponse: (each row has a 0 indexed key)
{
    0: {Country: "Mexico", Id: 1, Name: "Vikram "},
    1: {Country: "Canada", Id: 2, Name: "Joen"},
    2: {Country: "USA", Id: 3, Name: "Lucy"}
}
*/