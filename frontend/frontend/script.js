const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

function appendValue(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function deleteLast(){
    display.value = display.value.slice(0,-1);
}

async function calculate(){

    try{

        const expression = display.value;

        const result = eval(expression);

        display.value = result;

        const response = await fetch("http://localhost:5000/save-history",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                expression,
                result
            })

        });

        const data = await response.json();

        loadHistory(data.history);

    }
    catch{
        display.value = "Error";
    }

}

async function fetchHistory(){

    const response = await fetch("http://localhost:5000/history");

    const data = await response.json();

    loadHistory(data);

}

function loadHistory(history){

    historyList.innerHTML = "";

    history.reverse().forEach(item => {

        const li = document.createElement("li");

        li.textContent = `${item.expression} = ${item.result}`;

        historyList.appendChild(li);

    });

}

fetchHistory();
