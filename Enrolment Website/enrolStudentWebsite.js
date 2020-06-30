/*
code for worksheet 3 starts below all the code for prac 6 (after the code for storing student
details in local storage)
*/

"use strict";
/* Classes */
class Student
{
	constructor(studentId, firstName, lastName, dob, gender, country, address, email, phone)
	{
		this._studentId = studentId;
		this._firstName = firstName;
		this._lastName = lastName;
		this._dob = dob;
		this._gender = gender;
		this._country = country;
		this._address = address;
		this._email = email;
		this._phone = phone;
		this._enrolmentRecord = [
		    {
		        semester: 1,
		        year: 2019,
		        units: [
		            {
		                code: "ENG1001",
		                mark: 82,
		                grade: "HD"
		            },
		            {
		                code: "ENG1005",
		                mark: 95,
		                grade: "HD"
		            },
		            {
		                code: "ENG1060",
		                mark: 72,
		                grade: "D"
		            },
		            {
		                code: "MAT1830",
		                mark: 64,
		                grade: "C"
		            },
		        ]
		    },
		    {
		        semester: 2,
		        year: 2019,
		        units: [
		            {
		                code: "ENG1002",
		            },
		            {
		                code: "ENG1003",
		            },
		            {
		                code: "ENG1021",
		            },
		            {
		                code: "ENG1051",
		            },
		        ]
		    }
		];
	}
	get studentId() { return this._studentId; }
	get firstName() { return this._firstName; }
	get lastName() { return this._lastName; }
	get dob() { return this._dob; }
	get gender() { return this._gender; }
	get country() { return this._country; }
	get address() { return this._address; }
	get email() { return this._email; }
	get phone() { return this._phone; }

	get semesters() { return this._enrolmentRecord.length; }
	get fullName() { return this._firstName + ", " + this.lastName.toUpperCase(); }

	set firstName(newName) { this._firstName = newName; }
	set lastName(newName) { this._lastName = newName; }
	set address(newAddress) {this._address = newAddress; }
	set email(newEmail) { this._email = newEmail; }
	set phone(newPhone) { this._phone = newPhone; }

	printStudentRecord()
	{
		let output = "";
		output += "<h2>Student Enrolment Record</h2>";
		output += "<b>Student</b>: " + this.fullName + " (" + this._studentId + ")<br/><br/>";

		const GPA_LOOKUP = {
		    "HD": 4,
		    "D": 3.0,
		    "C": 2.0,
		    "P": 1.0,
		    "N": 0.3,
		};
		const UNIT_CREDIT_POINT = 6;
		let gpaTotal = 0;
		let wamCreditPointTotal = 0;
		let wamMarkTotal = 0;
		let creditTotal = 0;
		let wamWeight = 0;

		let record = this._enrolmentRecord;
		for (let sem = 0; sem < record.length; sem++)
		{
			let currSem = record[sem];
			output += "<h3>Semester: " + currSem.semester + ", " + currSem.year + "</h3>";
			for (let unit = 0; unit < currSem.units.length; unit++)
			{
				let currUnit = currSem.units[unit];
				if (currUnit.mark === undefined)
				{
					output += "<b>" + currUnit.code + "</b><br/>";
				}
				else
				{
					output += "<b>" + currUnit.code + "</b>: " + currUnit.mark + " (" + currUnit.grade + ")<br/>";
					// GPA/WAM
					gpaTotal += (GPA_LOOKUP[currUnit.grade]*6);
			        creditTotal += UNIT_CREDIT_POINT;
			        if (currUnit.code.substr(3,1) == 1)
			        {
			            wamWeight = 0.5;
			        }
			        else
			        {
			            wamWeight = 1.0;
			        }
			        wamMarkTotal += currUnit.mark * UNIT_CREDIT_POINT * wamWeight;
			        wamCreditPointTotal += UNIT_CREDIT_POINT * wamWeight;
				}
			}
			output += "<br/>";
		}

		let finalGPA = gpaTotal/creditTotal;
		output += "Current GPA: " + finalGPA.toFixed(2) + "<br/>";
		let finalWAM = wamMarkTotal / wamCreditPointTotal;
		output += "Current WAM: " + finalWAM.toFixed(3) + "<br/>";

		return output;
	}
	enrolUnit(unit)
    {
        // if there at least one 'semester' or item in the enrolmentRecord
        if(this._enrolmentRecord.length >= 1)
        {
            // check if current semester enrolment < four units
            let currSemEnrolRecord = this._enrolmentRecord[this._enrolmentRecord.length - 1].units;
            if (currSemEnrolRecord.length < 4)
            {
                // check if unit isn't enrolled
                let searchResult = this._searchForUnitCode(unit);
                if (searchResult == -1)
                {
                    // add the unit code to the units array
                    currSemEnrolRecord.push(
                        {
                            code: unit
                        }
                    );
                }
            }
        }
    }

