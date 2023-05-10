//Form
const monsterForm = document.createElement('form');
monsterForm.id = 'monster-form';
const createMonsterDiv = document.querySelector('#create-monster');
createMonsterDiv.appendChild(monsterForm);

const nameInput = document.createElement('input');
nameInput.id = 'name';
nameInput.placeholder = 'name...';
monsterForm.appendChild(nameInput);

const ageInput = document.createElement('input');
ageInput.id = 'age';
ageInput.placeholder = 'age...';
monsterForm.appendChild(ageInput);

const descriptionInput = document.createElement('input');
descriptionInput.id = 'description';
descriptionInput.placeholder = 'description...';
monsterForm.appendChild(descriptionInput);

const submit = document.createElement('button');
submit.textContent = 'Create';
monsterForm.appendChild(submit);

const monsterContainer = document.querySelector('#monster-container');

//Render Monsters
let currentPage = 1;
let pageSize = 50;
let startIndex = (currentPage - 1) * pageSize;
let endIndex = startIndex + pageSize;

fetch ('http://localhost:3000/monsters/')
    .then (resp => resp.json())
    .then (monsters => renderMonster(monsters))

    const renderMonster = (monsters) => {
       const pageData = monsters.slice(startIndex, endIndex);
       monsterContainer.innerHTML = "";
       pageData.forEach (monster => {
            const div = document.createElement('div');
            monsterContainer.appendChild(div);
            
            const name = document.createElement('h2');
            name.textContent = monster.name;
            
            const age = document.createElement('h4');
            age.textContent = monster.age;

            const description = document.createElement('p');
            description.textContent = monster.description;

            const id = monster.id;
            
            div.append(name, age, description);
        })
        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                startIndex = (currentPage - 1) * pageSize;
                endIndex = startIndex + pageSize;
                renderMonster(monsters);
            }
        }
    
        function nextPage() {
            if ((currentPage * pageSize) < monsters.length) {
                currentPage++;
                startIndex = (currentPage - 1) * pageSize;
                endIndex = startIndex + pageSize;
                renderMonster(monsters);
            }
        }
    
        document.querySelector('#back').addEventListener('click', previousPage, false);
            
        document.querySelector('#forward').addEventListener('click', nextPage, false);
    }
    
    //Create Monster

    monsterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let name = e.target.name.value;
        let age = e.target.age.value;
        let description = e.target.description.value;
        monsterForm.reset();
        
        fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers:
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },      

        body: JSON.stringify({
            "name": name,
            "age": age,
            "description": description,
        })
        })
        .then(resp => resp.json())
        .then(monster => {
            const div = document.createElement('div');
            monsterContainer.appendChild(div);
            
            const name = document.createElement('h2');
            name.textContent = monster.name;
            
            const age = document.createElement('h4');
            age.textContent = monster.age;

            const description = document.createElement('p');
            description.textContent = monster.description;

            const id = monster.id;
            
            div.append(name, age, description);
        })
    })
    