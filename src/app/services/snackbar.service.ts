import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    durationInSeconds = 2;
    constructor(private snackBar: MatSnackBar) {}
    openSnackBar(announcement: string) {
        this.snackBar.open(announcement, 'OK', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top'
        });
    }
}
