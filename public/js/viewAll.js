$(document).ready(() => {

    // ======================== FOR Cymbals ================================================
    const displayPackwithCymbals = $("#displayPackwithCymbals");
    const searchWindowOnView = $("#searchWindowOnView");

    $("#cymbal-menu-On-view").on("click", (e) => {
        e.preventDefault();

        let query = `
        <form class="col s12 m12 l12">
            <div class="row">
                <div class="col s12 m3">
                    <select name="category01" class="browser-default post_input_boader validateCat" id="category01onView">
                        <option value="all" disabled selected>Category01</option>
                        <option value="all">All</option>
                        <option value="zildjian">Zildjian</option>
                        <option value="sabian">Sabian</option>
                    </select>
                </div>
                <div class="col s12 m3">
                    <select name="category02" class="browser-default post_input_boader validateCat" id="category02onView">
                        <option value="all" disabled selected>Category02</option>
                        <option value="all">All</option>
                        <option value="ride">Ride</option>
                        <option value="hi-hats">Hihats</option>
                        <option value="crash">Crash</option>
                        <option value="splash">Splash</option>
                    </select>
                </div>
                <div class="col s12 m3">
                    <select name="Size" class="browser-default post_input_boader validateCat" id="sizeonView">
                        <option value="all" disabled selected>Size</option>
                        <option value="all">All</option>
                        <option value="14">14 inch</option>
                        <option value="15">15 inch</option>
                        <option value="16">16 inch</option>
                        <option value="17">17 inch</option>
                        <option value="18">18 inch</option>
                        <option value="19">19 inch</option>
                        <option value="20">20 inch</option>
                        <option value="21">21 inch</option>
                    </select>
                </div>
                <div class="col s12 m3">
                <button id="searchCymbals" class="btn black-text waves-effect">Search</button>
                </div>
            </div>
        </form>
        `;
        searchWindowOnView.html(query);
    });
    

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
        <p id="confirm-message" style="color:red; font-size:14px; display:none; padding:5px; width:100%; background-color:#ccc; text-align:center;">The Price is changed</p>
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
            }, 3000);
            
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
            }, 3000);
            
        });
    });

     // ======================== FOR Shure Parts ================================================

    $("#shure-menu-On-view").on("click", (e) => {
        e.preventDefault();
        searchWindowOnView.text("Not Yet!!");
    });
});