    removeUnit(unit)
    {
        // if there is at least one 'semester' in the enrolmentRecord
        if (this._enrolmentRecord.length >= 1)
        {
            let currSemEnrolRecord = this._enrolmentRecord[this._enrolmentRecord.length - 1].units;
            // search for unit
            let searchResult = this._searchForUnitCode(unit);
                // if found, remove unit
                if (searchResult != -1)
                {
                    currSemEnrolRecord.splice(searchResult,1);
                }

        }
    }

    _getGradeFromMark(mark)
    {
        let grade = "";
        if (!isNaN(mark) && (mark >= 0 && mark <= 100))
        {
            if (mark >= 80)
            {
                grade = "HD";
            }
            else if (mark >= 70)
            {
                grade = "D";
            }
            else if (mark >= 60)
            {
                grade = "C";
            }
            else if (mark >= 50)
            {
                grade = "P";
            }
            else
            {
                grade = "N";
            }
        }
        else
        {
            grade = "null";
        }
        return grade;
    }

    _searchForUnitCode(unitCode)
    {
        /*
         * This is a private method searches the current semester for a given unitCode
         * If it exists, the index is returned; else it returns -1.
         */
        let currentSem = this._enrolmentRecord[this._enrolmentRecord.length - 1].units;
        let result = -1; // assume it's never found
        if (currentSem.length >= 1) // ensures that theres at least 1 item in array
        {
            result = currentSem.findIndex(
                function(arrayItem)
                {
                    return arrayItem.code == unitCode;
                }
            );
        }
        return result;
    }
    updateMark(unit, mark)
    {
        // validate unit is enrolled
        if (this._enrolmentRecord.length >= 1)
        {
            let currSemEnrolRecord = this._enrolmentRecord[this._enrolmentRecord.length - 1].units;
            // search for unit
            let searchResult = this._searchForUnitCode(unit);
                // if found
                if (searchResult != -1)
                {
                    // check if mark is valid
                    if (this._checkValidMark(mark))
                    {
                        // get grade for this mark
                        let grade = this._getGradeFromMark(mark);
                        // update units array with mark and grade
                        currSemEnrolRecord[searchResult].mark = mark;
                    }
                }
        }
    }

	fromData(data)
	{
		this._studentId = data._studentId;
		this._firstName = data._firstName;
		this._lastName = data._lastName;
		this._dob = data._dob;
		this._gender = data._gender;
		this._country = data._country;
		this._address = data._address;
		this._email = data._email;
		this._phone = data._phone;
		this._enrolmentRecord = [
		    {
		        semester: 1,
		        year: 2019,
		        units: [
		            {
		                code: "ENG1001",
		                mark: 82,
		                grade: "HD"
		            },
		            {
		                code: "ENG1005",
		                mark: 95,
		                grade: "HD"
		            },
		            {
		                code: "ENG1060",
		                mark: 72,
		                grade: "D"
		            },
		            {
		                code: "MAT1830",
		                mark: 64,
		                grade: "C"
		            },
		        ]
		    },
		    {
		        semester: 2,
		        year: 2019,
		        units: [
		            {
		                code: "ENG1002",
		            },
		            {
		                code: "ENG1003",
		            },
		            {
		                code: "ENG1021",
		            },
		            {
		                code: "ENG1051",
		            },
		        ]
		    }
		];
	}

