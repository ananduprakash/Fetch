import { myFetch } from "./myfetch.js";

// Use url = https://jsonplaceholder.typicode.com/posts


let urlfield = document.getElementById("url");
let methodfield = document.getElementById("method");
let btn = document.getElementById("enter");
let editdiv = document.getElementById("edit");
let table = document.getElementById("outtable");
let outdiv = document.getElementById("out");

btn.addEventListener("click", main);

let labelid = document.createElement("label");
let labeltitle = document.createElement("label");
var textid = document.createElement("input");
let texttitle = document.createElement("input");
let updatebtn = document.createElement("button");

textid.type = "text";
texttitle.type = "text";
labelid.setAttribute("for", textid);
labeltitle.setAttribute("for", texttitle);
labelid.textContent = "Enter the ID";
labeltitle.textContent = "Enter the Title";
updatebtn.textContent = "Update";

async function main() {
  editdiv.hidden = true;
  table.hidden = true;
  outdiv.textContent = "";

  let fetchurl = urlfield.value;
  let fetchmethod = methodfield.value;
  let result;
  let li = `<tr><th>ID</th><th>Title</th></tr>`;

  if (fetchmethod == "get") {
    let fetchobj = new myFetch(fetchurl);

    table.hidden = false;
    try {
      result = await fetchobj.get();
      result.forEach((data) => {
        li += `<tr>
                    <td>${data.id} </td>
                    <td>${data.title}</td>         
                    </tr>`;
                    console.log(result);
      });
    } catch {
      alert("Try Again");
    }

    table.innerHTML = li;
  } else if (fetchmethod == "post") {
    editdiv.hidden = false;

    labelid.hidden = true;
    textid.hidden = true;

    editdiv.appendChild(labeltitle);
    editdiv.appendChild(texttitle);
    updatebtn.textContent = "Post";
    editdiv.appendChild(updatebtn);

    updatebtn.onclick = async () => {
      let fetchobj = new myFetch(fetchurl);
      let newdata = {
        userId: null,
        title: texttitle.value,
        body: null,
      };

      result = await fetchobj.post(newdata);
      texttitle.value = "";
      labelid.hidden = false;
      textid.hidden = false;
      editdiv.hidden = true;
      outdiv.textContent = `ID: ${result.id} | Title: ${result.title} >> Added`;
    };
  } else if (fetchmethod == "put") {
    editdiv.hidden = false;
    editdiv.appendChild(labelid);
    editdiv.appendChild(textid);
    editdiv.appendChild(labeltitle);
    editdiv.appendChild(texttitle);
    updatebtn.textContent = "Put";
    editdiv.appendChild(updatebtn);

    let id;

    updatebtn.onclick = async () => {
      id = textid.value;
      let fetchobj = new myFetch(fetchurl + `/${id}`);
      let newdata = {
        userId: null,
        id: id,
        title: texttitle.value,
        body: null,
      };

      result = await fetchobj.put(newdata);
      textid.value = "";
      texttitle.value = "";
      editdiv.hidden = true;
      if(result!=200){
        alert("Incorrect ID");
        return;
      }
      outdiv.textContent = `ID: ${result.id} | Title: ${result.title} >> Modified`;
    };
  } else if (fetchmethod == "patch") {
    editdiv.hidden = false;
    editdiv.appendChild(labelid);
    editdiv.appendChild(textid);
    editdiv.appendChild(labeltitle);
    editdiv.appendChild(texttitle);
    updatebtn.textContent = "Patch";
    editdiv.appendChild(updatebtn);

    let id;

    updatebtn.onclick = async () => {
      id = textid.value;
      let fetchobj = new myFetch(fetchurl + `/${id}`);
      let newdata = {
        title: texttitle.value,
      };

      result = await fetchobj.patch(newdata);
      console.log(result);
      textid.value = "";
      texttitle.value = "";
      editdiv.hidden = true;
      outdiv.textContent = `ID: ${result.id} | Title: ${result.title} >> Patched`;
    };
  } else if (fetchmethod == "delete") {
    editdiv.hidden = false;
    labeltitle.hidden = true;
    texttitle.hidden = true;
    editdiv.appendChild(labelid);
    editdiv.appendChild(textid);
    updatebtn.textContent = "Delete";
    editdiv.appendChild(updatebtn);

    let id;

    updatebtn.onclick = async () => {
      id = textid.value;
      let fetchobj = new myFetch(fetchurl + `/${id}`);

      result = await fetchobj.delete();
      textid.value = "";
      labeltitle.hidden = false;
      texttitle.hidden = false;
      editdiv.hidden = true;
      outdiv.textContent = result;
    };
  }
}
