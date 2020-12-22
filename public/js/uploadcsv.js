
$(document).ready(function () {

    $("#uploadcsvbtn").on("click", (e) => {
        e.preventDefault();
        let rdr = new FileReader();
        let csvData;
        let contents = [];
        rdr.onload = (e) => {
            console.log(e.target.result);
            csvData = e.target.result.split(/\r\n|\n/);
            console.log(csvData);
            for(let i = 1; i < csvData.length; i++){
                let tempArr =  csvData[i].split(",");
                    contents.push({
                        "category" : tempArr[0],
                        "description" :tempArr[1],
                        "group_code" :tempArr[2],
                        "dealer_price" :tempArr[3],
                    });
            }
            console.log(contents);

            $.post("/api/packages",{contents:contents}).then((res) =>{

            })
            
        }
        rdr.readAsText($("#csvFileUpload")[0].files[0]);
    })



});