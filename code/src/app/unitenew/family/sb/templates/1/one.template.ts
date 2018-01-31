import { Component } from '@angular/core';
import { renderMapper } from '../../renderer/renderers.collection';

@Component({
    templateUrl : "./one.template.html"
})
export class OneTemplate{
    renderMapper = renderMapper;
}