document.addEventListener("DOMContentLoaded", () => {
    
    class GenerateForm {

        constructor(mainBlockID, formID, sumInputs, inputsID, inputsType, inputsClass, labelName, dataTypeName) {
            this.mainBlockID = String(mainBlockID);
            this.formID = String(formID);
            this.sumInputs = Number(sumInputs);
            this.inputsID = String(inputsID);
            this.inputsType = String(inputsType);
            this.inputsClass = String(inputsClass);
            this.labelName = labelName;
            this.dataTypeName = dataTypeName;
            this.btnID = this.formID+'Btn';
        }

        generate() {
            let mainBlock = document.getElementById(this.mainBlockID);
            let form = `<form id="${this.formID}"></form>`;
            mainBlock.insertAdjacentHTML("beforeend", form);

            let formBlock = document.getElementById(this.formID);
            if (this.labelName.length === this.sumInputs) {
                for (let i = 0; i < this.sumInputs; i++) {
                    let input = `
                    <div class="form-group">
                        <label for="${this.inputsID+'_'+i}">${this.labelName[i]}</label>
                        <input data-type="${this.dataTypeName[i]}" type="${this.inputsType}" class="${this.inputsClass}" id="${this.inputsID+'_'+i}" placeholder="Введите данные" required>
                    </div>
                    `;
                    formBlock.insertAdjacentHTML("beforeend", input);
                }
            } else {
                alert('Заполните названия полей!');
            }
            formBlock.insertAdjacentHTML("beforeend", `<button id="${this.btnID}" type="submit" class="btn btn-outline-primary btn-lg btn-block mt-4">Рассчитать</button>`);

        }

        calculate() {
            let arrNum = [];
            let formInputs = document.getElementById(this.formID);
            for (let i = 0; i < formInputs.elements.length - 1; i++) {
                let name = formInputs.elements[i].getAttribute('data-type');
                let value = Number(formInputs.elements[i].value);
                if (arrNum.hasOwnProperty(name)) {
                    arrNum[name] += value;
                } else {
                    arrNum[name] = value;
                }
            }
            return arrNum;
        }

        result() {
            this.hide();
            let resArr = this.calculate();

            let color = ['danger', 'danger', 'warning', 'warning', 'secondary', 'secondary', 'primary', 'success'];

            let percentAll = [5, 10, 15, 20, 30, 50, 75, 100];
            let percentMainMinus = [1, 5, 10, 15, 25, 40, 60, 85];
            let srZP = [15000, 25000, 40000, 60000, 75000, 100000, 200000, 500000];
            let srZPCapital = srZP.map(item => item*2);

            let socialStatus = ['Низший-низший', 'Низший-средний', 'Низший-высший', 'Средний-низший', 'Средний-средний', 'Средний-высший', 'Высший-низкий', 'Высший-высший'];
            let statusNum = 8;
            
            let recomendation = [
                'Вам необходимо максимально снизить затраты на шопинг, мобильную связь, интернет и т.п. Постарайтесь откладывать 5-10% от вашего дохода.',
                'Вам необходимо сократить затраты на шопинг и остальные мелкие затраты. Откладывайте по 5-10% от дохода для возможности вклада или для случая внезапного отсутсвия возможности заработка.',
                'Сократите ненужные мелкие расходы, реже покупайте новые вещи и откладывайте по 10% от дохода.',
                'Сокращайте расходы на шопинг и откладывайте по 10% от дохода, постарайтесь открыть вклад или инвестировать средства.',
                'Так держать! Если еще не откладываете деньги, начинайте откладывать и инвестировать!',
                'Продолжайте в том же духе!',
                'Думаю вам не нужны рекомендации. :)',
                'Думаю рекомендации нужно просить у вас! :)'
            ]


            let plus = resArr['mainPlus'];
            let mainMinus = resArr['mainMinus'];
            let otherMinus = resArr['otherMinus'];
            let allMinus = resArr['mainMinus'] + resArr['otherMinus'];
            
            let resultAll = (((plus - allMinus) / plus) * 100).toFixed(2);
            let resultMainMinus = (((plus - mainMinus) / plus) * 100).toFixed(2);
            console.log(resultAll);
            console.log(resultMainMinus);

            let mainBlock = document.getElementById(this.mainBlockID);
            let blockID = 'resultBlock';
            let div = `<div id="${blockID}"></div>`;
            mainBlock.insertAdjacentHTML("beforeend", div);
            let divBlock = document.getElementById(blockID);

            function printResult(val1, val2, type) {
                for (let i = 0; i < statusNum; i++) {
                    if (val1 <= val2[i]) {
                        let msg = `
                        <div class="alert alert-${color[i]}" role="alert">
                            Ваш социльный класс по <strong>${type}</strong>: <strong>${socialStatus[i]}</strong>!
                            <hr>
                            <p class="mb-0"><strong>Рекомендация:</strong> ${recomendation[i]}</p>
                        </div>
                        `;
                        divBlock.insertAdjacentHTML("beforeend", msg);
                        break;
                    }
                }
            }
            printResult(resultAll, percentAll, 'общему остатку');
            printResult(resultMainMinus, percentMainMinus, 'остатку от главных растрат');
            printResult(plus, srZP, 'доходу в регионах');
            printResult(plus, srZPCapital, 'доходу в столице');
        }

        socialList() {
            let color = ['danger', 'danger', 'warning', 'warning', 'secondary', 'secondary', 'primary', 'success'];
            let socialStatus = ['Низший-низший', 'Низший-средний', 'Низший-высший', 'Средний-низший', 'Средний-средний', 'Средний-высший', 'Высший-низкий', 'Высший-высший'];
            let statusNum = 8;

            let mainBlock = document.getElementById(this.mainBlockID);
            mainBlock.innerHTML = '';
            let blockID = 'resultBlock';
            let div = `<div class="${blockID}"></div>`;
            mainBlock.insertAdjacentHTML("beforeend", div);
            let divBlock = document.querySelector('.'+blockID);

            for (let i = 0; i < statusNum; i++) {
                let msg = `
                <div class="alert alert-${color[i]}" role="alert">
                    Cоцильный класс:<br><strong>${socialStatus[i]}</strong>!
                </div>
                `;
                divBlock.insertAdjacentHTML("beforeend", msg);
            }
        }

        validate() {
            let formInputs = document.getElementById(this.formID);
            let flag = false;
            for (let i = 0; i < formInputs.elements.length - 1; i++) {
                if (formInputs.elements[i].value === '') {
                    alert("Заполните все поля!");
                    flag = false;
                    break;
                } else {
                    flag = true;
                }
            }
            return flag;
        }

        hide() {
            let form = document.getElementById(this.formID);
            form.classList.add('hiddenBlock');
        }

        show() {
            let form = document.getElementById(this.formID);
            form.classList.remove('hiddenBlock');
        }



    }

    let socialForm = new GenerateForm('mainBlock','formClasses',5,'MoneyInput','number','form-control',[
        'Доход в месяц (зарплата, пассив и т.д):',
        'Расход в месяц (комунальные услуги):',
        'Расход в месяц (продукты):',
        'Расход в месяц (шоппинг):',
        'Мелкие расходы в месяц (интернет, мобильная связь, такси и т.п):'
    ],['mainPlus', 'mainMinus', 'mainMinus', 'otherMinus', 'otherMinus']);
    socialForm.generate();

    let btn = document.getElementById('formClassesBtn');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (socialForm.validate()) {
            socialForm.calculate();
            socialForm.result();
        }
    });

    let socialList = document.querySelector('.socialList');
    socialList.addEventListener('click', ()=>{
        socialForm.socialList();
    });
});