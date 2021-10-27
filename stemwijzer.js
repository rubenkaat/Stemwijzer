const mainPage = document.getElementById("main-page");
const vragenPage = document.getElementById("vragen-page");
const filtersPage = document.getElementById("filters-page");
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
const procent1 = document.getElementById("procent-1");
const procent2 = document.getElementById("procent-2");
const procent3 = document.getElementById("procent-3");
const groteBtn = document.getElementById("grote-button");
const secularBtn = document.getElementById("secular-button");

for (var y = 0; y < parties.length; y++) {
	parties[y].score = 0;
}
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
function displayQuestion(){
	if (currentVraag === subjects.length) {
		checkMatch();
		filters();
	}else{
		vraagTitle.innerHTML = subjects[currentVraag].title;
		vraagStatement.innerHTML = subjects[currentVraag].statement;
		currentVraag++;
	}
}
function checkMatch(){
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
	parties.sort(compare);
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
	function calculatePercentage(){
		for (var z = 0; z < 3; z++) {
			var procentLoop = [procent1, procent2, procent3];
			var procentScore = (parties[z].score / subjects.length * 100);
			procentLoop[z].innerHTML = (procentScore + "%");
		}	
	}
	calculatePercentage();
}

startPage();