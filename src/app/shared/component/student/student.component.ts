import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Istd } from '../../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  studentArr: Array<Istd> = [{
    fname: "gajanan",
    lname: "kadam",
    email: "gaju@123",
    contact: 8552043307,
    id: "123"
  }]

  editId !: string
  isEditMode: boolean = false;
  @ViewChild('addstudent') addstudent!: NgForm
  constructor() { }

  ngOnInit(): void {
  }


  onsubmit() {

    if (this.addstudent.invalid) return;
    let stdobj = {
      id: Date.now().toString(),
      ...this.addstudent.value
    }
    console.log(stdobj)


    this.studentArr.push(stdobj);
    this.addstudent.reset();

  }

  trackById(_index: number, stdobj: Istd) {
    return stdobj.id
  }

  onremove(id: string) {
    let getindex = this.studentArr.findIndex(a => a.id === id)
    this.studentArr.splice(getindex, 1)

  }
  onedit(stdobj: Istd) {
    this.editId = stdobj.id;
    this.isEditMode = true;

    this.addstudent.setValue({
      fname: stdobj.fname,
      lname: stdobj.lname,
      email: stdobj.email,
      contact: stdobj.contact
    })

  }

  onupdate() {
    if (this.addstudent.invalid) return;

    let getindex = this.studentArr.findIndex(a => a.id === this.editId)
    let updateobj = {
      id: this.editId,
      ...this.addstudent.value
    }
    this.studentArr[getindex] = updateobj
    this.isEditMode = false

    this.addstudent.reset();
  }

}
