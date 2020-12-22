$(document).ready(function() {

    let category01 = $("#category01");
    let category02 = $("#category02");
    let cymbalSize = $("#cymbal-size");
    let description = $("#description-item-input");
    let code = $("#item-code-input");
    let qty = $("#qty-input");
    let ebay_price = $("#ebay-price-input");
    let website_price = $("#website-price-input");
    let groupId = $("#group-id");

    $("#addItemBtn").on("click", (e) => {
        e.preventDefault();
        
        const newItem = {
            category01 : category01.val().trim(),
            category02 : category02.val().trim(),
            size : cymbalSize.val().trim(),
            description : description.val().trim().toLowerCase(),
            code : code.val().trim().toLowerCase(),
            qty : qty.val().trim(),
            ebay_price : ebay_price.val().trim(),
            website_price : website_price.val().trim(),
            group_id : groupId.val().trim(),
        }
        console.log(newItem);
        $.post("/api/newitem", newItem).then((result) =>{
            console.log(result);
            category01.val("");
            category02.val("");
            cymbalSize.val("");
            description.val("");
            code.val("");
            qty.val("");
            ebay_price.val("");
            website_price.val("");
            groupId.val("");

            window.location.replace("/");
        });
    });

});