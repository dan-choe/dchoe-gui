import { Component, Input, OnInit } from '@angular/core';
import { NodeNav } from './nodenav';
import { NodeNavService } from './nodenav.service';

import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

import { NgForm } from '@angular/forms';

// Testing NodeNav for creating, retreving, updating and deleting nodes

@Component({
  selector: 'app-nodenav',
//   template: '<div>NodeNavComponent Template</div>'
  templateUrl: 'nodeNav.component.html'
})
export class NodeNavComponent implements OnInit
{
    nodeNavs: NodeNav[];
    newNodeNav: NodeNav = new NodeNav();

    constructor(private nodeNavService: NodeNavService) 
    {

    }

    ngOnInit(): void
    {
        this.getNodeNavs();
    }
    
    getNodeNavs(): void
    {
        this.nodeNavService.getAllNodes()
            .then(nodes => this.nodeNavs = nodes);
    }

    createNodeNav(nodeNavForm: NgForm): void
    {
        this.nodeNavService.createNode(this.newNodeNav)
            .then(value => {
                nodeNavForm.reset();
                this.newNodeNav = new NodeNav();
                this.nodeNavs.unshift(value);
            });
    }

    deleteNodeNav(id: string): void
    {
        this.nodeNavService.deleteNode(id)
            .then(() => {
                this.nodeNavs = this.nodeNavs.filter(node => node.id != id);
            });
    }
}