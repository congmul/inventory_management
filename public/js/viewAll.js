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
            let query = `  <div id="packageWithCymbal" class="modal">
            <div class="modal-content">
            <table class="highlight centered">
            <thead style="font-weight: bold;">
                <tr>
                    <th>Package Code</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Dealer Price</th>
                    <th>Net</th>
                    <th>eBay Margin</th>
                    <th>website Margin</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>${res[0].code_pack}</td>
                <td>${res[0].category}</td>
                <td>${res[0].description}</td>
                <td>${res[0].dealer_price}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
          </div>`
          
          displayPackwithCymbals.html(query);
          $("#packageWithCymbal").modal();
          $("#packageWithCymbal").modal('open');
        })
    });

});