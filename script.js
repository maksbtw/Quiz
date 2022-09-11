const $timer = document.querySelector('.timer')
const $score = document.querySelector('.score')
const $question = document.querySelector('.ques')
const $ansWrap = document.querySelector('.answers')
const $mess = document.querySelector('.mess')

const tasks = [
  {
    ques: 'How many days does it take for the Earth to orbit the Sun?',
    answers: ['356', '365', '346', '357'],
    correctAns: 2
  },
  {
    ques: 'What’s the capital of Canada?',
    answers: ['London', 'Oslo', 'Beijing', 'Ottawa'],
    correctAns: 4
  },
  {
    ques: 'Name the longest river in the world?',
    answers: ['The Amazon', 'The Dunaj', 'The Nile', 'The Dnipro'],
    correctAns: 3
  },
  {
    ques: 'What is the slang name for New York City, used by locals?',
    answers: ['Gotham', 'Detroit', 'Brooklyn', 'Hoody'],
    correctAns: 1
  },
  {
    ques: 'Where is Billie Eilish from?',
    answers: ['Los Angeles', 'New York', 'California', 'Pensylwania'],
    correctAns: 1
  },
  {
    ques: 'Which football team is known as ‘The Red Devils’?',
    answers: ['Chelsea', 'Barcelona', 'Real Madryt', 'Manchester United'],
    correctAns: 4
  },
  {
    ques: 'What was the most-watched series on Netflix in 2019? ',
    answers: ['Squid Game', 'Stranger Things', 'Bridgerton', 'Money Heist'],
    correctAns: 2
  },
  {
    ques: 'What is the capital of Finland?',
    answers: ['Helsinki', 'Oslo', 'Wales', 'Reykjavik'],
    correctAns: 1
  },
  {
    ques: 'HTTPS is...?',
    answers: ['Rule', 'Type of servers', 'Domena', 'Protocol'],
    correctAns: 4
  },
  {
    ques: 'Which Avenger is the only one who could calm the Hulk down?',
    answers: ['Black Widow', 'Thor', 'Doctor Strange', 'Vision'],
    correctAns: 1
  },

]

let quesNum = 0
let score = 0
let seconds = 0,
    minutes = 0
let timeInterval = setInterval(() => {
  seconds++
  if(seconds > 59) {
    seconds = 0
    minutes++
  }
  let sec = seconds <= 9 ? '0' + seconds : seconds
      min = minutes <= 9 ? '0' + minutes : minutes
  $timer.innerText = min + ':' + sec
}, 1000)

function showQuestion() {
  $question.innerText = tasks[quesNum].ques
  $score.innerText = `Score: ${score} (${quesNum + 1}/${tasks.length})`
  tasks[quesNum].answers.forEach(item => {
    let elem = document.createElement('button')
    elem.setAttribute('class', 'ans')
    elem.innerText = item
    elem.addEventListener('click', e => {
      if(tasks[quesNum].answers.indexOf(item) === tasks[quesNum].correctAns - 1) {
        score += 50
        showMess(true, 'You`re right')
      }
      else {
        score -= 25
        showMess(true, 'Misclick. Right answer is ' + tasks[quesNum].answers[tasks[quesNum].correctAns - 1].toUpperCase())
      }

      if(quesNum !== tasks.length - 1) {
        setTimeout(() => {
          $ansWrap.innerHTML = ''
          showMess(false)
          quesNum++
          showQuestion()
        }, 2500)
      }
      else {
        setTimeout(() => {
          if(seconds > 59) {
            seconds = 0
            minutes++
          }
          let sec = seconds <= 9 ? '0' + seconds : seconds
              min = minutes <= 9 ? '0' + minutes : minutes
          showMess(true, `Your result: ${min}:${sec} | ${score} points`)
        }, 2000)
      }
    })
    $ansWrap.appendChild(elem)
  })
}
showQuestion()

function showMess(a, message) {
  if(a) {
    $mess.classList.replace('mess-closed', 'mess-opened')
    document.querySelector('.mess .wrapper').innerText = message !== undefined ? message : 'There is no message'
  }
  else {
    $mess.classList.replace('mess-opened', 'mess-closed')
  }
}