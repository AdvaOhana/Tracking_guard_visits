async function getPoints() {
    let url= "/pointsList";
    let res = await fetch(url);
    let data = await res.json();
    let row = "";
    for(let idx in data){
        let point = data[idx];
        row += "<tr>";
        row += `<td>${Number(idx)+1}</td>`;
        row += `<td>${point.name}</td>`;
        row += `<td><button onclick="showEditForm(${idx})">Edit</button></td>`;
        row += `<td><button onclick="removePoint(${idx})">Delete</button></td>`;
        row += "</tr>";
    }
    document.getElementById("MainTable").innerHTML = row;
}
async function addPoints() {
    let pointName = document.getElementById("PointName").value;
    if (!pointName) {
        alert("Please enter a valid point");
        return;
    }
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
    setTimeout(()=>{alert(data.message);},500)
}
function showEditForm(idx) {
    document.getElementById("NewPoint-Container").style.display="none";
    const editForm =
            `<h3>Edit point</h3>
            <label for="EditPointName">Point Name:</label>
            <input type="text" id="EditPointName" placeholder="Enter new name">
            <button onclick="editPoint(${idx})">Edit</button>
            <button onclick="backButton()">Back</button>`

    document.getElementById("EditPoint-Container").style.display="block";
    document.getElementById("EditPoint-Container").innerHTML= editForm;
}
async function editPoint(idx) {
    let newName= document.getElementById("EditPointName").value;
    let url= `/EditPoints/${idx}`;
    let res = await fetch(url,{
        method:'PATCH',
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({name:newName}),
    })
    let data = await res.json();
    await getPoints();
   setTimeout(()=>{alert(data.message);},500)
}
function backButton() {
    document.getElementById("EditPoint-Container").style.display="none";
    document.getElementById("NewPoint-Container").style.display="block";
}
async function guardPoints() {
    let url = "/pointsList";
    let res = await fetch(url);
    let data = await res.json();
    let s = "";
    for (let point_id in data) {
        s += `<option value="${data[point_id].id}">${data[point_id].name}</option>`;
    }
    document.getElementById("guardPointSelect").innerHTML = s;
}
async function visitPoints() {
    let id=document.getElementById("guardPointSelect").value;

    let url= "/guardVisits";
    let res = await fetch(url,{
        method:'POST',
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({id})
    });
    let data = await res.json();
    setTimeout(()=>{alert(data.message);},500)
}
async function getVisits(){
    let url= "/guardVisits";
    let res = await fetch(url);
    let data = await res.json();
    if(!data.length){
        return
    }
    let row = "";

    for(let idx in data){
        let visit = data[idx];
        row += "<tr>";
        row += `<td>${Number(idx)+1}</td>`;
        row += `<td>${visit.point.name}</td>`;
        row += `<td>${visit.date}</td>`;
        row += `<td>${visit.time}</td>`;
        row += "</tr>";
    }
    document.getElementById("VisitTable").innerHTML = row;
}
