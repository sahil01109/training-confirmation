// =========================================
// Advozy Training Confirmation
// app.js
// =========================================

const container = document.getElementById("letterContainer");

let letterLoaded = false;

// ----------------------------
// Load Letter Template
// ----------------------------

async function loadLetter() {

    try {

        const response = await fetch("letter.html");

        const html = await response.text();

        container.innerHTML = html;

        letterLoaded = true;

        initializePreview();

    }

    catch (err) {

        container.innerHTML =
        "<h2 style='padding:40px;color:red;'>Unable to load letter.html</h2>";

        console.error(err);

    }

}

loadLetter();


// =========================================
// Generate Reference Number
// =========================================

function generateReference() {

    const year = new Date().getFullYear();

    let count = localStorage.getItem("adv_reference");

    if (!count) {

        count = 1;

    }

    document.getElementById("reference").value =
        "ADV/TRN/" +
        year +
        "/" +
        String(count).padStart(3, "0");

}


// =========================================
// Today's Date
// =========================================

function setTodayDate() {

    const today = new Date();

    const yyyy = today.getFullYear();

    const mm = String(today.getMonth() + 1).padStart(2, "0");

    const dd = String(today.getDate()).padStart(2, "0");

    document.getElementById("date").value =
        `${yyyy}-${mm}-${dd}`;

}

generateReference();

setTodayDate();


// =========================================
// End Date Calculation
// =========================================

const startDate = document.getElementById("startDate");

const duration = document.getElementById("duration");

const endDate = document.getElementById("endDate");

function calculateEndDate() {

    if (!startDate.value) return;

    let date = new Date(startDate.value);

    date.setDate(
        date.getDate() + parseInt(duration.value)
    );

    const yyyy = date.getFullYear();

    const mm = String(date.getMonth() + 1).padStart(2, "0");

    const dd = String(date.getDate()).padStart(2, "0");

    endDate.value =
        `${yyyy}-${mm}-${dd}`;

    updatePreview();

}

startDate.addEventListener(
    "change",
    calculateEndDate
);

duration.addEventListener(
    "change",
    calculateEndDate
);


// =========================================
// Live Preview
// =========================================

function initializePreview() {

    updatePreview();

    document
        .querySelectorAll("#studentForm input,#studentForm select")
        .forEach(el => {

            el.addEventListener(
                "input",
                updatePreview
            );

            el.addEventListener(
                "change",
                updatePreview
            );

        });

}


// =========================================
// Update Letter
// =========================================

function update(id, value) {

    const el = document.getElementById(id);

    if (el) {

        el.innerText = value || "";

    }

}

function updatePreview() {

    if (!letterLoaded) return;

    update(
        "refPreview",
        document.getElementById("reference").value
    );

    update(
        "datePreview",
        document.getElementById("date").value
    );

    update(
        "namePreview",
        document.getElementById("studentName").value
    );

    update(
        "coursePreview",
        document.getElementById("course").value +
        " " +
        document.getElementById("branch").value
    );

    update(
        "collegePreview",
        document.getElementById("college").value
    );

    update(
        "rollPreview",
        document.getElementById("roll").value
    );

const durationSelect = document.getElementById("duration");

update(
    "durationPreview",
    durationSelect.options[durationSelect.selectedIndex].text
);

update(
    "durationPreview2",
    durationSelect.options[durationSelect.selectedIndex].text
);

    update(
        "domainPreview",
        document.getElementById("domain").value
    );

    update(
        "startPreview",
        document.getElementById("startDate").value
    );

    update(
        "endPreview",
        document.getElementById("endDate").value
    );


 
}


// =========================================
// Generate Button
// =========================================

document
.getElementById("generateBtn")
.addEventListener(

    "click",

    function(){

        updatePreview();

        alert(
            "Letter Updated Successfully"
        );

    }

);


// =========================================
// Print
// =========================================

document
.getElementById("printBtn")
.addEventListener(

    "click",

    function(){

        window.print();

    }

);