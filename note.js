
//checking if localstorage is empty
let notesArray;
localStorage.getItem("Notes")? (notesArray = JSON.parse(localStorage.getItem("Notes"))):(notesArray=[]);

//adding notes from the local storage
if(notesArray){
    notesArray.forEach(note=>{
        let title=note.title;
        let content=note.content;
        const cardTemplate=` <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${content}</p>
            <a class="btn btn-outline-primary showMoreBtn">Show More</a>
            <a class="btn btn-outline-danger deleteBtn">Delete</a>
            <a class="btn btn-outline-success editBtn">Edit</a>
          </div>
        </div>
      </div>`;
      document.querySelector(".row").innerHTML +=cardTemplate;
      addEvent();
    });
   
}
checkEmpty();



//Showing and hiding the popup box
document.querySelector(".addNoteBtn").addEventListener("click",()=>{
    document.querySelector(".addNoteBox").classList.add("visible");
    document.querySelector(".blackBackground").classList.add("on");
})

document.querySelector(".closeNoteBox").addEventListener("click",()=>{
    document.querySelector(".addNoteBox").classList.remove("visible");
    document.querySelector(".blackBackground").classList.remove("on");
})

//Adding the note
document.querySelector(".addNote").addEventListener("click",(e)=>{
    e.preventDefault();
    if(document.querySelector(".row").innerHTML=="It feels empty try adding some notes"){
        document.querySelector(".row").innerHTML="";
    }
    const title=document.querySelector("#title")
    const content=document.querySelector("#content")
    const cardTemplate=` <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${title.value}</h5>
        <p class="card-text">${content.value}</p>
        <a class="btn btn-outline-primary showMoreBtn">Show More</a>
        <a class="btn btn-outline-danger deleteBtn">Delete</a>
        <a class="btn btn-outline-success editBtn">Edit</a>
      </div>
    </div>
  </div>`;
  addToStorage(title.value,content.value);

  document.querySelector(".row").innerHTML +=cardTemplate;
  document.querySelector(".addNoteBox").classList.remove("visible");
  document.querySelector(".blackBackground").classList.remove("on");

  document.querySelector("#title").value ="";
  document.querySelector("#content").value ="";
  addEvent();
});

//adding to local storage
function addToStorage(title,content){
    let noteObj={title,content}
    notesArray.push(noteObj);
    localStorage.setItem("Notes",JSON.stringify(notesArray));
}

//close show more box
document.querySelector(".closeShowMoreBox").addEventListener("click",()=>{
    document.querySelector(".showMoreBox").classList.remove("showing");
    document.querySelector(".blackBackground").classList.remove("on");
})

// functionality for buttons on the card
function addEvent(){
    //delete button stuff
    document.querySelectorAll(".deleteBtn").forEach(btn=>{
        btn.addEventListener("click",(e)=>{
            const targetBtn=e.target;
            const title=targetBtn.parentElement.querySelector(".card-title").innerHTML;
            const content=targetBtn.parentElement.querySelector(".card-text").innerHTML;
            const targetCard =e.target.parentElement.parentElement.parentElement;
           if(confirm(`Do you want to delete 🤨 the note called "${title}"`)){ 
            targetCard.remove();
        }
        notesArray.forEach(note=>{
            if(note.title==title){
                if(note.content==content){
                    notesArray.splice(notesArray.indexOf(note),1);
                    localStorage.setItem("Notes",JSON.stringify(notesArray));
                    checkEmpty();
                }
            }
            
        })

        })
    })

    //Edit button stuff
    document.querySelectorAll(".editBtn").forEach(btn=>{
        btn.addEventListener("click",(e)=>{
            const targetBtn=e.target;
            const title=targetBtn.parentElement.querySelector(".card-title").innerHTML;
            const content=targetBtn.parentElement.querySelector(".card-text").innerHTML;
            const targetCard =e.target.parentElement.parentElement.parentElement;
            targetCard.remove();
            document.querySelector(".addNoteBox").classList.add("visible");
            document.querySelector(".blackBackground").classList.add("on");
            document.querySelector("#title").value=title;
            document.querySelector("#content").value=content;
        });
    });

    //show more button stuff
    document.querySelectorAll(".showMoreBtn").forEach(btn=>{
        btn.addEventListener("click",(e)=>{
        document.querySelector(".showMoreBox").classList.add("showing");
        document.querySelector(".blackBackground").classList.add("on");
        const targetBtn=e.target;
        const title=targetBtn.parentElement.querySelector(".card-title").innerHTML;
        const content=targetBtn.parentElement.querySelector(".card-text").innerHTML;
        document.querySelector(".showMoreBox").querySelector("h1").innerHTML=title;
        document.querySelector(".showMoreBox").querySelector("p").innerHTML=content;

        });
       
    });

}

function checkEmpty(){
    if(notesArray.length==0){
       document.querySelector(".row").innerHTML="It feels empty try adding some notes 😎😎";
    }
}