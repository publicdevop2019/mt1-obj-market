import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONSTANT_I18N } from 'src/locale/constant';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    durationInSeconds = 2;
    constructor(private snackBar: MatSnackBar) {
    }
    openSnackBar(announcement: string) {
        const afterI18n = CONSTANT_I18N[announcement];
        this.snackBar.open(afterI18n, 'OK', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top',
        });
    }
}
