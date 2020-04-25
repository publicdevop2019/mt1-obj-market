import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { i18n } from 'src/locale/i18n';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    durationInSeconds = 2;
    private locale: string; // locale work around
    constructor(private snackBar: MatSnackBar, @Inject(LOCALE_ID) locale: string) {
        this.locale = locale;
    }
    openSnackBar(announcement: string) {
        const afterI18n = i18n[this.locale.replace('-', '')][announcement];
        this.snackBar.open(afterI18n, 'OK', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top',
        });
    }
}
