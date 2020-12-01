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
  renderUserList();
  renderTotalUsers();

  handleUsersSeach();
}

function handleUsersSeach() {
  let searchUsers = document.querySelector('#share-value');

  searchUsers.addEventListener('keyup', () => {
    

    console.log(searchUsers.value);
  })
}

function renderUserList() {
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





