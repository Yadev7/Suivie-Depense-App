import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './user-account-settings.html',
})
export class UserAccountSettingsComponent {
    activeTab = 'home';
    constructor() {}

    async ngOnInit(): Promise<void> {}

    onSubmit() {
        this.activeTab = 'home';
    }
}
