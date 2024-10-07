async function getPoints() {
    let url= "/pointsList";
    let res = await fetch(url);
    let data = await res.json();
    let row = "";
    for(let idx in data){
        let point = data[idx];
        row += "<tr>";
        row += `<td>${idx}</td>`;
        row += `<td>${point.name}</td>`;
        row += `<td><button>Edit</button></td>`;
        row += `<td><button onclick="removePoint(${idx})">Delete</button></td>`;
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
    if (data.message){
        alert(data.message);
    }
    await getPoints();
}
async function removePoint(idx) {
    let url= "/DeletePoints";
    let res= await fetch(url,{
        method:'DELETE',
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({id:idx})
    })
    let data = await res.json();
    await getPoints();
    alert(data.message);
}