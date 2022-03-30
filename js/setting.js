import { Quiz } from "./quiz.js"


export class Setting {
    constructor() {
        this.category = document.getElementById('category')
        this.difficulty = document.getElementsByName('difficulty')
        this.numOfQuestions = document.getElementById('numOfQuestions')
        this.startBtn = document.getElementById('startBtn')
        this.startBtn.addEventListener('click', this.showQuestion.bind(this))
    
    }
    async showQuestion() {
        let category = this.category.value
        let difficulty = [...this.difficulty].filter(ele => ele.checked)[0].value
        let numOfQuestions = this.numOfQuestions.value
        let quizApi = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
        let questions = await this.fetchQuestionApi(quizApi)
        if (numOfQuestions != '') {
            $('#formAlert').slideUp(150)
            if (numOfQuestions != 0) {
                $('#setting').fadeOut(150, function () { $('#quiz').fadeIn(100) })
                new Quiz(questions)
                
            }
        } else {
            $('#formAlert').slideDown(150)
        }
    }
    async fetchQuestionApi(API) {
        let response = await fetch(API)
        response = await response.json()
        return response.results;
    }
    
}







//    console.log(category)
//         console.log(difficulty)
//         console.log(numOfQuestions);
//         console.log(quizApi);
// for (let i = 0; i < this.difficulty.length; i++) {
//     if (this.difficulty[i].checked == true) {
//         let test = this.difficulty[i].value
//         console.log(test);
//     }
// }