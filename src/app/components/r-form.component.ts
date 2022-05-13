import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Component({
  selector: "app-r-form",
  template: `
    <h2>Reactive Form</h2>
    <form [formGroup]="form">
      <div id="userInfo" formGroupName="userInfo">
        <div class="mb-3 form-group">
          <label for="username" class="form-label">Username</label>
          <input type="email" formControlName="username" class="form-control" id="username" />
        </div>

        <div class="mb-3 form-group">
          <label for="email" class="form-label">Email address</label>
          <input type="email" formControlName="email" class="form-control" id="email" />
        </div>
      </div>

      <div class="mb-3 form-group">
        <label for="password" class="form-label">Password</label>
        <input type="password" formControlName="password" class="form-control" id="password" />
      </div>

      <div class="mb-3 form-group">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" formControlName="description" id="description"></textarea>
      </div>

      <div class="radio" *ngFor="let genere of generi">
        <label>
          <input type="radio" formControlName="sex" />
          {{ genere }}
        </label>
      </div>

      <button type="submit" (click)="onSubmit()" class="btn btn-primary">Submit</button>
    </form>
  `,
  styles: [],
})
export class RFormComponent implements OnInit {
  generi = ["man", "woman"];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userInfo: this.fb.group({
        username: this.fb.control(null, [Validators.required]),
        email: this.fb.control(null, [Validators.required, Validators.email]),
      }),
      password: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null),
      sex: this.fb.control(null, [Validators.required]),
    });

    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onSubmit() {
    console.log(this.form);
    this.form.reset();
  }
}
