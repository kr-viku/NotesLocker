var today;
showNotes();
let addBtn=document.getElementById("addBtn");
addBtn.addEventListener("click", function(a)
{
    let addTxt=document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle");
    let notes=localStorage.getItem("notes");
    let day=new Date();
    let dic={0:"Jan", 1:"Feb", 2:"Mar", 3:"Apr", 4:"May", 5:"Jun", 6:"July", 7:"Aug", 8:"Sep", 9:"Oct", 10:"Nov", 11:"Dec"};
    let date=day.getDate();
    let mon=day.getMonth();
    // console.log(mon);
    let year=day.getFullYear();
    // console.log(year);
    let time=date+dic[mon]+" "+year;
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myobj={
        title:addTitle.value,
        text:addTxt.value,
        today:time
    }
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value="";
    addTitle.value="";
    showNotes();
})

function showNotes()
{
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element, index)
    {
        if(element.title.length===0)
        {
            element.title="Title";
        }
        if(element.text.length===0)
        {
            element.text="Note...";
        }
        html+=`
        <div class="noteCard my-2 mx-2 card shadow-lg p-3 mb-5 rounded bg-dark text-white" style="width: 18rem;">
        <!-- <img src="..." class="card-img-top" alt="..."> -->
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text"> ${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger my-3">Delete Note</button>
          <small style="text-align:right; display:block;">${element.today}</small>
        </div>
      </div>
      `;
    });

    let notesElm=document.getElementById("notes");
    if(notesObj.length!=0){
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML=`Nothing to show! Use "Add Note" Section for creating your notes.`
    }

}


function deleteNote(index)
{
    var result=confirm("Are you sure you want to delete?");
//     console.log("I am deleting ", index);
    if(result)
    {
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    }
}

let search=document.getElementById("searchTxt");
search.addEventListener("input", function(){
    let inputVal=search.value.toLowerCase();
    let noteCards=document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element)
    {
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        console.log(cardTxt);
        if(cardTxt.includes(inputVal))
        {
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
});
