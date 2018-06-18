import { Component, Injectable } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { NodeNav } from './nodenav';
import { NgForm } from '@angular/forms';

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  filename: string;
  type: any;
  level: number;
  expandable: boolean;
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
const TREE_DATA = `
  {
    "Menu 1": {
      "Sub 1-1": {
        "Sub 1-1-1": {
          "a": "a",
          "b": "a"
        }
      },
      "Sub 1-2": {
        "Sub 1-2-1": {
          "a": "a",
          "b": "b",
          "c": "c"
        }
      }
    },
    "Menu 2": {
        "Sub 2-1": "a",
        "Sub 2-2": "b",
        "Sub 2-3": "c"
    },
    "Menu 3": {
        "Sub 3-1": "a",
        "Sub 3-2": "b",
        "Sub 3-3": "c"
    }
  }`;


/**
 * Build a tree structed JSON object from string.
 */
@Injectable()
export class FileDatabase {
  // Observer
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested file node as children.
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    // Observer's next method. When you use next, you fire off an event that all subscribers will listen too
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(value: any, level: number): FileNode[] {
    let data: any[] = [];
    for (let k in value) {
      let v = value[k];
      let node = new FileNode();
      node.filename = `${k}`;
      if (v === null || v === undefined) {
        // no action
      } else if (typeof v === 'object') {
        node.children = this.buildFileTree(v, level + 1);
      } else {
        node.type = v;
      }
      data.push(node);
    }
    return data;
  }
}

@Component({
  selector: 'app-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.css'],
  providers: [ FileDatabase ]
})
export class NavTreeComponent 
{

  treeControl: FlatTreeControl<FileFlatNode>;

  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;

  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;

  constructor(database: FileDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  transformer = (node: FileNode, level: number) => {
    let flatNode = new FileFlatNode();
    flatNode.filename = node.filename;
    flatNode.type = node.type;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    return flatNode;
  }

  collapse(){
    return null;
  }

  expand(){
    return null;
  }

  getNodeNavs(): void {

  }


  private _getLevel = (node: FileFlatNode) => { return node.level; };

  private _isExpandable = (node: FileFlatNode) => { return node.expandable; };

  private _getChildren = (node: FileNode): Observable<FileNode[]> => {
    return observableOf(node.children);
  }

  hasChild = (_: number, _nodeData: FileFlatNode) => { return _nodeData.expandable; };

}
