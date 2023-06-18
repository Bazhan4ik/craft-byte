import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.page.html',
    styleUrls: ['./contact.page.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule]
})
export class ContactPage implements OnInit {
    constructor(private recaptchaV3Service: ReCaptchaV3Service, private http: HttpClient, private route: ActivatedRoute) { }

    reCAPTCHAToken: string = "";
    form!: FormGroup;
    success = false;


    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            message: new FormControl(null, Validators.required),
        });
        this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
            this.reCAPTCHAToken = token;
        });
        switch (this.route.snapshot.queryParamMap.get("t")) {
            case "informational":
                this.form.controls["message"].setValue("I want a beautiful informational website to describe my ...");
                break;
            case "restaurant":
                this.form.controls["message"].setValue("I want a beautiful website for my restaurant. It should show ...");
                break;
            case "modify":
                this.form.controls["message"].setValue("I want some modifications to my existing website. This is what I want: ...");
                break;
            case "mobile":
                this.form.controls["message"].setValue("I want a mobile app for ...");
                break;
            case "complex":
                this.form.controls["message"].setValue("I want to have a complex web-app to solve many functions like: ...");
                break;
            default:
                break;
        }
    }



    async submit() {
        if (!this.form.valid) {
            return;
        }


        try {
            const result: any = await firstValueFrom(
                this.http.post("/api/message", { ...this.form.value, token: this.reCAPTCHAToken })
            );

            console.log(result);

            if (result && result.message == "ok") {
                this.form.reset();
                this.success = true;
            } else {

            }
        } catch (error) {

        }

    }
    focus() {
        this.form.controls["message"].setValue((this.form.controls["message"].value as string).replace("...", ""));
    }
}
