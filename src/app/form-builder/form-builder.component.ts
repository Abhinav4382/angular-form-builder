import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-form-builder',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent {
  inputName: string = '';
  inputType: string = 'text';
  required: string = 'false';
  inputLabel: string = '';
  formElements: any[] = [];
  generatedFormHtml: string = '';

  addElement() {
    if (!this.inputName || !this.inputLabel) {
      alert('Please fill in all fields');
      return;
    }

    const newElement = {
      name: this.inputName,
      type: this.inputType,
      required: this.required === 'true',
      label: this.inputLabel,
    };

    this.formElements.push(newElement);
    this.inputName = '';
    this.inputType = 'text';
    this.required = 'false';
    this.inputLabel = '';
  }
  createForm() {
    let formHTML = '<form id="formHTML">\n';

    this.formElements.forEach(element => {
      formHTML += `  <label for="${element.name}">${element.label}</label>\n`;

      if (element.type === 'dropdown') {
        formHTML += `  <select name="${element.name}" id="${element.name}"${element.required ? ' required' : ''}>\n`;
        formHTML += `    <option value="Option 1">Option 1</option>\n`;
        formHTML += `  </select>\n`;
      } else {
        formHTML += `  <input type="${element.type}" name="${element.name}" id="${element.name}"${element.required ? ' required' : ''}>\n`;
      }
    });

    formHTML += '</form>';

    this.generatedFormHtml = formHTML;
  }
}
