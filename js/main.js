var login = document.getElementById("login"),
  logMail = document.getElementById("logMail"),
  logPass = document.getElementById("logPass"),
  logBtn = document.getElementById("logBtn"),
  goReg = document.getElementById('goReg');

var regist = document.getElementById("regist"),
  userName = document.getElementById("userName"),
  regMail = document.getElementById("regMail"),
  regPass = document.getElementById("regPass"),
  regBtn = document.getElementById("regBtn"),
  goLog = document.getElementById("goLog");

var home = document.getElementById("home"),
  logOut = document.getElementById("logOut");

var nameValid = /^\w{3,}/,
  mailValid = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  passValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

var pathArray = location.pathname.split("/"),
  localURL = "";
for (var i = 0; i < pathArray.length - 1; i++) {
  localURL += "/" + pathArray[i];
}

var users = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

if (regist != null) {
  function clr() {
    userName.value = "";
    regMail.value = "";
    regPass.value = "";
    regPass.classList.remove("is-valid");
    regMail.classList.remove("is-valid");
    userName.classList.remove("is-valid");
  }
  userName.addEventListener("input", function (eventInfo) {
    if (nameValid.test(userName.value)) {
      userName.classList.add("is-valid");
      userName.classList.remove("is-invalid");
    } else {
      userName.classList.remove("is-valid");
      userName.classList.add("is-invalid");
    }
  });
  regMail.addEventListener("input", function (eventInfo) {
    if (mailValid.test(regMail.value)) {
      regMail.classList.add("is-valid");
      regMail.classList.remove("is-invalid");
    } else {
      regMail.classList.remove("is-valid");
      regMail.classList.add("is-invalid");
    }
  });
  regPass.addEventListener("input", function (eventInfo) {
    if (passValid.test(regPass.value)) {
      regPass.classList.add("is-valid");
      regPass.classList.remove("is-invalid");
    } else {
      regPass.classList.remove("is-valid");
      regPass.classList.add("is-invalid");
    }
  });
  goLog.addEventListener("click", function (eventInfo) {
    if (localURL == "//login-system") {
      location.replace("https://" + location.hostname + "/login-system/");
    } else {
      location.replace(localURL + "/index.html");
    }
  });
  regBtn.addEventListener("click", function (eventInfo) {
    if (
      nameValid.test(userName.value) &&
      mailValid.test(regMail.value) &&
      passValid.test(regPass.value)
    ) {
      var check = true;
      for (let i = 0; i < users.length; i++) {
        const x = users[i].mail.toLowerCase();
        if (x == regMail.value.toLowerCase()) {
          check = false;
          break;
        }
      }
      if (check == true) {
        var user = {
          name: userName.value,
          mail: regMail.value,
          Pass: regPass.value,
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        clr();
        document.getElementById("alert").innerHTML =
          '<span class="text-success">Success</span>';
      } else if (check == false) {
        document.getElementById("alert").innerHTML =
          '<span class="text-danger">Email is already present</span>';
      }
    } else if (
      userName.value == "" ||
      regMail.value == "" ||
      regPass.value == ""
    ) {
      document.getElementById("alert").innerHTML =
        '<span class="text-danger">There are empty fields</span>';
    } else if (mailValid.test(regMail.value) == false) {
      document.getElementById("alert").innerHTML =
        '<span class="text-danger">Email is not valid</span>';
    } else if (passValid.test(regPass.value) == false) {
      document.getElementById("alert").innerHTML =
        '<span class="text-danger">The password should contain at least 6 numbers and letters</span>';
    }
  });
} else if (login != null) {
  if (localStorage.getItem("currentUser")!=null) {
    if (localURL == "//login-system") {
      location.replace(
        "https://" + location.hostname + location.pathname + "home.html"
      );
    } else {
      location.replace(localURL + "/home.html");
    }
  } else {
    function clr() {
      logMail.value = "";
      logPass.value = "";
      logPass.classList.remove("is-valid");
      logMail.classList.remove("is-valid");
    }
    logMail.addEventListener("input", function (eventInfo) {
      if (mailValid.test(logMail.value)) {
        logMail.classList.add("is-valid");
        logMail.classList.remove("is-invalid");
      } else {
        logMail.classList.remove("is-valid");
        logMail.classList.add("is-invalid");
      }
    });
    logPass.addEventListener("input", function (eventInfo) {
      if (passValid.test(logPass.value)) {
        logPass.classList.add("is-valid");
        logPass.classList.remove("is-invalid");
      } else {
        logPass.classList.remove("is-valid");
        logPass.classList.add("is-invalid");
      }
    });
    goReg.addEventListener("click", function (eventInfo) {
      if (localURL == "//login-system") {
        location.replace(
          "https://" +
            location.hostname +
            location.pathname +
            "registration.html"
        );
      } else {
        location.replace(localURL + "/registration.html");
      }
    });
    logBtn.addEventListener("click", function (eventInfo) {
      if (users.length != 0) {
        if (mailValid.test(logMail.value) && passValid.test(logPass.value)) {
          var check = false;
          for (let i = 0; i < users.length; i++) {
            const x = users[i].mail.toLowerCase();
            const y = users[i].Pass;
            if (x == logMail.value.toLowerCase() && y == logPass.value) {
              localStorage.setItem(
                "currentUser",
                JSON.stringify(users[i].name)
              );
              check = true;
              break;
            }
          }
          if (check == true) {
            clr();
            if (localURL == "//login-system") {
              location.replace(
                "https://" + location.hostname + location.pathname + "home.html"
              );
            } else {
              location.replace(localURL + "/home.html");
            }
          } else if (check == false) {
            document.getElementById("alert").innerHTML =
              '<span class="text-danger">This account does not exist</span>';
            clr();
          }
        } else if (
          userName.value == "" ||
          regMail.value == "" ||
          regPass.value == ""
        ) {
          document.getElementById("alert").innerHTML =
            '<span class="text-danger">There are empty fields</span>';
        } else if (mailValid.test(regMail.value) == false) {
          document.getElementById("alert").innerHTML =
            '<span class="text-danger">Email is not valid</span>';
        } else if (passValid.test(regPass.value) == false) {
          document.getElementById("alert").innerHTML =
            '<span class="text-danger">The password should contain at least 6 numbers and letters</span>';
        }
      } else {
        document.getElementById("alert").innerHTML =
          '<span class="text-danger">This account does not exist</span>';
        clr();
      }
    });
  }
} else if (home != null) {
  if (localStorage.getItem("currentUser") != null) {
    document.getElementById(
      "alert"
    ).innerHTML = `<span class="text-dark">Welcome ${localStorage.getItem(
      "currentUser"
    )}</span>`;
    logOut.addEventListener("click", function (eventInfo) {
      if (localURL == "//login-system") {
        location.replace("https://" + location.hostname + "/login-system/");
      } else {
        location.replace(localURL + "/index.html");
      }
      localStorage.removeItem("currentUser");
    });
  } else {
    if (localURL == "//login-system") {
      location.replace("https://" + location.hostname + "/login-system/");
    } else {
      location.replace(localURL + "/index.html");
    }
  }
}
