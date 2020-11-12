var items = [
    {
        "itemId": 1,
        "itemName":"The Hulk Burger",
        "price": 199.00
    },
    {
        "itemId": 2,
        "itemName":"Jack Daniel Burger",
        "price": 189.00
    },
    {
        "itemId": 3,
        "itemName":"Fatty melt Burger",
        "price": 149.00
    },
    {
        "itemId": 4,
        "itemName":"Smokey Chicken Burger",
        "price": 179.00
    },
    {
        "itemId": 5,
        "itemName":"Fiery Chicken Burger",
        "price": 169.00
    },
    {
        "itemId": 6,
        "itemName":"Humming Burger",
        "price": 129.00
    },
    {
        "itemId": 7,
        "itemName":"Veg Cheese Burger",
        "price": 99.00
    },
    {
        "itemId": 8,
        "itemName":"Paneer Burger",
        "price": 109.00
    },
    {
        "itemId": 9,
        "itemName":"Hola Burger",
        "price": 79.00
    },
    {
        "itemId": 10,
        "itemName":"Boring Chicken Burger",
        "price": 99.00
    },
    {
        "itemId": 11,
        "itemName":"Junglee Burger",
        "price": 109.00
    },
    {
        "itemId": 12,
        "itemName": "Devil Burger",
        "price": 119.00
    },
    {
        "itemId": 13,
        "itemName":"Sloppy Joe Burger",
        "price": 139.00
    }
]


var tables = [
    {
        "tableId":1,
        "tableName":"Table-1",
        "items": [],
        "cost": 0.00
    },
    {
        "tableId":2,
        "tableName":"Table-2",
        "items": [],
        "cost": 0.00
    },
    {
        "tableId":3,
        "tableName":"Table-3",
        "items": [],
        "cost": 0.00
    },
    {
        "tableId":4,
        "tableName":"Table-4",
        "items": [],
        "cost": 0.00
    },
    {
        "tableId":5,
        "tableName":"Table-5",
        "items": [],
        "cost": 0.00
    },
    {
        "tableId":6,
        "tableName":"Table-6",
        "items": [],
        "cost": 0.00
    },
    {
        "tableId":7,
        "tableName":"Table-7",
        "items": [],
        "cost": 0.00
    }
]


function loadPage(){

    // FILL TABLES
    let tableBlock = document.getElementsByClassName("table-list")[0].getElementsByTagName("ul")[0];

    let tableList = "";
    for(let index=0; index<tables.length; index++) {
        
        let tableUnderUse = "";
        if(tables[index].items.length  > 0){
            tableUnderUse = "active";
        }

        tableList += `<li class="list-group-item list-group-item-action `+ tableUnderUse +`" ondrop="drop(event)" ondragover="allowDrop(event)"
                             style="text-align:left;" id="table-`+tables[index].tableId+`" data-toggle="modal" data-target="#myModal`+tables[index].tableId+`" >` +
                        `<span class="table-name">` + tables[index].tableName + `</span>` +
                        `<br>` +
                        `<span class="table-details"> Cost: Rs.`+ tables[index].cost +` | Total Items: ` + tables[index].items.length +`</span>`+
                    `</li>`;          
    }

    tableBlock.innerHTML += tableList;

    // FILL MODALS
    let modalBlock = document.getElementsByClassName("modal-block")[0];

    let modalList = ``;
    for(let index=0;index<tables.length;index++){
        modalList += constructTableDialog(index);
        //console.log(modalList);
    }

    modalBlock.innerHTML += modalList;

    // FILL MENU
    let menu = document.getElementsByClassName("item-list")[0].getElementsByTagName("ul")[0];
    
    let itemList = "";
    for(let index=0; index<items.length; index++) {   
        itemList += `<li class="list-group-item list-group-item-action" draggable="true" ondragstart="drag(event)" 
                            style="text-align:left;" id="item-`+items[index].itemId+`">`+
                        `<span class="item-name">` + items[index].itemName + `</span>` +
                        ` <br/><br/>` +
                        `<span class="item-details"> Cost:` + items[index].price.toFixed(2) + `</span>` + 
                    `</li>`;
    }
    
    menu.innerHTML += itemList;

    // height: calc(100% - 30px);
}


