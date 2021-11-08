const appState = {
  current_score:0,
  current_question:0,
  current_view:"#intro",
  //denote the information that is needed from the application to render a template
  //data that you get from api
  //holds all information from the current question object
  current_model: {}
}


//refer to fire or hire for scoreboard -
//ask about importing from API
//update question - ask about that
//I have difficulty wrapping my head around JS

document.addEventListener('DOMContentLoaded', () => {
  console.log("Intro_logged");
  appState.current_view = "#intro";
  appState.current_question = 0;
  update_view(appState);

  document.querySelector("#question_widget").onclick = (e) => {
    handle_widget_event(e)
  };
});

//every time the score changes, update the scoreboard
//also look up how to implement a scoreboard
function handle_widget_event(e){
  if (appState.current_view == "#intro") {
    if (e.target.dataset.action == "start_app") {
      console.log("button_pressed");
      console.log(e.target.dataset.action);

      appState.current_question = 0;
      //model = get_question_set_async()

      //is this correct?
      update_question(appState);
      get_question_model(appState);
      update_view(appState);

    }
  }

  if (appState.current_view == "#true_false_view") {
    if (e.target.dataset.action == "answer") {
      console.log("button_pressed");
      isCorrect = check_user_response(e.target.dataset.vote,appState);
      updateScore(isCorrect, appState);

      //update question is supposed to replace two lines below

      update_question(appState);
      get_question_model(appState);
      update_view(appState);

    }
  }


//global handler - trigger the event
//have a button of data action submit
  if (appState.current_view == "#text_input_view") {
    if (e.target.dataset.action == 'submit') {
      console.log("button_pressed");

      let answer = document.querySelector("#text-input-answer").value;
      isCorrect = check_user_response(answer, appState);

      update_question(appState);
      get_question_model(appState);
      update_view(appState);

    }
  }


  if (appState.current_view == "multiple_choice_view") {
    if (e.target.dataset.action == "answer") {
      console.log("button_pressed");
      isCorrect = check_user_response(target.dataset.vote, appState);

      update_question(appState);
      get_question_model(appState);
      //update question is supposed to replace two lines below
      update_view(appState);

    }
  }

}

//might need to redo all of this
let get_question_model = async (appState) => {

  let server_link = 'http://my-json-server.typicode.com/Sajid2001/QuizServerJson';
  let api_endpoint = `${server_link}/questions/${appState.current_question}`

  const response = await fetch(api_endpoint);
  const model = await response.json();

  update_question_view(appState);
  update_view(appState);
}


//update the handlebars view - radio button? -
//have a way to know what action the user took
//4 different values that correspond with the button_pressed
//check if the value of that button matches the correct answer


function check_user_response(user_answer, model){
  if (user_answer == model.correctAnswer) {
    return true;
    console.log("correct");
  }
  return false;
  console.log("incorrect");
}

function updateScore(isCorrect, appState){
  if (isCorrect == true){
    appState.current_score = appState.current_score + 1;
  }
}

//checks if we reach the last question, if not, increase index by 1.
function update_question(appState) {
    if (appState.current_question < 10) {
      appState.current_question =   appState.current_question + 1;
      console.log(appState.current_question);
    }
    else {
      appState.current_question = -2;
      appState.current_model = {};
    }
}

function update_question_view(appState){
  if (appState.current_question == -2) {
   appState.current_view  = "#end_view";
   return
 }

 if (appState.current_model.type == "true_false"){
   appState.current_view = "#true_false_view";
   console.log("view changed");
 }

  if (appState.current_model.type == "text_input") {
   appState.current_view = "#text_input_view";
   console.log("view changed");
 }

 if (appState.current_model.questionType == "multiple_choice")
  appState.current_view = "#multiple_choice_view"
}


//update the view for the score widget as well
function update_view(appState){
  const html_element = render_view(appState.current_model, appState.current_view)
  document.querySelector("#question_widget").innerHTML = html_element;
}

//turns js template into actual html
const render_view = (model,view) => {
  template_source = document.querySelector(view).innerHTML
  var template = Handlebars.compile(template_source);

  var html_widget_element = template ({...model,...appState})

  return html_widget_element
};
