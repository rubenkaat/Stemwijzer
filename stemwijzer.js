const mainPage = document.getElementById("main-page");
const vragenPage = document.getElementById("vragen-page");
const importantPage = document.getElementById("important-page");
const startBtn = document.getElementById("btn-start");
const backBtn = document.getElementById("backbutton");
const vraagTitle = document.getElementById("title");
var currentVraag = 0;
const vraagStatement = document.getElementById("statement");
var answers = [];
const btnEens = document.getElementById("button-eens");
const btnOneens = document.getElementById("button-oneens");
const btnGeen = document.getElementById("button-geen");
const btnSkip = document.getElementById("overslaan");
const resultsPage = document.getElementById("results-page");
const importantBox = document.getElementById("importantBox");
var isImportant = [];
const party1 = document.getElementById("party-1");
const party2 = document.getElementById("party-2");
const party3 = document.getElementById("party-3");
const resultBtn = document.getElementById("result-button");
const homeBtn = document.getElementById("home-button");

for (var y = 0; y < parties.length; y++) {
	parties[y].score = 0;
}
function startPage(){
	vragenPage.style.display="none";
	importantPage.style.display="none";
	resultsPage.style.display="none";
	startBtn.onclick = function(){
		mainPage.style.display="none";
		vragenPage.style.display="inline";
		displayQuestion();
	}
	backBtn.onclick = function(){
		if(currentVraag === 0){
			vragenPage.style.display="none";
			mainPage.style.display="inline";
		}
		currentVraag = currentVraag-2;
		displayQuestion();
	}
	btnEens.onclick = function(){
		answers.push("pro");
		checkImportant();
		displayQuestion();
	}
	btnOneens.onclick = function(){
		answers.push("contra");
		checkImportant();
		displayQuestion();
	}
	btnGeen.onclick = function(){
		answers.push("null");
		checkImportant();
		displayQuestion();
	}
	btnSkip.onclick = function(){
		answers.push("null");
		checkImportant();
		displayQuestion();
	}	
}
function displayQuestion(){
	if (currentVraag === subjects.length) {
		checkMatch();
		important();
	}else{
		vraagTitle.innerHTML = subjects[currentVraag].title;
		vraagStatement.innerHTML = subjects[currentVraag].statement;
		currentVraag++;
	}
}
function checkMatch(){
	console.log(parties);
	for (var x = 0; x < parties.length; x++) {
		for (var i = 0; i < subjects.length; i++) {
			if (subjects[i].parties[x].position === answers[i]) {
				parties[x].score++;
				if (isImportant[i] === 1){
					parties[x].score++
				} 
			}	
		}
	}
	console.log(parties);
	parties.sort(compare);
	//parties[x].score : 30 x 100 = procent match
	//top 3 hoogste cijfers display met procenten erbij
}
function compare(a, b) {
	var a = a.score;
	var b = b.score;
  
	let comparison = 0;
	if (a > b) {
	  comparison = -1;
	} else if (a < b) {
	  comparison = 1;
	}
	return comparison;
}
function important(){
	vragenPage.style.display="none";
	importantPage.style.display="inline";
	resultBtn.onclick = function(){
			importantPage.style.display="none";
			resultsPage.style.display="inline";
			showResults();
		}
}
function checkImportant(){
	if (importantBox.checked){
		isImportant[currentVraag-1] = 1;
	}else{
		isImportant[currentVraag-1] = 0;
	}
}
function showResults(){
	party1.innerHTML += (parties[0].name);
	party2.innerHTML += (parties[1].name);
	party3.innerHTML += (parties[2].name);
	homeBtn.onclick = function(){
		window.location.reload();
	}
}
startPage();