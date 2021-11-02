const mainPage = document.getElementById("main-page");
const vragenPage = document.getElementById("vragen-page");
const filtersPage = document.getElementById("filters-page");
const startBtn = document.getElementById("btn-start");
const backBtn = document.getElementById("backbutton");
const vraagTitle = document.getElementById("title");
var currentVraag = 0;
const vraagStatement = document.getElementById("statement");
var answers = [];
const btnEens = document.getElementById("pro");
const btnOneens = document.getElementById("contra");
const btnGeen = document.getElementById("none");
const btnSkip = document.getElementById("overslaan");
const resultsPage = document.getElementById("results-page");
const importantBox = document.getElementById("importantBox");
var isImportant = [];
const party1 = document.getElementById("party-1");
const party2 = document.getElementById("party-2");
const party3 = document.getElementById("party-3");
const resultBtn = document.getElementById("result-button");
const homeBtn = document.getElementById("home-button");
const procent1 = document.getElementById("procent-1");
const procent2 = document.getElementById("procent-2");
const procent3 = document.getElementById("procent-3");
const groteBtn = document.getElementById("grote-button");
const secularBtn = document.getElementById("secular-button");
//hier word een score variabele toegevoegd bij elke partij
for (var y = 0; y < parties.length; y++) {
	parties[y].score = 0;
}
//zet de pagina/buttons klaar
function startPage(){
	vragenPage.style.display="none";
	filtersPage.style.display="none";
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
		answers.push("none");
		checkImportant();
		displayQuestion();
	}
	btnSkip.onclick = function(){
		answers.push("null");
		checkImportant();
		displayQuestion();
	}	
}
//laat de huidige vraag zien/checkt of alle vragen geweest zijn
function displayQuestion(){
	if (currentVraag === subjects.length) {
		checkMatch();
		filters();
	 }else{
	 	displayButtons();
		if(answers[currentVraag] != null){
			if (answers[currentVraag] === "pro") {
				btnEens.style.backgroundColor = "#01b4dc";
			}else if (answers[currentVraag] === "contra"){
				btnOneens.style.backgroundColor = "#01b4dc";
			}else{
				btnGeen.style.backgroundColor = "#01b4dc";
			}
		
		}
		vraagTitle.innerHTML = subjects[currentVraag].title;
		vraagStatement.innerHTML = subjects[currentVraag].statement;
		currentVraag++;
	}
}
//hier word score toegevoegd bij partijen met matchende antwoorden
function checkMatch(){
	for (var i = 0; i < subjects.length; i++){
		 	for (var x = 0; x < subjects[i].parties.length; x++){
			var currentSubParty = subjects[i].parties[x];
			if (currentSubParty.position === answers[i]) {
				parties.find(checkNameMatch).score++;
				if (isImportant[i] === 1){
					parties[x].score++
				} 
			}	
		}
		function checkNameMatch(parties){
			return parties.name == subjects[i].parties[x].name;
		}
	}
	parties.sort(compare);
}
//hier worden de partijen in de juiste volgorde gezet van meeste matches qua antwoorden 
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
//laat de pagina zien voor de filters en maakt de filters
function filters(){
	vragenPage.style.display="none";
	filtersPage.style.display="inline";
	
	resultBtn.onclick = function(){
			filtersPage.style.display="none";
			resultsPage.style.display="inline";
			showResults();
		}
	groteBtn.onclick = function(){
		for (var p = 0; p < parties.length; p++) {
			if (parties[p].secular === true) {
				parties.splice(p, 1);
			}
		}
		filtersPage.style.display="none";
		resultsPage.style.display="inline";
		showResults();
	}
	secularBtn.onclick = function(){
		for (var p = 0; p < parties.length; p++) {
			if (parties[p].secular === false) {
				parties.splice(p, 1);
			}
		}
		filtersPage.style.display="none";
		resultsPage.style.display="inline";
		showResults();
	}
}
//hier word gechecked of er meer gewicht aan een vraag moet worden gegeven
function checkImportant(){
	if (importantBox.checked){
		isImportant[currentVraag-1] = 1;
	}else{
		isImportant[currentVraag-1] = 0;
	}
}
//hier worden de resultaten van de stemwijzer laten zien
function showResults(){
	party1.innerHTML += (parties[0].name);
	party2.innerHTML += (parties[1].name);
	party3.innerHTML += (parties[2].name);
	homeBtn.onclick = function(){
		window.location.reload();
	}
	function calculatePercentage(){
		for (var z = 0; z < 3; z++) {
			var procentLoop = [procent1, procent2, procent3];
			var procentScore = (parties[z].score / subjects.length * 100);
			procentScore = Math.floor(procentScore);
			procentLoop[z].innerHTML = (procentScore + "%");
		}	
	}
	calculatePercentage();
}
//hier word gekeken of de vraag al is beantwoord en woord de kleur v.d. knop aangepast
function displayButtons(){
	btnEens.style.backgroundColor = "black";
	btnOneens.style.backgroundColor = "black";
	btnGeen.style.backgroundColor = "black";
	if(answers[currentVraag] != null){
			document.getElementById(answers[currentVraag]).style.backgroundColor = "#01b4dc";
		
		}
}

startPage();