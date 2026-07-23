// ==========================================
// Advozy Training Confirmation
// PDF Generator
// ==========================================

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", generatePDF);

function generatePDF() {

    const letter = document.getElementById("letter");

    if (!letter) {

        alert("Letter not loaded.");

        return;

    }

    const studentName =
        document.getElementById("studentName").value.trim() || "Student";

    const reference =
        document.getElementById("reference").value.replace(/\//g, "_");

    const filename =
        reference + "_" +
        studentName.replace(/\s+/g, "_") +
        ".pdf";

    const options = {

        margin: 0,

        filename: filename,

        image: {

            type: "jpeg",

            quality: 1

        },

        html2canvas: {

            scale: 3,

            useCORS: true,

            allowTaint: true,

            logging: false,

            scrollX: 0,

            scrollY: 0

        },

        jsPDF: {

            unit: "mm",

            format: "a4",

            orientation: "portrait"

        },

        pagebreak: {

            mode: ["avoid-all"]

        }

    };

    html2pdf()

        .set(options)

        .from(letter)

        .save();

}