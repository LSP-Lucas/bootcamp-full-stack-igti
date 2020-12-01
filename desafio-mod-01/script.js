let countUsers = null;
let tabUsers = null;
let titleStatic = null;
let tabStatics = null;

let allUsers = [];

window.addEventListener('load', () => {
  countUsers = document.querySelector('#count-users');
  tabUsers = document.querySelector('#tab-users');
  titleStatic = document.querySelector('#title-statics');
  tabStatics = document.querySelector('#tab-statics');

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
  renderTotalUsers();
  handleUsersSeach();
}

function handleUsersSeach() {
  const searchUsers = document.querySelector('#share-value');

  searchUsers.addEventListener('keyup', () => {

    let memorizeValue = searchUsers.value;

    if (memorizeValue.length > 0) {
      document.querySelector('button').removeAttribute('disabled');
      document.querySelector('button').classList.add('btn-enable');
    }
    if (memorizeValue.length == 0) {
      document.querySelector('button').setAttribute('disabled', 'disabled');
      document.querySelector('button').classList.remove('btn-enable');
    }
  });

  document.querySelector('#btn-search-value').addEventListener('click', () => {

    renderUserList(searchUsers.value);
  });
}

function renderUserList(users) {

  console.log(users);

  let usersHTML = '<div>';

  allUsers.forEach(user => {
    const { firstName, lastename, img, dob, gender } = user;

    const userHTML = `
      <div class="list-users">
        <img src="${img}" alt="Foto ${firstName}">
        <span>${firstName} ${lastename}, ${dob} anos</span>
      </div>
    `;

    usersHTML += userHTML;
  });

  usersHTML += '</div>';

  tabUsers.innerHTML = usersHTML;
}

function renderTotalUsers() {
  let totalUsers = allUsers.length;

  countUsers.textContent = `${totalUsers} usuário(s) encontrado(s)`;
}





