const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList()
    .then((response) => {
      console.log(response.data);
      const data = response.data;
      let listItems = "";
      data.forEach(character => {
        listItems += `
        <div class="character-info">
        <div class="name" id="name">Character Name: ${character.name}</div>
        <div class="occupation" id="occupation">Occupation: ${character.occupation}</div>
        <div class="cartoon" id="cartoon">Is a Cartoon? ${character.cartoon}</div>
        <div class="weapon" id="weapon">Character Weapon: ${character.weapon}</div>
      </div>
        `;
      });
      document.getElementById("characters-container").innerHTML = listItems;
      });
    });
  });

  document.getElementById('fetch-one').addEventListener('click',  () => {
    let id = document.getElementById("fetch-one-id").value;
    let fetchOne= "";
    charactersAPI.getOneRegister(id)
    .then((response) => {
      console.log(response.data);
      fetchOne = `
      <div class="character-info">
      <div class="name" id="name">Character Name: ${response.data.name}</div>
      <div class="occupation" id="occupation">Occupation: ${response.data.occupation}</div>
      <div class="cartoon" id="cartoon">Is a Cartoon? ${response.data.cartoon}</div>
      <div class="weapon" id="weapon">Character Weapon: ${response.data.weapon}</div>
      </div>
      `;
      document.getElementById("characters-container").innerHTML = fetchOne;
    }
    );
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    let id = document.getElementById("delete-ones").value;
    charactersAPI.deleteOneRegister(id)
    .then((response) => {
      console.log(`This character has been deleted ${response.name}`);
    });
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const updatedCharacter = {
      id: document.getElementById("update-id").value,
      name: document.getElementById("update-name").value,
      occupation: document.getElementById("update-occupation").value,
      weapon: document.getElementById("update-weapon").value,
      cartoon: document.getElementById("update-cartoon").value
    };
    let updatedCharacterId = document.getElementById("update-id").value;
    charactersAPI.updateOneRegister(updatedCharacterId, updatedCharacter)
    .then(() => {
      document.getElementById("send-data").style.color = 'green';
    }).catch(() => {
      document.getElementById("send-data").style.color = 'red';
    });
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById("create-name").value;
    const occupation = document.getElementById("create-occupation").value;
    const weapon = document.getElementById("create-weapon").value;
    const cartoon = document.getElementById("create-cartoon").checked;

    const newCharacter = {
      name,
      occupation,
      weapon,
      cartoon
    };
    console.log('new Character', newCharacter);
    charactersAPI.createOneRegister(newCharacter)
    .then(() => {
      document.getElementById("send-data").style.color = 'green';
    }).catch( () => {
      document.getElementById("send-data").style.color = 'red';
    });
  });



