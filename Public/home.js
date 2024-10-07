async function getPoints() {
    let url= "/pointsList";
    let res = await fetch(url);
    let data = await res.json();
    let i =1;
    let row = "";
    for(let point of data){
        row += "<tr>";
        row += `<td>${i++}</td>`;
        row += `<td>${point.name}</td>`;
        row += `<td><button>Edit</button></td>`;
        row += `<td><button>Delete</button></td>`;
        row += "</tr>";
    }
    document.getElementById("MainTable").innerHTML = row;
}

async function addPoints() {
    let pointName = document.getElementById("PointName").value;
    let url= "/CreatePoints";
    let res = await fetch(url,{
        method:'POST',
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({name:pointName}),
    });
    let data = await res.json();
    if (data.error){
        alert(data.error);
    }
    await getPoints();
}