function clearPage(){
    
    for(let index=0; index<tables.length; index++) {
        //console.log(document.getElementById("table-"+tables[index].tableId));
        document.getElementById("table-"+tables[index].tableId).remove();
    }

    for(let index=0; index<tables.length; index++) {
        //console.log(document.getElementById("myModal-"+tables[index].tableId));
        document.getElementById("myModal"+tables[index].tableId).remove();
    }
    
    for(let index=0; index<items.length; index++) {
        //console.log(document.getElementById("item-"+items[index].itemId));
        document.getElementById("item-"+items[index].itemId).remove();
    }

    // REMOVE PREVIOUS FADE ELEMENTS(FADE EFFECT IN BACKGROUND WHEN MODAL IS GETTING DISPLAYED)
    let fadeElements = document.getElementsByClassName("modal-backdrop show");
    for(let index=0; index<fadeElements.length; index++) {
        fadeElements[index].remove();
    }    
}


function searchTables(){

    let inputValue = document.getElementById("table-search").value.toUpperCase();
    let tableNames = document.getElementsByClassName("table-name");  

    for(let index=0; index<tableNames.length; index++){
        let tableName = tableNames[index].textContent || tableNames[index].innerText;

        if (tableName.toUpperCase().indexOf(inputValue) > -1) {
            //document.getElementById("table-"+index).style.display = "";
            tableNames[index].parentElement.style.display="";
        } else {
            //document.getElementById("table-"+index).style.display = "none";
            tableNames[index].parentElement.style.display="none";
        }

    }
}


function searchItems(){

    let inputValue = document.getElementById("item-search").value.toUpperCase();
    let itemNames = document.getElementsByClassName("item-name");  

    for(let index=0; index<itemNames.length; index++){
        let itemName = itemNames[index].textContent || itemNames[index].innerText;

        if (itemName.toUpperCase().indexOf(inputValue) > -1) {
            //document.getElementById("item-"+index).style.display = "";
            itemNames[index].parentElement.style.display="";
        } else {
            //document.getElementById("item-"+index).style.display = "none";
            itemNames[index].parentElement.style.display="none";
        }

    }
}


function constructTableDialog(tableIndex){

    let billDisabled = tables[tableIndex].items.length > 0 ? "" : "disabled";

    return  `<div class="modal" id="myModal`+tables[tableIndex].tableId+`">
                <div class="modal-dialog modal-lg">
                <div class="modal-content">
                
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">`+ tables[tableIndex].tableName +` | Order Details</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>`+
                    
                    `<!-- Modal body -->
                    <div class="modal-body">
                        <table class="table table-borderless">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>`+
                            constructTableItems(tableIndex)  +
                            `</tbody>
                        </table>            
                    </div>` +
                    
                    `<!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id="bill-`+ tables[tableIndex].tableId +`" data-dismiss="modal"
                                `+ billDisabled +` onclick=clearTable(`+tables[tableIndex].tableId+`)>
                            Generate Bill
                        </button>
                    </div>
                    
                </div>
                </div>
            </div>`
}


// disabled="true"

function constructTableItems(index){
    
    let tableItems = ``;

    for(let itemIndex=0; itemIndex<tables[index].items.length; itemIndex++){

        let item = getItemByItemId(tables[index].items[itemIndex].itemId);

        tableItems +=  `<tr> `+
                            `<th scope="row">`+ (itemIndex+1) +`</th>`+
                            `<td>`+ item.itemName +`</td>`+
                            `<td>`+ item.price.toFixed(2) +`</td>`+
                            `<td>`+ 
                    `<input type="number" id="quantity-`+tables[index].tableId+`-`+ tables[index].items[itemIndex].itemId +
                        `" placeholder="quantity" min="1" max="5" onchange=editTableItemQuantity(`+ tables[index].tableId +`,`+ tables[index].items[itemIndex].itemId +`) value= "`+tables[index].items[itemIndex].quantity +`" />` +
                            `</td>`+
                            `<td>`+ `<i class="fa fa-trash" aria-hidden="true" onclick="deleteTableItem(`+ tables[index].tableId +`,`+ tables[index].items[itemIndex].itemId +`)"></i>` +`</td>`+
                        `</tr>`    
    }

    tableItems +=  `<tr> `+
                            `<td></td>`+
                            `<th scope="row" style="text-align:right;"> Total Cost </th>`+
                            `<td colspan="3">`+ getTotalCostByTableId(tables[index].tableId).toFixed(2) +`</td>`+
                            //`<td></td>`+
                            //`<td></td>`+
                        `</tr>`

    return tableItems;
   
}

function editTableItemQuantity(tableId, itemId){
    
    let updatedQuantity = document.getElementById("quantity-"+ tableId +"-"+itemId).value;
    editOrderItemQuantity(tableId, itemId, updatedQuantity);

    reloadPage();
    getTableModal(tableId);
}


