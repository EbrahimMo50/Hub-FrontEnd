import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanValidations',
  standalone: true
})
export class CleanValidationsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    
    return null;
  }

}
