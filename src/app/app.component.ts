import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    projectForm: FormGroup;
    forbiddenProjectNames = 'Test';

    ngOnInit() {
        this.projectForm = new FormGroup({
            projectName: new FormControl(null, Validators.required, this.forbiddenNames),
            email: new FormControl(null, [Validators.required, Validators.email]),
            projectStatus: new FormControl('stable'),
        });
    }

    // forbiddenNames(control: FormControl): { [s: string]: boolean } {
    //     if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
    //         return { projectNameForbidden: true };
    //     }
    //     return null;
    // }

    forbiddenNames(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'Test') {
                    resolve({ projectNameForbidden: true });
                } else {
                    resolve(null);
                }
            }, 1500);
        });
        return promise;
    }

    onSubmit() {
        console.log(this.projectForm);
    }
}
