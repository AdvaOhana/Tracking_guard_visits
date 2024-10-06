async function getPoints() {
    let url= "/pointsList";
    let res = await fetch(url);
    let data = await res.json();
    let row = "";
    for(let point of data){
        row += "<tr>";
        row += "<td>"+point.id+"</td>";
        row += "<td>"+point.name+"</td>";
        row += "<td><button>Edit</button></td>";
        row += "<td><button>Delete</button></td>";
        row += "</tr>";
    }
    document.getElementById("MainTable").innerHTML = row;
}
getPoints();
