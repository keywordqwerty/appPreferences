import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

interface userPreferences {
  option1: boolean;
  option2: boolean;
  option3: boolean;
  rangeValue: number;
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  radioValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  

  currentPreference: userPreferences = {
    option1: false,
    option2: false,
    option3: false,
    rangeValue: 0,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    radioValue: 'option1'
  };

  constructor() {
    this.loadPreferences();
  }

  async loadPreferences() {
    const { value } = await Preferences.get({ key: 'userPreferences'});
    if (value) {
      this.currentPreference = JSON.parse(value);
    }
  }

  async savePreferences() {
    await Preferences.set({
      key: 'userPreferences',
      value: JSON.stringify(this.currentPreference)
    });
  }

  async resetPreferences() {
    this.currentPreference = {
      option1: false,
      option2: false,
      option3: false,
      rangeValue: 0,
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      radioValue: 'option1'
    };
    await this.savePreferences();
  }
}
