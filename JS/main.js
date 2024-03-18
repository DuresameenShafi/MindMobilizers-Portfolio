const firebaseConfig = {
  apiKey: "AIzaSyDnSKhmOQP9IT0lro7HRC0GYE51V3hwIds",
  authDomain: "mindmobilizers-portfolio.firebaseapp.com",
  databaseURL: "https://mindmobilizers-portfolio-default-rtdb.firebaseio.com",
  projectId: "mindmobilizers-portfolio",
  storageBucket: "mindmobilizers-portfolio.appspot.com",
  messagingSenderId: "172536149449",
  appId: "1:172536149449:web:ab492b7b43aa34c5c4a418",
};

firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  saveMessages(name, emailid, msgContent);

  document.querySelector(".alert").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
