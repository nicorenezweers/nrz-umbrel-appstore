const profilLogo = document.querySelectorAll(".profil-logo");
const roleAdd = document.querySelectorAll(".role-add");
const grayScales = ["#e0e0e0","#bbbbbb","#cccccc","#888888","#666666","#444444","#222222"];
const goldWords = ["1%"];
const words = ["OpenSource","Automation","Technology","Terraria","Factorio","Coding","Innovation","SelfTaught","Freedom","Creativity","Community","Learning","Exploration","Entrepreneurship","Finance","Adventure","Curiosity","Discipline","Minimalism","Knowledge","Improvement","Persistence","Focus"];

const randomRoleType = () => Math.random() < 0.01;
const randomGrayColor = () => grayScales[Math.floor(Math.random() * grayScales.length)];
const randomWord = () => words[Math.floor(Math.random() * words.length)];
const randomGoldWord = () => goldWords[Math.floor(Math.random() * goldWords.length)];

const addRole = (card) => {
  const parent = card.parentElement;
  const rolesList = parent.querySelectorAll(".role:not(.role-add)");
  if (rolesList.length >= 10) {
    card.style.display = "none"; return;
  }
  const role = document.createElement("div");
  const roleColor = document.createElement("div");
  const roleText = document.createElement("p");
  role.classList.add("role");
  roleColor.classList.add("role-color");

  if (randomRoleType()) {
    roleColor.title = "🎉 Goldener Tag! Einzigartig!";
    roleColor.innerHTML = "⭐";
    roleColor.style.backgroundColor = "#FFD700";
    roleColor.style.color = "#fff";
    roleColor.style.fontSize = "1.3em";
    roleColor.style.display = "flex";
    roleColor.style.alignItems = "center";
    roleColor.style.justifyContent = "center";
    roleColor.style.boxShadow = "0 0 10px #FFD700, 0 0 20px #FFF700";
    roleColor.style.animation = "sparkle 1s infinite alternate";

    if (!document.getElementById("sparkle-style")) {
      const style = document.createElement("style");
      style.id = "sparkle-style";
      style.innerHTML = `
        @keyframes sparkle {
          0% { box-shadow: 0 0 10px #FFD700, 0 0 20px #FFF700; }
          100% { box-shadow: 0 0 30px #FFD700, 0 0 60px #FFF700; }
        }
      `;
      document.head.appendChild(style);
    }
    roleText.innerText = randomGoldWord();
  } else {
    roleColor.style.backgroundColor = randomGrayColor();
    roleText.innerText = randomWord();
  }

  role.append(roleColor, roleText);
  parent.insertBefore(role, card);
  removeRole();

  if (parent.querySelectorAll(".role:not(.role-add)").length >= 10) {
    card.style.display = "none";
  }
};

const removeRole = () => {
  const roles = document.querySelectorAll(".role-color");
  roles.forEach((role) => {
    role.addEventListener("click", (e) => {
      const parent = e.target.parentElement.parentElement;
      e.target.parentElement.remove();
      const addBtn = parent.querySelector(".role-add");
      if (addBtn && parent.querySelectorAll(".role:not(.role-add)").length < 10) {
        addBtn.style.display = "flex";
      }
    });
  });
};

roleAdd.forEach((add) => add.addEventListener("click", () => addRole(add)));
removeRole();