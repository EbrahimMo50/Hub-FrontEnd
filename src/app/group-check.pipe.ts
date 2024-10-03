import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupCheck',
  standalone: true
})
export class GroupCheckPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(value === "" || value === undefined || value === null)
      return "No Group assigned!";
    else
      return value.name;
  }

}
