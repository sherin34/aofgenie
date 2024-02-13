const express = require("express");
const router = express.Router();
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

// Assuming you have a GET route for rendering a form
router.get("/", (req, res) => {
  res.render("index"); // Render your HTML form
});

// POST route to handle form submission
router.post("/submit-form", async (req, res) => {
  try {
    const existingPdfBytes = fs.readFileSync("aof.pdf");
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // Fill PDF form fields with submitted data
    form.getTextField("branchName").setText(req.body.branchName);
    // form.getTextField("branchCode").setText(req.body.branchCode);
    
form.getTextField("regName").setText(req.body.regName);


const date = formatDate2(req.body.date);
const { day, month, year } = splitDate(date);
form.getTextField("day").setText(day);
form.getTextField("month").setText(month);
form.getTextField("year").setText(year);

form.getTextField("dateOfIncorporation").setText(addSpacesAfterCharactersAOF(formatDate(req.body.dateOfIncorporation)));
form.getTextField("dateOfIncorporationNormal").setText((formatDate2(req.body.dateOfIncorporation)));
// form.getTextField("dateOfCommencement").setText(addSpacesAfterCharactersAOF(formatDate(req.body.dateOfCommencement)));
//aof special model date (gap between boxes of ddmmyyyy)
form.getTextField("dateOfIncorporationAOFSPL").setText(addSpacesAfterCharactersAOFSPL(formatDate(req.body.dateOfIncorporation)));
// form.getTextField("dateOfCommencementAOFSPL").setText(addSpacesAfterCharactersAOFSPL(formatDate(req.body.dateOfCommencement)));
///

form.getTextField("placeOfIncorporation").setText(req.body.placeOfIncorporation);
// form.getTextField("countryCode").setText(req.body.countryCode);

form.getRadioGroup("scheme").select(req.body.scheme);
form.getTextField("schemeOthersExpanded").setText(req.body.schemeOthersExpanded);
form.getRadioGroup("modeOfOperation").select(req.body.modeOfOperation);
form.getTextField("modOthersExpanded").setText(req.body.modOthersExpanded);

form.getRadioGroup("Constitution").select(req.body.constitution);
form.getRadioGroup("lineOfBusiness").select(req.body.lineOfBusiness);
form.getTextField("lineOfBusinessOther").setText(req.body.lineOfBusinessOther);
form.getRadioGroup("income").select(req.body.income);
form.getTextField("netWorth").setText(req.body.netWorth);
form.getTextField("netWorthAsOn").setText(req.body.netWorthAsOn);
// form.getTextField("countryOfBusiness").setText(req.body.countryOfBusiness);
// form.getTextField("countryOfBusiness2").setText(req.body.countryOfBusiness2);
// form.getTextField("countryOfBusiness3").setText(req.body.countryOfBusiness3);
///AOF FORMAT
form.getTextField("countryCodeAOF").setText(addSpacesAfterCharactersAOF(req.body.countryCode));
form.getTextField("branchNameAOF").setText(addSpacesAfterCharactersAOF(req.body.branchName));
form.getTextField("branchCodeAOF").setText(addSpacesAfterCharactersAOF(req.body.branchCode));
form.getTextField("countryOfBusinessAOF").setText(addSpacesAfterCharactersAOF(req.body.countryOfBusiness));
// form.getTextField("countryOfBusiness2AOF").setText(addSpacesAfterCharactersAOF(req.body.countryOfBusiness2));
// form.getTextField("countryOfBusiness3AOF").setText(addSpacesAfterCharactersAOF(req.body.countryOfBusiness3));

//////


const address1 = req.body.address1 || "";
const address2 = req.body.address2 || "";
const address3 = req.body.address3 || "";
const city = req.body.city || "";
const state = req.body.state || "";
const pin = req.body.pin || "";

const fullAddress = `${address1}, ${address2}, ${address3}, ${city}, ${state}, ${pin}`;

form.getTextField("fullAddress").setText(fullAddress);
form.getTextField("fullAddressSingleLine").setText(fullAddress);
// form.getTextField("address1").setText(req.body.address1);
// form.getTextField("address2").setText(req.body.address2);
// form.getTextField("address3").setText(req.body.address3);
form.getTextField("city").setText(req.body.city);
// form.getTextField("state").setText(req.body.state);
// form.getTextField("pin").setText(req.body.pin);
form.getTextField("mobile").setText(req.body.mobile);
form.getTextField("email").setText(req.body.email);
// form.getTextField("gst").setText(req.body.gst);
// form.getTextField("pan").setText(req.body.pan);
// --FOR AOF
form.getTextField("regNameAOF").setText(addSpacesAfterCharactersAOF(req.body.regName));

splitTextIntoShortBoxes(address1,"address1")
splitTextIntoShortBoxes(address2,"address2")
splitTextIntoShortBoxes(address3,"address3")
splitTextIntoShortBoxes(city,"city")
splitTextIntoShortBoxes(state,"state")
splitTextIntoShortBoxes(pin,"pin")
splitTextIntoShortBoxes(req.body.mobile,"mobile")
splitTextIntoShortBoxes(req.body.email,"email")
splitTextIntoShortBoxes(req.body.gst,"gst")
splitTextIntoShortBoxes(req.body.cin,"cin")
splitTextIntoShortBoxes(req.body.pan,"pan")

form.getTextField("address1AOF").setText(addSpacesAfterCharactersAOF(req.body.address1));
form.getTextField("address2AOF").setText(addSpacesAfterCharactersAOF(req.body.address2));
form.getTextField("address3AOF").setText(addSpacesAfterCharactersAOF(req.body.address3));
form.getTextField("cityAOF").setText(addSpacesAfterCharactersAOF(req.body.city));

form.getTextField("stateAOF").setText(addSpacesAfterCharactersAOF(req.body.state));
form.getTextField("pinAOF").setText(addSpacesAfterCharactersAOF(req.body.pin));
form.getTextField("mobileAOF").setText(addSpacesAfterCharactersAOF(req.body.mobile));
form.getTextField("emailAOF").setText(addSpacesAfterCharactersAOF(req.body.email));
// form.getTextField("gstAOF").setText(addSpacesAfterCharactersAOF(req.body.gst));
// form.getTextField("cinAOF").setText(addSpacesAfterCharactersAOF(req.body.cin));

form.getTextField("panAOF").setText(addSpacesAfterCharactersAOF(req.body.pan));
if(req.body.gst!==""){
  form.getTextField("identificationFatca").setText(addSpacesAfterCharactersAOF(req.body.gst));
}else{
  form.getTextField("identificationFatca").setText(addSpacesAfterCharactersAOF(req.body.cin));
}

// --
form.getTextField("natureOfActivity").setText(req.body.natureOfActivity);
form.getTextField("sourceOfFunds").setText(req.body.sourceOfFunds);
// form.getTextField("PrincipalPlaceOfBusiness").setText(req.body.PrincipalPlaceOfBusiness);
form.getRadioGroup("chequeBookRequest").select(req.body.chequeBookRequest);
form.getRadioGroup("atmRequest").select(req.body.atmRequest);
form.getRadioGroup("smsRequest").select(req.body.smsRequest);
form.getRadioGroup("mobileBankingRequest").select(req.body.mobileBankingRequest);
form.getRadioGroup("posRequest").select(req.body.posRequest);
form.getRadioGroup("upiPosRequest").select(req.body.upiPosRequest);
form.getRadioGroup("internetBankingRequest").select(req.body.internetBankingRequest);
form.getRadioGroup("creditFacilityEnjoy").select(req.body.creditFacilityEnjoy);
form.getTextField("proprietorName").setText(req.body.proprietorName);

// form.getRadioGroup("InitialRemittance").select(req.body.initialRemittance);
// form.getTextField("ipAmount").setText(req.body.ipAmount);
// form.getTextField("remittingBranch").setText(req.body.remittingBranch);
// form.getTextField("chequeDate").setText(req.body.chequeDate);
form.getRadioGroup("nominationRequired").select(req.body.nominationRequired);
form.getTextField("nomineeNameAndAddress").setText(req.body.nomineeNameAndAddress);
form.getTextField("nomineeRelation").setText(req.body.nomineeRelation);
form.getTextField("place").setText(req.body.place);
form.getTextField("date").setText(formatDate2(req.body.date));
form.getTextField("dateNormalBox").setText(addSpacesAfterCharactersAOFSPL(formatDate(req.body.date)));
// form.getTextField("proprietorAddress").setText(req.body.proprietorAddress);
form.getTextField("branchAddress").setText(req.body.branchAddress);
// form.getTextField("canvacedPPC").setText(req.body.canvacedPPC);

//FOR AOF FORMAT
splitTextIntoShortBoxes(req.body.proprietorName,"proprietorName")
splitTextIntoShortBoxes(req.body.aadhar,"aadhar")

// form.getTextField("proprietorNameAOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorName));
// form.getTextField("proprietorAddress1AOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorAddress1AOF));
// form.getTextField("proprietorAddress2AOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorAddress2AOF));
// form.getTextField("proprietorAddress3AOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorAddress3AOF));
// form.getTextField("proprietorAddressStateAOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorAddressStateAOF));
// form.getTextField("proprietorAddressPINAOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorAddressPINAOF));
// form.getTextField("email").setText(addSpacesAfterCharactersAOF(req.body.email));
form.getTextField("mobileAOF").setText(addSpacesAfterCharactersAOF(req.body.mobile));
form.getTextField("placeAOF").setText(addSpacesAfterCharactersAOF(req.body.place));
form.getTextField("dateAOF").setText(addSpacesAfterCharactersAOF(formatDate(req.body.date)));
form.getTextField("canvacedPPCAOF").setText(addSpacesAfterCharactersAOF(req.body.canvacedPPC));

///

/////for cif id create form
form.getTextField("fatherName").setText(req.body.fatherName);
form.getTextField("motherName").setText(req.body.motherName);
form.getTextField("spouseName").setText(req.body.spouseName);
// form.getTextField("dateOfBirth").setText(req.body.dateOfBirth);
form.getTextField("dateOfBirthNormal").setText(formatDate2(req.body.dateOfBirth));
form.getTextField("dateOfBirthSPL").setText(addSpacesAfterCharactersAOFSPL(formatDate(req.body.dateOfBirth)));
form.getTextField("community").setText(req.body.community);
// form.getTextField("aadharAOF").setText(addSpacesAfterCharactersAOF(req.body.aadhar));
form.getTextField("aadhar").setText(req.body.aadhar);

form.getRadioGroup("maritialStatus").select(req.body.maritialStatus);
form.getRadioGroup("gender").select(req.body.gender);

splitTextIntoShortBoxes(req.body.proprietorAddress1AOF,"proprietorAddress1")
splitTextIntoShortBoxes(req.body.proprietorAddress2AOF,"proprietorAddress2")
splitTextIntoShortBoxes(req.body.proprietorAddress3AOF,"proprietorAddress3")
splitTextIntoShortBoxes(req.body.proprietorAddressStateAOF,"proprietorState")
splitTextIntoShortBoxes(req.body.proprietorAddressPINAOF,"proprietorPin")
// form.getTextField("proprietorAddress1AOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorAddress1AOF));
// form.getTextField("proprietorAddress2AOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorAddress2AOF));
// form.getTextField("proprietorAddress3AOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorAddress3AOF));
// form.getTextField("proprietorAddressStateAOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorAddressStateAOF));
// form.getTextField("proprietorAddressPINAOF").setText(addSpacesAfterCharactersAOF(req.body.proprietorAddressPINAOF));
form.getRadioGroup("premisesType").select(req.body.premisesType);
const qrCode = "QR." + req.body.regName + "@SIB";
form.getTextField("qrCode").setText(qrCode);




function addSpacesAfterCharactersAOF(inputText) {
  const characters = inputText.split('');

  // Use Array.map to add four spaces after each character
  const textWithSpaces = characters.map((char, index) => {
      // Add two spaces before the first character
      if (index === 0) {
          return '  ' + char+'    ';
      } else if (char==='@')
      {
        return char + ' ';
      }else
      // Add four spaces after each subsequent character
      return char + '    ';
  }).join('');

  return textWithSpaces;
}

function splitTextIntoShortBoxes(longtext, fieldName) {
  var maxlength = longtext.length;
  console.log()
  var chunkSize = maxlength;
  var charArray = longtext.split('');
  var piece
  for (let i = 0; i < longtext.length; i++) {
      piece=charArray[i];
      
      form.getTextField(`${fieldName}Piece${i}`).setText(piece);
  }
}

//for dates, there are additional space after day month, so this function.
function addSpacesAfterCharactersAOFSPL(inputText) {
  const characters = inputText.split('');

  // Use Array.map to add four spaces after each character
  const textWithSpaces = characters.map((char, index) => {
      // Add two spaces before the first character
      if (index === 0) {
          return '  ' + char+'    ';
      } else if (index===2)
      {
        return char + '     ';
      }else if(index===4){
        return char + '     ';
      }else
      // Add four spaces after each subsequent character
      return char + '    ';
  }).join('');

  return textWithSpaces;
}
///11022024
function formatDate(inputDate) {
  const parts = inputDate.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return day + month + year;
}
//11-02-2024
function formatDate2(inputDate) {
  const parts = inputDate.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return `${day}-${month}-${year}`;
}

///this function split into three parts
function splitDate(dateString) {
  const parts = dateString.split('-');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  return { day, month, year };
}
      // console.log(req.body)

    // Add more fields as needed

    // Save the filled PDF
    const filledPdfBytes = await pdfDoc.save();

    fs.writeFileSync("filled_form.pdf", filledPdfBytes);

    res.download("filled_form.pdf"); // Send the filled PDF as a download
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
