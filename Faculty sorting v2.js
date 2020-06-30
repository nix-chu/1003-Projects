class Student
{
	constructor(studId,fname,lname,dob,gender,country,address,email,ph)
	{
		this._studId = studId;
		this._fname = fname;
		this._lname = lname;
		this._dob = dob;
		this._gender = gender;
		this._country = country;
		this._address = address;
		this._email = email;
		this._ph = ph;
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
													mark: "",
												},
												{
													code: "ENG1003",
													mark: "",
												},
												{
													code: "ENG1021",
													mark: "",
												},
										]
									}
								];
	}
	get studId() {return this._studId;}
	get fname() {return this._fname;}
	get lname() {return this._lname;}
	get dob() {return this._dob;}
	get gender() {return this._gender;}
	get country() {return this._country;}
	get address() {return this._address;}
	get email() {return this._email;}
	get ph() {return this._ph;}
	get enrolmentRecord() {return this._enrolmentRecord;}

	set fname(newFname) {this._fname=newFname;}
	set lname(newLname) {this._lname=newLname;}
	set gender(newGender) {this._gender=newGender;}
	set address(newAddress) {this._address=newAddress;}
	set email(newEmail) {this._email=newEmail;}
	set ph(newPh) {this._ph=newPh;}

	toString()
	{
		return this.fname+", "+this._lname.toUpperCase()+" (ID:"+this._studId+", Phone:"+this._ph+", Email:"+this._email+")<br>";
	}

	_searchForUnit(unitCode)
	{
		let currentSem = this._enrolmentRecord[this._enrolmentRecord.length-1].units;
		let unitFoundAtIndex = -1;
		if (currentSem.length >= 1)
		{
			unitFoundAtIndex = currentSem.findIndex(
				function(item)
				{
					return item.code == unitCode;
				}
			);
		}
		console.log(unitFoundAtIndex);
		return unitFoundAtIndex;
	}
	
	_getGradeFromMark(mark)
	{
		if (mark>=0 && mark<=100)
		{
			if (mark<50)
			{
				return "Grade: N Fail";
			}
			else if (mark<60)
			{
				return "Grade: P Pass";
			}
			else if (mark<70)
			{
				return "Grade: C Credit";
			}
			else if (mark<80)
			{
				return "Grade: D Distinction";
			}
			else
			{
				return "Grade: HD High Distinction";
			}
		}
		else
		{
			return null;
		}
	}

	enrolUnit(unitCode)
	{
		let last = this.enrolmentRecord.length-1;
		let anObj = {
			code:"",
			mark:"",
			grade:""
		};

		for (let i=0;i<this._enrolmentRecord.length;i++)
		{
			for (let j=0;j<this._enrolmentRecord[i].units.length;j++)
			{
				if (this._enrolmentRecord[i].units[j].code.includes(unitCode) == false)
				{
					if (this._enrolmentRecord[last].units.length != 4)
					{
						anObj.code = unitCode;
						this._enrolmentRecord[last].units.push(anObj);
						console.log(this._enrolmentRecord[1].units[3].code);
					}
				}
			}
		}
	}

	removeUnit(unitCode)
	{
		for (let i=0;i<this._enrolmentRecord.length;i++)
		{
			for (let j=0;j<this._enrolmentRecord[i].units.length;j++)
			{
				if (this._enrolmentRecord[i].units[j].code.includes(unitCode) == true)
				{
					this._enrolmentRecord[i].units.splice(j);
					console.log(this.enrolmentRecord[1].units[3]);
				}
			}
		}
	}

	updateMark(unitCode,mark)
  {
	  for (let i=0;i<this._enrolmentRecord.length;i++)
	  {
		  for (let j=0;j<this._enrolmentRecord[i].units.length;j++)
		  {
			  if (this._enrolmentRecord[i].units[j].code.includes(unitCode) == true)
			  {
				  this._enrolmentRecord[i].units[j].mark = mark;
				  console.log(this._enrolmentRecord[1].units[0].mark);
			  }
			  else {break;}
		  }
	  }
  }
}

class Faculty
{
  constructor(facname)
  {
    this._facname = facname;
    this._student = [];
  }

  get facname() {return this._facname;}
  get student() {return this._student;}

  set facname(newFacname) {this._facname = newFacname;}
  set student(newStudent) {this._student = newStudent;}

  enrolStudent(student)
	{
		if (student instanceof Student && !this._student.includes(student))
		{
			this._student.push(student);
		}
	}

	updateStudentMark(studentId,unitCode,mark)
	{
		let theStudent = this._student.includes(studentId);
		{
			let index = this._student.findIndex(
				function(item)
				{
					return item == studentId;
				}
			);
			if (this.student[index] instanceof Student)
			{
				this.student[index].updateMark(unitCode,mark);
			}
		}
	}

  toString()
  {
    return "<b>"+this._facname+":</b> "+this._student.length+" students enrolled ";
  }

  printStudentList()
  {
		let output = "";
	  let counter = 0;
	  for (let i=0;i<2;i++)
	  {
		  counter++;
		  output += counter+": "+this._student[i]+"<br>";
	  }
	  return output;
  }
}

let ravenclaw = new Faculty("Ravenclaw");
console.log(ravenclaw);

let student1 = new Student("20194986","Jonni","Lower","29/09/1999","Male","Australia","somewhere","jlow0001@student.monash.edu","0472819562");
console.log(student1);

ravenclaw.enrolStudent(student1);
console.log(ravenclaw);

let student2 = new Student("123213412","sdfsd","Lowerdfswer","29/09/1999","Male","Australia","somewhere","jlow0001@student.monash.edu","0472819562");
ravenclaw.enrolStudent(student2);
console.log(ravenclaw);
console.log(ravenclaw.printStudentList());

ravenclaw.updateStudentMark("20194986","ENG1002","69");

console.log(student1._enrolmentRecord[1].units[0].mark);
