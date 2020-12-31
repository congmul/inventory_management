$(document).ready(() => {

    // ======================== FOR Cymbals ================================================
    const displayPackwithCymbals = $("#displayPackwithCymbals");
    const searchWindowOnView = $("#searchWindowOnView");
    const addCymbalsWindow = $("#addCymbalsWindow");

    // $("#cymbal-menu-On-view").on("click", (e) => {
    //     e.preventDefault();

    //     let query = `
    //     <form class="col s12 m12 l12">
    //         <div class="row">
    //             <div class="col s12 m3">
    //                 <select name="category01" class="browser-default post_input_boader validateCat" id="category01onView">
    //                     <option value="all" disabled selected>Category01</option>
    //                     <option value="all">All</option>
    //                     <option value="zildjian">Zildjian</option>
    //                     <option value="sabian">Sabian</option>
    //                 </select>
    //             </div>
    //             <div class="col s12 m3">
    //                 <select name="category02" class="browser-default post_input_boader validateCat" id="category02onView">
    //                     <option value="all" disabled selected>Category02</option>
    //                     <option value="all">All</option>
    //                     <option value="ride">Ride</option>
    //                     <option value="hi-hats">Hihats</option>
    //                     <option value="crash">Crash</option>
    //                     <option value="splash">Splash</option>
    //                 </select>
    //             </div>
    //             <div class="col s12 m3">
    //                 <select name="Size" class="browser-default post_input_boader validateCat" id="sizeonView">
    //                     <option value="all" disabled selected>Size</option>
    //                     <option value="all">All</option>
    //                     <option value="14">14 inch</option>
    //                     <option value="15">15 inch</option>
    //                     <option value="16">16 inch</option>
    //                     <option value="17">17 inch</option>
    //                     <option value="18">18 inch</option>
    //                     <option value="19">19 inch</option>
    //                     <option value="20">20 inch</option>
    //                     <option value="21">21 inch</option>
    //                 </select>
    //             </div>
    //             <div class="col s12 m3">
    //             <button id="searchCymbals" class="btn black-text waves-effect">Search</button>
    //             </div>
    //         </div>
    //     </form>
    //     `;
    //     searchWindowOnView.html(query);
    // });
    

    $(document).on("click", "#searchCymbals", (e) =>{
        e.preventDefault();
        if($("#category01onView").val() === null){
            alert("Select Category01");
        }
        if($("#category02onView").val() === null){
            alert("Select Category02");
        }
        if($("#sizeonView").val() === null){
            alert("Select Size");
        }

        let category01onView = $("#category01onView").val().trim();
        let category02onView = $("#category02onView").val().trim();
        let sizeonView = $("#sizeonView").val().trim();
        $.ajax("api/cymbals/" + category01onView + "/" + category02onView + "/" + sizeonView, {
            type: "GET"
        }).then(res => {
            console.log(res);
            let cymbalLists = ``;
            for(let i = 0; i < res.length; i++){
                cymbalLists += `<tr>
                    <td><button class="cymbal-package-btn" data-id="${res[i].group_id}">${res[i].group_code}</button></td>
                    <td>${res[i].category01}</td>
                    <td>${res[i].category02}</td>
                    <td>${res[i].size}</td>
                    <td>${res[i].description}</td>
                    <td>${res[i].code}</td>
                    <td>${res[i].qty}</td>
                    <td>$ ${res[i].ebay_price}</td>
                    <td>$ ${res[i].website_price}</td>
                </tr>`
            }
            let query = `
            <!-- Display cymbals -->
    <table class="highlight centered">
        <thead style="font-weight: bold;">
            <tr>
                <th>Package Code</th>
                <th>Category01</th>
                <th>Category02</th>
                <th>Size</th>
                <th>Description</th>
                <th>Code</th>
                <th>QTY</th>
                <th>eBay Price</th>
                <th>Website Price</th>
            </tr>
        </thead>

        <tbody>
                ${cymbalLists}
        </tbody>
    </table>
    <div id="displayPackwithCymbals"></div>
<div class="row"></div>
<!-- Display cymbals -->
            `;
            $("#resultOfsearch").html(query);
        });
    });


    // When a user click pack's code
    $(document).on("click", ".cymbal-package-btn", (e) => {
        e.preventDefault();

        console.log($(e.target).data("id"));
        let id = $(e.target).data("id");
        $.ajax("/api/package/" + id, {
            type: "GET"
        }).then(res => {
            console.log(res);
            let ebayGross = 0;
            let websiteGross = 0;
            let ebayNet = 0;
            let websiteNet = 0;
            
            let cymbalsQuery = ``;
            for(let i = 0; i < res.length; i++){
                ebayGross += res[i].ebay_price;
                websiteGross += res[i].website_price;
                cymbalsQuery += `
                <tr>
                    <td>${res[i].code}</td>
                    <td>${res[i].description}</td>
                    <td>${res[i].category02}</td>
                    <td>${res[i].size} inch</td>
                    <td contenteditable='true' class="ebay_price" data-id="${res[i].cymbal_id}">$ ${res[i].ebay_price}</td>
                    <td contenteditable='true' class="website_price" data-id="${res[i].cymbal_id}">$ ${res[i].website_price}</td>
                </tr>`
            }
            ebayNet = ebayGross * 0.88;
            websiteNet = websiteGross * 0.96;
            let ebayMargin =  (ebayNet - res[0].dealer_price) / res[0].dealer_price  * 100;
            let websiteMargin = (websiteNet - res[0].dealer_price) / res[0].dealer_price  * 100;

            let query = `  
<div id="packageWithCymbal" class="modal">
    <div class="modal-content">
        <h5>${res[0].category} ${res[0].description_pack} |  ${res[0].code_pack}  |  $${res[0].dealer_price}</h5>
        <p id="confirm-message" style="color:red; font-size:14px; display:none; padding:5px; width:100%; background-color:#ccc; text-align:center;">The Price is changed. Please click refresh button on bottom.</p>
            <table class="highlight centered" style="margin-top:25px;">
                <thead style="font-weight: bold;">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>eBay Price</th>
                        <th>Website Price</th>
                    </tr>
                </thead>
                <tbody>
                ${cymbalsQuery}
                </tbody>
            </table>
        <!--Gross Fee Margin-->
        <div style="margin-top:25px;">
        <table class="highlight centered">
<thead style="font-weight: bold;">
<tr>
                        <th>Platform</th>
                        <th>Gross</th>
                        <th>Fee</th>
                        <th>Net</th>
                        <th>Margin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: bold;">ebay : </td>
                        <td>$ ${ebayGross}</td>
                        <td contenteditable='true'>12%</td>
                        <td>$ ${ebayNet.toFixed(2)}</td>
                        <td>${ebayMargin.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold;">website : </td>
                        <td>$ ${websiteGross}</td>
                        <td contenteditable='true'>4%</td>
                        <td>$ ${websiteNet.toFixed(2)}</td>
                        <td>${websiteMargin.toFixed(2)}%</td>
                    </tr>
                </tbody>
        </table>
        </div>
    </div>
    <div class="modal-footer">
        <a href="#!" class="waves-effect waves-green btn-flat" data-id="${id}" id="modal-refresh">Refresh</a>
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
    </div>
</div>`
          displayPackwithCymbals.html(query);

          // Implement modal and Open it manually
          $("#packageWithCymbal").modal();
          $("#packageWithCymbal").modal('open');
        })
    });

    // Editing eBay / Website _ Price

    $(document).on("focusout",".ebay_price", (e) => {
        e.preventDefault();
        let id = $(e.target).data("id");
        let ebay_price = e.target.innerText.substring(2);
        console.log("ID");
        console.log(id);
        console.log("TEXT");
        console.log(ebay_price);
        $.ajax("/api/inventory", {
            type: "PUT",
            data: {
                "id": id,
                "ebay_price": ebay_price
            }
        }).then(data => {
            $("#confirm-message").css("display","block");
            setTimeout(()=>{
                $("#confirm-message").css("display","none");
            }, 4000);
            
        });
    });

    $(document).on("focusout",".website_price", (e) => {
        e.preventDefault();
        let id = $(e.target).data("id");
        let website_price = e.target.innerText.substring(2);
        console.log("ID");
        console.log(id);
        console.log("TEXT");
        console.log(website_price);
        $.ajax("/api/inventory", {
            type: "PUT",
            data: {
                "id": id,
                "website_price": website_price
            }
        }).then(data => {
            $("#confirm-message").css("display","block");
            setTimeout(()=>{
                $("#confirm-message").css("display","none");
            }, 4000);
        });
    });


    // Refresh Modal after clicking refresh button.
    $(document).on("click", "#modal-refresh", (e) =>{
        e.preventDefault();
        console.log($(e.target));
        $("#packageWithCymbal").modal('close');

        //--> REFRESH MODAL
        let id = $(e.target).data("id");
        $.ajax("/api/package/" + id, {
            type: "GET"
        }).then(res => {
            console.log(res);
            let ebayGross = 0;
            let websiteGross = 0;
            let ebayNet = 0;
            let websiteNet = 0;
            
            let cymbalsQuery = ``;
            for(let i = 0; i < res.length; i++){
                ebayGross += res[i].ebay_price;
                websiteGross += res[i].website_price;
                cymbalsQuery += `
                <tr>
                    <td>${res[i].code}</td>
                    <td>${res[i].description}</td>
                    <td>${res[i].category02}</td>
                    <td>${res[i].size} inch</td>
                    <td contenteditable='true' class="ebay_price" data-id="${res[i].cymbal_id}">$ ${res[i].ebay_price}</td>
                    <td contenteditable='true' class="website_price" data-id="${res[i].cymbal_id}">$ ${res[i].website_price}</td>
                </tr>`
            }
            ebayNet = ebayGross * 0.88;
            websiteNet = websiteGross * 0.96;
            let ebayMargin =  (ebayNet - res[0].dealer_price) / res[0].dealer_price  * 100;
            let websiteMargin = (websiteNet - res[0].dealer_price) / res[0].dealer_price  * 100;

            let query = `  
<div id="packageWithCymbal" class="modal">
    <div class="modal-content">
        <h5>${res[0].category} ${res[0].description_pack} |  ${res[0].code_pack}  |  $${res[0].dealer_price}</h5>
        <p id="confirm-message" style="color:red; font-size:14px; display:none; padding:5px; width:100%; background-color:#ccc; text-align:center;">The Price is changed. Please click refresh button on bottom.</p>
            <table class="highlight centered" style="margin-top:25px;">
                <thead style="font-weight: bold;">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>eBay Price</th>
                        <th>Website Price</th>
                    </tr>
                </thead>
                <tbody>
                ${cymbalsQuery}
                </tbody>
            </table>
        <!--Gross Fee Margin-->
        <div style="margin-top:25px;">
        <table class="highlight centered">
<thead style="font-weight: bold;">
<tr>
                        <th>Platform</th>
                        <th>Gross</th>
                        <th>Fee</th>
                        <th>Net</th>
                        <th>Margin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: bold;">ebay : </td>
                        <td>$ ${ebayGross}</td>
                        <td contenteditable='true'>12%</td>
                        <td>$ ${ebayNet.toFixed(2)}</td>
                        <td>${ebayMargin.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold;">website : </td>
                        <td>$ ${websiteGross}</td>
                        <td contenteditable='true'>4%</td>
                        <td>$ ${websiteNet.toFixed(2)}</td>
                        <td>${websiteMargin.toFixed(2)}%</td>
                    </tr>
                </tbody>
        </table>
        </div>
    </div>
    <div class="modal-footer">
        <a href="#!" class="waves-effect waves-green btn-flat" data-id="${id}" id="modal-refresh">Refresh</a>
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
    </div>
</div>`
          displayPackwithCymbals.html(query);

          // Implement modal and Open it manually
          $("#packageWithCymbal").modal();
          $("#packageWithCymbal").modal('open');
        })
        // REFRESH MODAL <--

    });

     // ======================== FOR Add Cymbals ================================================

    $(document).on("click","#addCymbals" , (e) => {
        e.preventDefault();
        
        $.ajax("api/addcymbals/", {
            type: "GET"
        }).then(res => { 
            let categoryQuery = ``;
            for(let i = 0; i < res.res.length; i++){
                console.log(res.res[i].id);
                console.log(res.res[i].discription);
                categoryQuery += `<option value="${res.res[i].id}">${res.res[i].discription}</option>`;
            }
            addCymbalQuery = `
            <div id="addCymbalsModal" class="modal">
            <div class="modal-content">
            <!-- Inside Modal -->

            <div class="center" style="margin-bottom: 2%;">
    <div class="row">
        <h3 class="" style="margin-bottom: 2%;">New Cymbal</h3>
    </div>
    <div class="row">
        <div>
        <a href="/uploadCymbalsCSV" class="left btn white-text waves-effect blue" style="margin-bottom: 50px;">Upload CSV file</a>
        </div>
        <form class="col s12 m12 l12 newItem">
            <div class="row">
                <div class="col s12 m2">
                    <label for="category01" class="left black-text">Category01 <sup><i
                                class="fas fa-star-of-life red-text starIcon"></i></sup></label>
                </div>
                <div class="col s12 m10">
                    <select name="category01" class="browser-default post_input_boader validateCat" id="category01">
                        <option value="" disabled selected>Choose your option</option>
                        <option value="zildjian">Zildjian</option>
                        <option value="sabian">Sabian</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m2">
                    <label for="category02" class="left black-text">Category02 <sup><i
                                class="fas fa-star-of-life red-text starIcon"></i></sup></label>
                </div>
                <div class="col s12 m10">
                    <select name="category02" class="browser-default post_input_boader validateCat" id="category02">
                        <option value="" disabled selected>Choose your option</option>
                        <option value="ride">Ride</option>
                        <option value="hihats">Hihats</option>
                        <option value="crash">Crash</option>
                        <option value="splash">Splash</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m2">
                    <label for="cymbal-size" class="left black-text">Size <sup><i
                                class="fas fa-star-of-life red-text starIcon"></i></sup></label>
                </div>
                <div class="col s12 m10">
                    <select name="cymbal-size" class="browser-default post_input_boader validateCat" id="cymbal-size">
                        <option value="" disabled selected>Choose your option</option>
                        <option value="14">14 inch</option>
                        <option value="15">15 inch</option>
                        <option value="16">16 inch</option>
                        <option value="17">17 inch</option>
                        <option value="18">18 inch</option>
                        <option value="20">20 inch</option>
                        <option value="21">21 inch</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="Description" id="description-item-input" type="text" class="validate"
                        required="true">
                    <label for="Description" class="black-text">Description<sup><i
                                class="fas fa-star-of-life red-text starIcon"></i></sup></label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="item-code-input" id="item-code-input" type="text" class="validate"
                        required="true">
                    <label for="item-code-input" class="black-text">Item Code<sup><i
                                class="fas fa-star-of-life red-text starIcon"></i></sup></label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="QTY" id="qty-input" type="text" class="validate"
                        required="true">
                    <label for="QTY" class="black-text">QTY<sup><i
                                class="fas fa-star-of-life red-text starIcon"></i></sup></label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="ebay-price-input" id="ebay-price-input" type="text" class="validate"
                        required="true">
                    <label for="ebay-price-input" class="black-text">eBay Price<sup><i
                                class="fas fa-star-of-life red-text starIcon"></i></sup></label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="website-price-input" id="website-price-input" type="text" class="validate"
                        required="true">
                    <label for="website-price-input" class="black-text">Website Price<sup><i
                                class="fas fa-star-of-life red-text starIcon"></i></sup></label>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m2">
                    <label for="Group Code " class="left black-text">Group Code <sup><i
                                class="fas fa-star-of-life red-text starIcon"></i></sup></label>
                </div>
                <div class="col s12 m10">
                    <select name="Group Code " class="browser-default post_input_boader validateCat" id="group-id">
                        <option value="" disabled selected>Choose your option</option>
                        ${categoryQuery}
                    </select>
                </div>
            </div>
            <button id="add-Cymbal-Btn" class="btn black-text blue lighten-4 waves-effect">Add</button>
        </form>
    </div>
</div>

            <!-- Inside Modal -->
            </div>
            <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-grey btn-flat">close</a>
        </div>
        </div>
                `;
                addCymbalsWindow.html(addCymbalQuery);
        
                // Implement modal and Open it manually
                $("#addCymbalsModal").modal();
                $("#addCymbalsModal").modal('open');

        });
    });


    $(document).on("click","#add-Cymbal-Btn", (e) => {
        e.preventDefault();
        console.log("test");
        let category01 = $("#category01");
        let category02 = $("#category02");
        let cymbalSize = $("#cymbal-size");
        let description = $("#description-item-input");
        let code = $("#item-code-input");
        let qty = $("#qty-input");
        let ebay_price = $("#ebay-price-input");
        let website_price = $("#website-price-input");
        let groupId = $("#group-id");
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
        $.post("/api/newcymbal", newItem).then((result) =>{
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
            alert("Added the cymbal");
            window.location.replace("/cymbals");
        });
    });


    // ======================== FOR Add Cymbal Packs ================================================



});