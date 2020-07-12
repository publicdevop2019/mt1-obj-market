import { Component, OnInit } from '@angular/core';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
import { Router } from '@angular/router';
export interface ICatalogCard {
    id: number;
    name: string;
    attributes: string[];
    parentId?: number;
}
export interface ICatalogNet {
    data: ICatalogCard[];
}
export interface ICatalogCustomerTreeNode {
    id: number,
    name: string,
    children?: ICatalogCustomerTreeNode[],
    tags?: string[],
}
@Component({
    selector: 'app-catalog-list',
    templateUrl: './catalog-list.component.html',
    styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {
    public catalogsTree: ICatalogCustomerTreeNode[];
    public currentNode: ICatalogCustomerTreeNode[];
    constructor(
        private httpProxy: HttpProxyService,
        private router: Router,
    ) {
        this.httpProxy.netImpl
            .getCatalog()
            .subscribe(next => {
                this.catalogsTree = this.convertToTree(next.data)
                this.currentNode = this.catalogsTree;
            });

    }

    ngOnInit() { }
    private convertToTree(catalogs: ICatalogCard[]): ICatalogCustomerTreeNode[] {
        let rootNodes = catalogs.filter(e => e.parentId === null || e.parentId === undefined);
        let treeNodes = rootNodes.map(e => <ICatalogCustomerTreeNode>{
            id: e.id,
            name: e.name,
        });
        let currentLevel = treeNodes;
        while (this.notLeafNode(catalogs, currentLevel)) {
            let nextLevelCol: ICatalogCustomerTreeNode[] = []
            currentLevel.forEach(childNode => {
                let nextLevel = catalogs.filter(el => el.parentId === childNode.id).map(e => <ICatalogCustomerTreeNode>{
                    id: e.id,
                    name: e.name,
                });
                childNode.children = nextLevel;
                nextLevelCol.push(...nextLevel);
            });
            currentLevel = nextLevelCol;
        }
        return treeNodes;
    }
    private notLeafNode(catalogs: ICatalogCard[], nodes: ICatalogCustomerTreeNode[]): boolean {
        return nodes.filter(node => {
            return catalogs.filter(el => el.parentId === node.id).length >= 1
        }).length >= 1
    }
    public updateList(node: ICatalogCustomerTreeNode) {
        if (node.children && node.children.length > 0)
            this.currentNode = node.children
        else {
            this.router.navigateByUrl('/catalogs/' + node.name)
        }
    }
}
