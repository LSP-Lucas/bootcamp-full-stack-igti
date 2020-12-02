let countUsers = null;
let tabUsers = null;
let titleStatic = null;
let tabStatics = null;

let filterUsers = [];
let allUsers = [];

let numberFormat = null;

window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader').classList.remove('loader');
    document.querySelector('.hide').classList.remove('hide');
  }, 3000);

  countUsers = document.querySelector('#count-users');
  tabUsers = document.querySelector('#tab-users');
  titleStatic = document.querySelector('#title-statics');
  tabStatics = document.querySelector('#tab-statics');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();

  allUsers = json.results.map(user => {
    const { name, picture, dob, gender } = user;

    return {
      firstName: name.first,
      lastename: name.last,
      img: picture.large,
      dob: dob.age,
      gender
    }
  });

  render();
}

function render() {
  handleUsersSeach();
}

function handleUsersSeach() {
  const searchUsers = document.querySelector('#search-value');

  searchUsers.addEventListener('keyup', (event) => {
    let memorizeValue = searchUsers.value;

    if (memorizeValue.length > 0) {
      document.querySelector('button').removeAttribute('disabled');
      document.querySelector('button').classList.add('btn-enable');
    }
    if (memorizeValue.length == 0) {
      document.querySelector('button').setAttribute('disabled', 'disabled');
      document.querySelector('button').classList.remove('btn-enable');

      tabUsers.innerHTML = '';
      tabStatics.innerHTML = '';
      countUsers.textContent = 'Nenhum usuário filtrado';
      titleStatic.textContent = 'Nada a ser exibido';
    }

    if (event.keyCode === 13) {
      renderUserList(searchUsers.value);
    }
  });

  document.querySelector('#btn-search-value').addEventListener('click', () => {

    renderUserList(searchUsers.value);
  });
}

function renderUserList(users) {
  let genderM = 0;
  let genderF = 0;
  let totalAge = null;
  let media = null;

  filterUsers = allUsers.filter(user => {
    let userName = `${user.firstName} ${user.lastename}`;
    return user.firstName.toLowerCase().indexOf(users.toLowerCase()) > -1
      || user.lastename.toLowerCase().indexOf(users.toLowerCase()) > -1
      || userName.toLowerCase().indexOf(users.toLowerCase()) > -1;
  });

  filterUsers.sort((a, b) => {
    return a.firstName.localeCompare(b.firstName);
  })

  let usersHTML = '<div>';

  filterUsers.forEach(user => {
    const { firstName, lastename, img, dob, gender } = user;

    const userHTML = `
      <div class="list-users">
        <img src="${img}" alt="Foto ${firstName}">
        <span>${firstName} ${lastename}, ${dob} anos</span>
      </div>
    `;

    if (gender === 'male') genderM++;
    if (gender === 'female') genderF++;
    totalAge += dob;

    usersHTML += userHTML;
  });
  usersHTML += '</div>';
  tabUsers.innerHTML = usersHTML;

  const totalFilterUsers = filterUsers.length;

  if (genderM !== null && genderF !== null && totalAge !== null) {
    media = totalAge / totalFilterUsers;
    statics(genderM, genderF, totalAge, media);
  }

  renderTotalUsers(totalFilterUsers);
}

function renderTotalUsers(totalFilterUsers) {

  if (typeof totalFilterUsers !== 'undefined') {
    countUsers.textContent = `${totalFilterUsers} usuário(s) encontrado(s)`;
  }

  if (totalFilterUsers === 0) {
    tabStatics.innerHTML = '';
    titleStatic.textContent = 'Nada a ser exibido';
  }
}

function statics(genderM, genderF, totalAge, media) {
  const staticsHTML = `
      <div class="list-statics">
        <div>Sexo masculino: <span>${genderM}</span></div>
        <div>Sexo feminino: <span>${genderF}</span></div>
        <div>Soma das idades: <span>${totalAge}</span></div>
        <div>Média das idades: <span>${formatNumber(media.toFixed(2))}</span></div>
      </div>
  `;
  titleStatic.textContent = 'Estatística';
  tabStatics.innerHTML = staticsHTML;
}

function formatNumber(number) {
  return numberFormat.format(number);
}

