import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'uniteMapper'})
export class UniteMapperPipe implements PipeTransform {
    transform(value, node: string): string {

        if(node.indexOf('.') !== -1)
        {
            let dataNode = node.split(".");

            let myFinalValue = value;
            
            dataNode.forEach(element => {
                myFinalValue = myFinalValue[element];
            });

            return myFinalValue;
        }
        else
        {
            return value[node];
        }
    }
  }