	toString()
	{
		return this.fullName + " ( ID: " + this._studentId + " , Phone: " + this._phone + " , Email: " + this._email + " ) ";
	}
}
class Faculty
{
	constructor(name)
	{
		this._facultyName = name;
		this._students = [];
	}
	get facultyName() { return this._facultyName; }
	get students() { return this._students; }
	set facultyName(newName) { this._facultyName = newName; }
	getStudent(index)
	{
		if (index >= this._students.length)
		{
			return null;
		}
		return this._students[index];
	}
	printStudentList()
	{
		let output = "<b>Student List</b><br/>";
        if (this._students.length > 0)
        {
            for (let i = 0; i < this._students.length; i++)
            {
                output += (i+1) + ": " + this._students[i] + "<br/>";
            }
        }
        else
        {
            output += "<i>No students enrolled</i>";
        }
        return output;
	}

	toString()
	{
		return "<b>" + this._facultyName + "</b>:" + this._students.length + " students enrolled";
	}
	enrolStudent(student)
    {
        // check if student is an instance of Student
        if (student instanceof Student)
        {
            // check if student already enrolled
            let searchResult = this._searchForStudentId(student.studentId);
            if (searchResult == -1) // student not found
            {
                // we can enrol the student
                this._students.push(student);
            }
        }
        else
        {
            console.log("Error: not an instance of Student");
        }
    }
    updateStudentMark(studentId, unitCode, mark)
    {
        // check if student exists
        let searchResult = this._searchForStudentId(studentId);
        if (searchResult != -1) // if found
        {
            // update mark
            this._students[searchResult].updateMark(unitCode, mark);
        }
    }
    _searchForStudentId(id)
    {
        /*
         * This is a private method searches the student list for a given student id
         * If it exists, the index is returned; else it returns -1.
         */
        let students = this._students;
        let result = -1; // assume it's never found
        if (students.length >= 1) // ensures that theres at least 1 item in array
        {
            result = students.findIndex(
                function(arrayItem)
                {
                    return arrayItem.studentId == id;
                }
            );
        }
        return result;
    }
}

/* Functions for page */

/**
 * showEnrolmentRecord function
 * @param  studentIndex index of student to display enrolment record for
 * This function displays a dialog box (only works properly on chrome) for the given student.
 * @requires faculty uses a global faculty class instance
 */
function showEnrolmentRecord(studentIndex)
{

	let student = faculty.getStudent(studentIndex);
	if (student != null)
	{
		let dialogBox = "";
		dialogBox += '<dialog class="mdl-dialog" style="width:50vw;"><h4 class="mdl-dialog__title">Information</h4><div class="mdl-dialog__content">';
		dialogBox += student.printStudentRecord();

		dialogBox +='</div><div class="mdl-dialog__actions"><button type="button" class="mdl-button close">Close</button></div></dialog>';
		document.getElementById("hiddenDialog").innerHTML = dialogBox;
		let dialog = document.querySelector('dialog');
	    let showDialogButton = document.querySelector('#show-dialog');
	    if (!dialog.showModal) {
	      dialogPolyfill.registerDialog(dialog);
	    }
	    dialog.showModal();
	    dialog.querySelector('.close').addEventListener('click', function() {
	      dialog.close();
	    });
	}

}

/**
 * viewStudent function
 * @param  index index of student to view information
 * This function displays the information for the selected student.
 * @requires faculty uses a global faculty class instance
 * @requires HTMLelement uses html elements as defined for fields
 */
function viewStudent(index)
{
	document.getElementById("studentInfoCard").style.visibility = "visible";
	let selectedStudent = faculty.getStudent(index);
	document.getElementById("studentId").innerText = selectedStudent.studentId;
	document.getElementById("fullName").innerText = selectedStudent.fullName;
	document.getElementById("dateOfBirth").innerText = selectedStudent.dob;
	document.getElementById("gender").innerText = selectedStudent.gender;
	document.getElementById("address").innerText = selectedStudent.address;
	document.getElementById("country").innerText = selectedStudent.country;
	document.getElementById("email").innerText = selectedStudent.email;
	document.getElementById("phone").innerText = selectedStudent.phone;
	document.getElementById("enrolmentRecordButton").setAttribute("onclick","showEnrolmentRecord("+index+")");
}

