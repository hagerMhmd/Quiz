export class Quiz {
    constructor(questionArrey) {
        this.question = questionArrey
        this.numOfQuestions = questionArrey.length
        this.currentElement = document.querySelector('#current')
        this.totalAmountElement = document.querySelector('#totalAmount')
        this.questionElement = document.querySelector('#question')
        this.rowAnswerElement = document.querySelector('#rowAnswer')
        this.submitBtn = document.querySelector('#next')
        this.submitBtn.addEventListener('click', this.submitAnswer.bind(this))
        this.currentposition = 0
        this.score = 0
        this.shownQuestion()
    }
    shownQuestion() {
        this.currentElement.innerHTML = this.currentposition + 1
        this.totalAmountElement.innerHTML = this.numOfQuestions
        this.questionElement.innerHTML = this.question[this.currentposition].question
        let answers = [this.question[this.currentposition].correct_answer, ...this.question[this.currentposition].incorrect_answers]
        this.shuffle(answers)
        let cartoona = ``
        for (let i = 0; i < answers.length; i++) {
            cartoona += `
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${answers[i]}" >
                ${answers[i]}
                </label>
            </div>`
        }
        this.rowAnswerElement.innerHTML = cartoona
    }
    checAnswer() {
        let correctAnswer = this.question[this.currentposition].correct_answer,
            userAnswer = [...document.getElementsByName('answer')].filter((ele) => ele.checked)[0]
        if (userAnswer != undefined) {
            $(".alert").slideUp(400)
            if (correctAnswer == userAnswer.value) {
                this.score ++
                $('#Correct').fadeIn(400, () => {
                    $('#Correct').fadeOut(400)
                })
            } else {
                $('#inCorrect').fadeIn(400, () => { $('#inCorrect').fadeOut(400) })
            }
            this.currentposition ++
            if(this.currentposition < this.numOfQuestions){
                this.shownQuestion()
            }else{
                document.querySelector('#score').innerHTML = this.score
                document.querySelector('#tryBtn').addEventListener('click' , _ => location.reload())
                $('#quiz').fadeOut(400 , ()=>{ $('#finish').fadeIn(400) })
            }
        } else {
            $(".alert").slideDown(400)
        }
    }
    shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    submitAnswer() {
        this.checAnswer()
    }
}
