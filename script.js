
        let totalQuestion = 0;
        let i = 1;
        let questionNo = 1;
        let questions = [];
        let choosenAnswer = [];
        let correctAnswer = [];
        let html = '';
        let securedMarks = 0;
        let totalMarks = 0;
        let allMarkAllocated = [];
        let totalTime = 0;
        let id;
        let setintervalTest = true;
        let unAttedndedQuestion = 0;
        let timeAttendedMin = 0;
        let timeAttendedSec = 0;
        let title = "";

        document.getElementById('js-question-no').innerHTML = `Question No: ${i}`;

        document.querySelector('.js-submit-button').addEventListener('click', () => {
            if (document.querySelector('.js-question').value === "") {
                alert("Please Enter the Question");
                return;
            }

            if (document.getElementById('option1').value === "") {
                alert("Please Enter the first Option");
                return;
            }

            if (document.getElementById('option2').value === "") {
                alert("Please Enter the Second Option");
                return;
            }

            if (document.getElementById('option3').value === "") {
                alert("Please Enter the third Option");
                return;
            }

            if (document.getElementById('option4').value === "") {
                alert("Please Enter the fourth Option");
                return;
            }

            if (document.querySelector('.js-mark-allocated').value === "") {
                alert("Please Enter the Mark Allocated");
                return;
            }

            let question = document.querySelector('.js-question').value;
            let option1 = document.getElementById('option1').value;
            let option2 = document.getElementById('option2').value;
            let option3 = document.getElementById('option3').value;
            let option4 = document.getElementById('option4').value;
            let markAllocated = Number(document.querySelector('.js-mark-allocated').value);
            document.querySelector('.js-mark-allocated').value = '';

            const forms = document.querySelector('.js-correct-options-class');

            if (forms.querySelector('input[name="correct-options"]:checked') === null) {
                alert("Please Select the Correct Option");
                return;
            }

            totalQuestion++;
            i++;
            document.getElementById('js-question-no').innerHTML = `Question No: ${i}`;

            let correctOption = Number(forms.querySelector('input[name="correct-options"]:checked').value);
            forms.reset();

            const questionStruct = {
                question,
                option1,
                option2,
                option3,
                option4,
                correctOption,
            };

            totalMarks += markAllocated;
            correctAnswer.push(correctOption);
            questions.push(questionStruct);
            allMarkAllocated.push(markAllocated);

            document.querySelector('.js-question').value = '';
            document.getElementById('option1').value = '';
            document.getElementById('option2').value = '';
            document.getElementById('option3').value = '';
            document.getElementById('option4').value = '';
        });

        document.querySelector('.js-start-test').addEventListener('click', () => {
            if (document.querySelector('.js-time').value == "") {
                alert("Please Enter the Time");
                return;
            }
            if (document.querySelector('.js-title-input').value == "") {
                alert("Please Enter the Title");
                return;
            }
            title = document.querySelector('.js-title-input').value;
            totalTime = Number(document.querySelector('.js-time').value);
            let conformationHTML = `
                <p> Are you sure want to start the test :  ${title} <p>
                <label>Total Questions: ${totalQuestion} Total Marks: ${totalMarks}</label>
                <br>
                <label>Total Time: ${totalTime}:00 min</label>
                <br>
                <button class="js-back-button" onclick="backtoAdd();">Back</button>
                <button class="js-confirm-start-test" onclick="startTest()">Confirm</button>
            `;
            document.querySelector('.js-conformation').style.display = 'block';
            document.querySelector('.js-conformation').innerHTML = conformationHTML;
            document.querySelector('.js-start-test').style.display = 'none';
            document.querySelector('.js-add-question').style.display = 'none';
            document.getElementById('js-display').style.display = 'none';
            document.querySelector('.js-input-time').style.display = 'none';
            document.querySelector('.js-title-class').style.display = 'none';
            document.querySelector('.js-display-marks').style.display = 'none';
            document.querySelector('.test-submitted').style.display = "none";
        });

        function startTest() {
            document.querySelector('.test-submitted').style.display = "none";
            document.querySelector('.js-conformation').style.display = 'none';
            html += `<p class="js-timer"></p> <h2 class="js-display-title">${title}</h2><div class="js-total-question">`

            questions.forEach((value, index) => {

                let innerHTML = ` <br>
                                  
                                  <form class="js-display-questions-form">
                                  <p>${questionNo}) . ${value.question}</p>
                                  <input type="radio" value="1" id="result-option1" name="questions">
                                  <label class="css-options" for="${value.option1}"> ${value.option1}</label>
                                  <br>
                                  <input type="radio" value="2" id="result-option2"  name="questions">
                                  <label  class="css-options" for="${value.option2}"> ${value.option2}</label>
                                  <br>
                                  <input type="radio" value="3" id="result-option3"  name="questions">
                                  <label   class="css-options" for="${value.option3}"> ${value.option3}</label>
                                  <br>
                                  <input type="radio" value="4" id="result-option4"  name="questions">
                                  <label   class="css-options" for="${value.option4}"> ${value.option4}</label>
                                  <br>
                                  </form>`;
                html += innerHTML;
                questionNo++;
            });
            questionNo = 1;
            html += `</div>`;
            document.querySelector('.js-input-time').style.display = "none";

            document.getElementById('js-display').style.display = "none";
            document.querySelector('.js-display-questions').innerHTML = html;
            document.querySelector('.js-timer').style.display = "block";
            let timeStart = totalTime;
            let seconds = 0;
            clearInterval(id);
            id = setInterval(() => {
                if (seconds === 0) {
                    if (timeStart > 0) {
                        timeStart--;
                    }
                    seconds = 60;
                } else {
                    seconds--;
                    timeAttendedSec++;
                }
                document.querySelector('.js-timer').innerHTML = `Time Remaining : ${timeStart}:${seconds} min`;
                if (timeStart === 0 && seconds === 0) {
                    document.querySelector('.js-test-submit-button').click();
                }
            }, 1000);

            document.querySelector('.js-start-test').style.display = 'none';
            html = "";
            document.querySelector('.js-test-submit-button').style.display = "block";
            document.querySelector('.js-display-marks').style.display = "none";
        }

        document.querySelector('.js-test-submit-button').addEventListener('click', () => {
            clearInterval(id);
            const forms = document.querySelectorAll('.js-display-questions-form');
            document.querySelector('.test-submitted').style.display = "block";
            document.querySelector('.js-timer').style.display = "none";
            document.querySelector('.js-display-title').style.display = "none";
            forms.forEach(form => {
                let selectedAnswer = 0;

                if (form.querySelector('input[name="questions"]:checked') === null) {
                    selectedAnswer = 0;
                    unAttedndedQuestion++;
                } else {
                    selectedAnswer = Number(form.querySelector('input[name="questions"]:checked').value);
                }

                choosenAnswer.push(selectedAnswer);
            });

            correctAnswer.forEach((value, index) => {
                if (value === choosenAnswer[index]) {
                    securedMarks += allMarkAllocated[index];
                }
            });
            secToMin()
            choosenAnswer = [];
            document.querySelector('.js-total-question').style.display = "none";
            document.querySelector('.js-test-submit-button').style.display = "none";
            document.querySelector('.js-display-marks').style.display = "block";
            document.querySelector('.js-display-marks').innerHTML = `<p class="css-display-total-question"> Total Question : ${questions.length} &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                 Question Attended : ${questions.length - unAttedndedQuestion} </p>
            <br> <p class="css-display-totalmarks"> Total Marks : ${totalMarks} </p> <br>
            <p class="css-display-secured-marks"> Marks Obtained : ${securedMarks} </p> <br>
            <p class="css-diplay-timeattended"> Time Attended : ${timeAttendedMin}:${timeAttendedSec} min </p> <br>`;
            securedMarks = 0;
            unAttedndedQuestion = 0;
            document.querySelector('.js-start-test').innerHTML = 'Restart Test';
            document.querySelector('.js-start-test').style.display = 'block';
            document.querySelector('.js-add-question').style.display = 'block';
        });

        function backtoAdd() {
            document.querySelector('.test-submitted').style.display = "none";
            document.querySelector('.js-title-class').style.display = 'block';
            document.querySelector('.js-conformation').style.display = 'none';
            document.getElementById('js-display').style.display = 'block';
            document.querySelector('.js-input-time').style.display = 'block';
            document.querySelector('.js-start-test').style.display = 'block';
            document.querySelector('.js-add-question').style.display = 'none';
            document.querySelector('.js-display-marks').style.display = 'none';
        }

        function secToMin() {
            if (timeAttendedSec < 60) {
                timeAttendedMin = 0;
                return;
            }
            if (timeAttendedSec != 0) {
                timeAttendedMin = Math.round(timeAttendedSec / 60);
                timeAttendedSec = Math.round(timeAttendedSec % 60);
                return;
            }
        }

        // Uncomment if needed
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        // Uncomment if needed
        document.addEventListener('keydown', function (e) {
            // Check if the pressed key is F12
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault(); // Prevent default behavior
            }
        });

        // Uncomment if needed
        document.addEventListener('keydown', function (e) {
            // Check if the pressed keys are Ctrl+Shift+I
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
                e.preventDefault(); // Prevent default behavior
            }
        });
    