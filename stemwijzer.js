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
const impQuestionsList = document.getElementById("importantVragen");
const resultsPage = document.getElementById("results-page");
const importantBox = document.getElementById("importantBox");
var isImportant = [];

for (var y = 0; y < parties.length; y++) {
	parties[y].score = 0;
}
function startPage(){
	vragenPage.style.display="none";
	importantPage.style.display="none";
	startBtn.onclick = function(){
		mainPage.style.display="none";
		vragenPage.style.display="inline";
		displayQuestion();
	}
	backBtn.onclick = function(){
		currentVraag--;
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
	for (var x = 0; x < parties.length; x++) {
		for (var i = 0; i < subjects.length; i++) {
			if (subjects[i].parties[x].position === answers[i]) {
				parties[x].score++;
				console.log(parties);
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
	setImpQuestions();
}
function setImpQuestions(){
		startBtn.onclick = function(){
			importantPage.style.display="none";
			resultPage.style.display="inline";
		}
}
function checkImportant(){
	if (importantBox.checked){
		isImportant[currentVraag-1] = 1;
	}else{
		isImportant[currentVraag-1] = 0;
	}
}
startPage();