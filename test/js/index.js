//Will get this list from data source
var todoList = [
	
];

window.onload = renderToDoList.call(null,todoList);

function renderToDoList (listObj){
	document.getElementById("pendingToDoList").innerHTML = "";
	document.getElementById("completedToDoList").innerHTML = "";
	document.getElementById("todoCatDropDown").innerHTML = "";
	var defaultCat = document.createElement("option");

	defaultCat.value = "";
	defaultCat.innerText = "--Select--";
	document.getElementById("todoCatDropDown").appendChild(defaultCat);
	addNewCategory();

	var i = 0;
	for(i=0;i<listObj.length;i++){	
		if(!listObj[i].done){
			addNewToDoItem(listObj[i],"pendingToDoList");		
		}
		else{
			addNewToDoItem(listObj[i],"completedToDoList");
		}
	}	
}

function addNewCategory (){
	var todoListDropdown = document.getElementById("todoCatDropDown").children;
	var todoListItem = null;
	var found = false;
	for(var idx=0;idx<todoList.length;idx++){
		found = false;
		for(var i=0; i<todoListDropdown.length;i++ ){
			if(todoListDropdown[i].value.toString().trim() === todoList[idx].category){
				found = true;
				break;
			}
		}
		if(!found){
			todoListItem = document.createElement("option");
			todoListItem.setAttribute("value" , todoList[idx].category);
			todoListItem.innerText = todoList[idx].category;
			document.getElementById("todoCatDropDown").appendChild(todoListItem);
		}
	}
}

function addNewItem(event){
	event.preventDefault();
	var form = document.forms[event.target.name].children;
	var newToDoListItem = {
		category: form.category.value.toString().trim(),
		disc: form.disc.value.toString().trim(),
		done: false
	};
	todoList.push(newToDoListItem);
	renderToDoList(todoList);
}

function addNewToDoItem(newItemObj,targetId){
	var newItemcontainer = document.createElement("div");
	newItemcontainer.setAttribute("class" , "row");
	var pendingList = document.getElementById(targetId);
	var inputNode = document.createElement("input");
	var inputNodeClone = null;
	var doneChkBox = document.createElement("input");
	inputNode.setAttribute("type", "text");	
	var catNode = inputNode.cloneNode();
	var discNode = inputNode.cloneNode();
	doneChkBox.setAttribute("type", "checkbox");
	newItemcontainer.appendChild(doneChkBox);
	if(newItemObj.done){
		catNode.setAttribute("disabled" , true);	
		discNode.setAttribute("disabled" , true);	
		doneChkBox.setAttribute("disabled" , true);	
	}
	if(newItemObj.hasOwnProperty("category")){
		catNode.setAttribute("value" , newItemObj.category);
	}
	else {
		catNode.setAttribute("value" , "");
	}

	newItemcontainer.appendChild(catNode);
	if(newItemObj.hasOwnProperty("disc")){
		discNode.setAttribute("value" , newItemObj.disc);
	}
	else {
		discNode.setAttribute("value" , "");
	}

	newItemcontainer.appendChild(discNode);
	if(!newItemObj.done){
		doneChkBox.addEventListener("change", function(){
			editToDoItem(newItemObj);
		});
		var editBtn = document.createElement("button");
		editBtn.innerText = "Done";
		editBtn.addEventListener("click", function(){
			console.log("Editing the to do item");
		});
		var delBtn = document.createElement("button");
		delBtn.innerText = "Delete";
		delBtn.addEventListener("click" , function(){
			deleteToDoItem(newItemObj);
		});
		
		newItemcontainer.appendChild(editBtn);
		newItemcontainer.appendChild(delBtn);
	}
	
	pendingList.appendChild(newItemcontainer);
}

function deleteToDoItem (item){
	var i=0;
	for(i=0;i<todoList.length;i++){
		if(item.category === todoList[i].category && item.disc === todoList[i].disc){
			todoList.splice(i,1)
		}
	}
	renderToDoList(todoList);
}

function editToDoItem(item){
	var filtVal = document.getElementById("odoListFilter").value;
	var sortCat = document.getElementById("todoCatDropDown").value;
	var i=0;
	for(i=0;i<todoList.length;i++){
		if(item.category === todoList[i].category && item.disc === todoList[i].disc){
			todoList[i].done = true;
		}
	}
	renderToDoList(todoList);
	document.getElementById("odoListFilter").value = filtVal;
	document.getElementById("todoCatDropDown").value = sortCat;
	filterToDoList();
	sortList();
}

function filterToDoList(){
	var filtVal = document.getElementById("odoListFilter").value;
	var sortCat = document.getElementById("todoCatDropDown").value;
	var filterRes = todoList.filter(function(item){		
		if(document.getElementById("todoCatDropDown").value === "" && item.disc.toLowerCase().indexOf(filtVal.toLowerCase()) !== -1){
			return true;
		}
		else if(document.getElementById("todoCatDropDown").value !== "" && document.getElementById("todoCatDropDown").value === item.category && item.disc.toLowerCase().indexOf(filtVal.toLowerCase()) !== -1){
			return true;
		}
	});
	renderToDoList(filterRes);
	document.getElementById("todoCatDropDown").value = sortCat;
}

function sortList(){
	var sortCat = document.getElementById("todoCatDropDown").value;
	if(document.getElementById("todoCatDropDown").value !== ""){
		var resList = todoList.filter(function(item){		
			if(item.category.toLowerCase() === sortCat.toLowerCase() && item.disc.toLowerCase().indexOf(document.getElementById("odoListFilter").value.toString().toLowerCase()) !== -1){
				return true;
			}
		});
		renderToDoList(resList);
	}
	else{
		renderToDoList(todoList);
	}
	document.getElementById("todoCatDropDown").value = sortCat;
}