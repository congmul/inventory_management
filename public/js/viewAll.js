$(document).ready(() => {
    const displayPackwithCymbals = $("#displayPackwithCymbals");

    $(".cymbal-package-btn").on("click", (e) => {
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
                    <td contenteditable='true'>$ ${res[i].ebay_price}</td>
                    <td contenteditable='true'>$ ${res[i].website_price}</td>
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

});