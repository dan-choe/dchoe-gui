import { Injectable } from '@angular/core';
import { NodeNav } from './nodenav';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';

// When RxJs converts an Observable to a Promise, 
// it creates a Promise that will yield the last value from the observable
// The promise will resolve to the last emiited value of the Observable once the Observable completes.
// Using toPromise() is an anti async-await

// To get the data from backend by calling spring boot apis. 
@Injectable()
export class NodeNavService 
{
    private baseUrl = 'http://localhost:8080/nodenav/';

    constructor(private http: HttpClient) { }

    getAllNodes(): Promise<NodeNav[]>
    {
        return this.http.get(this.baseUrl)
            .toPromise()
            .then(response => response as NodeNav[])
            .catch(this.handleError);
    }

    createNode(newNode: NodeNav): Promise<NodeNav>
    {
        return this.http.post(this.baseUrl, newNode)
            .toPromise()
            .then(response => response as NodeNav)
            .catch(this.handleError);
    }

    deleteNode(id: string): Promise<NodeNav>
    {
        return this.http.delete(this.baseUrl + '/' + id)
            .toPromise()
            .catch(this.handleError);
    }

    editNode(theNode: NodeNav): Promise<NodeNav>
    {
        return this.http.put(this.baseUrl + '/' + theNode.id, theNode)
            .toPromise()
            .then(response => response as NodeNav)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any>
    {
        console.error('Error occured', error);
        return Promise.reject(error.message || error);
    }
}