function deleteTableItem(tableId, itemId){

    if(confirm("Are you sure about deleting this item?!!")){
        deleteOrderItem(tableId, itemId);

        reloadPage();
        getTableModal(tableId);
    }    
}


function clearTable(tableId){
  
  if(confirm("Are you sure??")){  
    alert("Please pay Rs."+getTotalCostByTableId(tableId));
    
    for(let index=0; index<tables.length; index++) {
        if(tables[index].tableId == tableId){
            tables[index].items = [];
            tables[index].cost = 0.0;
        }
    }

    reloadPage();
  }
}

// DRAG AND DROP

function drag(ev) {
    //ev.target.style.borderColor = "blue";
    ev.dataTransfer.setData("item", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    

    let itemId = parseInt(ev.dataTransfer.getData("item").split("-")[1]);
    let tableId = parseInt(ev.target.id.split("-")[1]);

    let data = {"itemId": itemId , "quantity":1};

    let price = getItemPrice(itemId);

    if(price != -1){   

        for(let index=0;index<tables.length;index++){
            if(tables[index].tableId == tableId){

                // IF ITEM ALREADY DROPPED INTO TABLE NEGLECT IT
                if(tableHasItem(tables[index].items, itemId)){
                    alert("Item already ordered, click on table to update quantity");
                    return ;
                }

                tables[index].items.push(data);
                tables[index].cost +=  price;
            }
        }

        reloadPage();
    }
}


// UTILITY TO RELOAD PAGE
function reloadPage() {
    clearPage();
    loadPage();
}

// UTILITY TO CLICK A MODAL
function getTableModal(tableId){
    document.getElementById("table-"+tableId).click();
}


// UTILITY FUNCTION TO GET PRICE GIVEN ITEM ID
function getItemPrice(itemId){

    let item = getItemByItemId(itemId);
    if(Object.keys(item).length === 0) {
        return -1;
    }  
    return item.price;

}

// UTILITY FUNCTION TO GET ITEM GIVEN ITEM ID    
function getItemByItemId(itemId){
    for(let index=0;index<items.length;index++){
        if(items[index].itemId == itemId){
            return items[index];
        }
    }
    return {};
}


// UTILITY TO CHECK IF ITEM IS ALREADY ORDERED
function tableHasItem(items, itemId){

    for(let index=0;index<items.length;index++){
        if(items[index].itemId == itemId){
            return true;
        }
    }
    return false;    
}

// UTILITY FUNCTION TO GET TABLE GIVEN TABLE ID
function getTableByTableId(tableId){
    for(let index=0; index<tables.length; index++) {
        if(tables[index].tableId == tableId){
            return tables[index];
        }
    }  
    return {};  
}

// UTITLTY TO GET TABLE ORDER COST
function getTotalCostByTableId(tableId){
    let total = 0.0;
    
    let table = getTableByTableId(tableId);
    for(let index=0; index< table.items.length; index++){

        total += getItemPrice(table.items[index].itemId) * (table.items[index].quantity);
    }
    return total;
}

// UTILITY TO REMOVE ITEM FROM TABLE ORDER
function deleteOrderItem(tableId, itemId){
    
    for(let index=0; index<tables.length; index++) {
        if(tables[index].tableId == tableId){

            for(let itemIndex=0; itemIndex<tables[index].items.length; itemIndex++){
                if( tables[index].items[itemIndex].itemId == itemId ){
                
                    // REMOVE THAT ITEM
                    let quantity = tables[index].items[itemIndex].quantity;
                    tables[index].items.splice(itemIndex, 1);
                    tables[index].cost -= (getItemByItemId(itemId).price * quantity);
                }
            }
        }    
    }
}


// UTILITY TO UPDATE ITEM QUANTITY IN TABLE ORDER
function editOrderItemQuantity(tableId, itemId, updatedQuantity){
    
    for(let index=0; index<tables.length; index++) {
        if(tables[index].tableId == tableId){
            
            for(let itemIndex=0; itemIndex<tables[index].items.length; itemIndex++){
                if( tables[index].items[itemIndex].itemId == itemId ){
                    
                    let prevQuantity = tables[index].items[itemIndex].quantity;
                    // UPDATE QUANTITY AND COST
                    tables[index].cost += (getItemByItemId(itemId).price)*(updatedQuantity-prevQuantity);
                    tables[index].items[itemIndex].quantity = updatedQuantity;
                    
                }
            }
        }
    }

}


