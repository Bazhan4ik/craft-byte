import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
    ],
})
export class HomePage {
    constructor() { };

    interval: any = null!;
    timeouts: any[] = [];
    darken = false;
    fontClasses = ["f1", "f2", "f3", "f4"];

    @ViewChildren("modifyText") texts!: QueryList<ElementRef<HTMLDivElement>>;


    onHover() {
        this.interval = setInterval(() => {
            const used: string[] = [];

            for (const text of this.texts.toArray()) {
                const font = this.fontClasses.filter(x => !used.includes(x))[Math.floor(Math.random() * this.fontClasses.length - used.length) + 1];
                used.push(font);

                this.timeouts.push(setTimeout(() => {
                    text.nativeElement.classList.remove(...this.fontClasses);
                    text.nativeElement.classList.add(font);
                }, Math.floor(Math.random() * 700)));
            }
        }, 1000);
    }
    onLeave() {
        clearInterval(this.interval);
        for (const timeout of this.timeouts) {
            clearTimeout(timeout);
        }
        this.timeouts = [];

        for (const text of this.texts.toArray()) {
            text.nativeElement.classList.remove(...this.fontClasses);
        }
    }
}
