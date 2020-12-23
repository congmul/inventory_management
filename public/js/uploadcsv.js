
$(document).ready(function () {
    let contents = [];

    $("#checking-csv-btn").on("click", (e) => {
        e.preventDefault();
        let rdr = new FileReader();
        let csvData;
        
        rdr.onload = (e) => {
            console.log(e.target.result);
            csvData = e.target.result.split(/\r\n|\n/);
            console.log(csvData);
            for(let i = 1; i < csvData.length; i++){
                let tempArr =  csvData[i].split(",");
                    contents.push({
                        "category" : tempArr[0].trim(),
                        "description" :tempArr[1].trim(),
                        "group_code" :tempArr[2].trim(),
                        "dealer_price" :tempArr[3].trim(),
                    });
                let trEl = $("<tr>");
                for(let j = 0; j < tempArr.length; j++){
                    trEl.append($("<td>").text(tempArr[j])); 
                }    
                   
                $("#table-packages-Uploaded").append(trEl);
            }
            $("#documentTemplate").css("display", "none");
            $("#packages-Uploaded").css("display", "block");
        }
        rdr.readAsText($("#csvFileUpload")[0].files[0]);
    });

    $("#uploadcsvbtn").on("click", (e) =>{
        e.preventDefault();
        console.log(contents);
        $.post("/api/packages",{contents:contents}).then((res) =>{
            alert("The file is uploaded");
            location.reload();
        });
    });
    


});