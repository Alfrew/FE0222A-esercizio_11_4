import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-td-form",
  template: `
    <h2>Template Driven Form</h2>
    <form (ngSubmit)="submit()" #f="ngForm">
      <div ngModelGroup="userInfo" id="userInfo" #userGroup="ngModelGroup">
        <div class="mb-3 form-group">
          <label for="username" class="form-label">Username</label>
          <input type="email" ngModel name="username" #username="ngModel" class="form-control" id="username" />
        </div>

        <div class="mb-3 form-group">
          <label for="email" class="form-label">Email address</label>
          <input type="email" ngModel name="email" class="form-control" id="email" />
        </div>
      </div>

      <div class="mb-3 form-group">
        <label for="password" class="form-label">Password</label>
        <input type="password" ngModel name="password" class="form-control" id="password" />
      </div>

      <div class="mb-3 form-group">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" ngModel name="description" id="description"></textarea>
      </div>

      <div class="radio" *ngFor="let genere of generi">
        <label>
          <input type="radio" name="sex" ngModel [value]="genere.value" required />
          {{ genere.label }}
        </label>
      </div>

      <button type="submit" [disabled]="f.invalid" class="btn btn-primary">Submit</button>
    </form>
  `,
  styles: [],
})
export class TdFormComponent implements OnInit {
  @ViewChild("f", { static: true }) form!: NgForm;

  generi = [
    { label: "uomo", value: "man" },
    { label: "donna", value: "woman" },
  ];

  user: any = {};
  constructor() {}

  ngOnInit(): void {
    this.form.statusChanges?.subscribe((status) => {
      console.log("Form status: ", status);
    });
  }

  submit() {
    console.log("form submitted!", this.form);
    this.user.username = this.form.value.userInfo.username;
    this.user.email = this.form.value.userInfo.email;
    this.user.description = this.form.value.description;
    this.user.sex = this.form.value.sex;

    this.form.reset();
  }
}
