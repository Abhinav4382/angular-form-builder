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
  elementName: string = '';   
  elementType: string = 'text';   
  isRequired: string = 'false';   
  elementLabel: string = '';   
  formStructure: any[] = [];   
  generatedFormCode: string = '';   

  addFormElement() {
    if (!this.elementName || !this.elementLabel) {
      alert('Please fill in all fields');
      return;
    }

    const newFormElement = {
      name: this.elementName,
      type: this.elementType,
      required: this.isRequired === 'true',
      label: this.elementLabel,
    };

    this.formStructure.push(newFormElement);
    this.resetFormInputs(); 
  }

  resetFormInputs() {
    this.elementName = '';
    this.elementType = 'text';
    this.isRequired = 'false';
    this.elementLabel = '';
  }

  generateFormHTML() {
    let formHTML = '<form id="generatedForm">\n';

    this.formStructure.forEach(element => {
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

    this.generatedFormCode = formHTML;
  }
}
