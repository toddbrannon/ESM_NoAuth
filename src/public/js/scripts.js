
 function check(input) {
   if (input.value == 0) {
     input.setCustomValidity('The number must not be zero.');
   } else {
     // input is fine -- reset the error message
     input.setCustomValidity('');
   }
 }

function changeContentNew() {
  // document.getElementById("landing-card-title").innerHTML="New Sale";
  document.getElementById("landing-card-btn").href = "/sale";
  document.getElementById("landing-card-text").innerHTML="Add data for a brand new estate sale"
  document.getElementById("landing-card-btn").innerHTML="Add New Sale now"
  document.getElementById("tab-new").className="nav-link active";
  document.getElementById("tab-existing").className="nav-link";
  document.getElementById("tab-admin").className="nav-link";
}

function changeContentExisting() {
  // document.getElementById("landing-card-title").innerHTML="Existing Sales";
  document.getElementById("landing-card-btn").href = "/sales";
  document.getElementById("landing-card-text").innerHTML="View a list of your existing estate sales"
  document.getElementById("landing-card-btn").innerHTML="View Sales now";
  document.getElementById("tab-new").className="nav-link";
  document.getElementById("tab-existing").className="nav-link active";
  document.getElementById("tab-admin").className="nav-link";
}

function changeContentAdmin() {
  // document.getElementById("landing-card-title").innerHTML="Admin Section";
  document.getElementById("landing-card-btn").href = "/admin";
  document.getElementById("landing-card-text").innerHTML="View and manage the data that fills the dropdown selects in your data entry form"
  document.getElementById("landing-card-btn").innerHTML="View Admin now";
  document.getElementById("tab-new").className="nav-link";
  document.getElementById("tab-existing").className="nav-link";
  document.getElementById("tab-admin").className="nav-link active";
}

 
