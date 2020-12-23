
$(document).ready(function () {
    let contents = [];

    $("#checking-csv-btn-cymbal").on("click", (e) => {
        e.preventDefault();
        let rdrCymbal = new FileReader();
        let csvDataCymbal;
        
        rdrCymbal.onload = (e) => {
            console.log(e.target.result);
            csvDataCymbal = e.target.result.split(/\r\n|\n/);
            // console.log(csvDataCymbal);
            for(let i = 1; i < csvDataCymbal.length; i++){
                let tempArr =  csvDataCymbal[i].split(",");
                    contents.push({
                        "category01" : tempArr[0].trim(),
                        "category02" : tempArr[1].trim(),
                        "size" : tempArr[2].trim(),
                        "description" :tempArr[3].trim(),
                        "code" :tempArr[4].trim(),
                        "qty" :tempArr[5].trim(),
                        "ebay_price" :tempArr[6].trim(),
                        "website_price" :tempArr[7].trim(),
                        "group_id" :tempArr[8].trim()
                    });
                let trEl = $("<tr>");
                for(let j = 0; j < tempArr.length; j++){
                    trEl.append($("<td>").text(tempArr[j])); 
                }    
                   
                $("#table-cymbal-Uploaded").append(trEl);
            }
            $("#documentTemplate").css("display", "none");
            $("#cymbal-Uploaded").css("display", "block");
        }
        rdrCymbal.readAsText($("#csvFile-Cymbal-Upload")[0].files[0]);
    });

    $("#upload-cymbal-csv-btn").on("click", (e) =>{
        e.preventDefault();
        console.log(contents);
        $.post("/api/cymbals",{contents:contents}).then((res) =>{
            alert("The file is uploaded");
            location.reload();
        });
    });
    


});