/**
 * generateStudentList function
 * This function generates the table body for the list of students
 * @return output returns HTML output in a string
 * @requires faculty uses a global faculty class instance
 */
function generateStudentList()
{
	let studentList = faculty.students;
	let output = "";
	for (let i = 0; i < studentList.length; i++)
	{
		output += "<tr>";
		output += "<td>"+studentList[i].studentId+"</td>";
		output += "<td class=\"mdl-data-table__cell--non-numeric\">"+studentList[i].fullName+"</td>";
		output += "<td>"+studentList[i].semesters+"</td>";
		output += "<td><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"viewStudent("+i+")\">View</a></td>";
		output += "</tr>";
	}
	return output;
}

let student1 = "";

function enrolStudent()
{
	//collecting the data from the user input
  let student = {
    firstName:document.getElementById("fname").value,
    lastName:document.getElementById("lname").value,
    dateOfBirth:document.getElementById("dob").value,
    theGender:document.getElementById("gender").value,
    theCountry:document.getElementById("Zcountry").value,
    theAddress:document.getElementById("Zaddress").value,
    theEmail:document.getElementById("Zemail").value
  };

	//changing the date to day-month-year form
  function changeDate()
  {
  let x = student.dateOfBirth.split("-");
  let realDate = x[2]+"-"+x[1]+"-"+x[0];
  return realDate;
  }

	//setting up random student id (which is not ideal but who cares in this case)
	function newStudentId()
	{
		return (Math.floor(Math.random()*100000000));
	}

	//enrolling the student and displaying the information
	student.studentId = newStudentId();
  student.dateOfBirth = changeDate();
  student1 = new Student(student.studentId,student.firstName,student.lastName,student.dateOfBirth,student.theGender,student.theCountry,student.theAddress,student.theEmail)
	faculty.enrolStudent(student1);
	document.getElementById("studentList").innerHTML = generateStudentList();

	//store into local storage for future use
	let studentString = JSON.stringify(student1);
	localStorage.setItem("savedStudent",studentString);
}

let faculty = new Faculty("FIT");
document.getElementById("studentInfoCard").style.visibility = "hidden";

let savedStudent1 = new Student();
let savedStudentData = JSON.parse(localStorage.getItem("savedStudent"))
savedStudent1.fromData(savedStudentData);
faculty.enrolStudent(savedStudent1);

document.getElementById("studentList").innerHTML = generateStudentList();


// start of worksheet 3

mapboxgl.accessToken = "pk.eyJ1IjoiZWFzeW1vbmV5MTIzIiwiYSI6ImNrMWtubTg1bjJkcnUzbnMxNXltZnF5dXgifQ.ZqaNo7jU2cbqtviis_BSUA";
let map = new  mapboxgl.Map({
  container: 'mapArea',
 center: [144.9648731,-37.8182711],
 zoom: 16,
 style: 'mapbox://styles/mapbox/streets-v9'
});

function jsonpRequest(url, data)
{
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}

/*
this is a function that is activated by the button found in the hidden student card in
the first tab, this is labelled 'Search Student's Address'
*/
function findAddress()
{
	let addressData = {
		q:document.getElementById("address").innerHTML,
		key:"b95c9082b6854a3694ca6db907738aa3",
		jsonp:"locateAddress"
	}

	jsonpRequest("https://api.opencagedata.com/geocode/v1/json",addressData);
}

// callback function
function locateAddress(data)
{
	let coordinates = [data.results[0].geometry.lng,data.results[0].geometry.lat];
  map.panTo(coordinates);

  let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
	marker.setLngLat(coordinates);
  marker.addTo(map);

  let popup = new mapboxgl.Popup({ offset: 45});
	popup.setText("Student's address, ya creep");
  marker.setPopup(popup);
  popup.addTo(map);
}
