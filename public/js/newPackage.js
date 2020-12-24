$(document).ready(function() {

    let category = $("#category");
    let descriptionInput = $("#description_input");
    let productCodeInput = $("#product_Code_input");
    let dealerPriceInput = $("#dealer_Price_input");

    $("#addPackBtn").on("click", (e) => {
        e.preventDefault();
        
        const newPackage = {
            category : category.val(),
            description : descriptionInput.val(),
            group_code : productCodeInput.val(),
            dealer_price : dealerPriceInput.val()
        }

        $.post("/api/cymbalPack", newPackage).then((result) =>{
            console.log(result);
            category.val("");
            descriptionInput.val("");
            productCodeInput.val("");
            dealerPriceInput.val("");

            window.location.replace("/");
        });
    });

});