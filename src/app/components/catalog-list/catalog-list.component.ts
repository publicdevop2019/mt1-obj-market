import { Component, OnInit } from '@angular/core';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
import { Router } from '@angular/router';
import { notNullAndUndefined } from 'src/app/classes/utility';
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
    public topLevel = true
    private catalogs: ICatalogCard[];
    public catalogsTree: ICatalogCustomerTreeNode[];
    public currentNodes: ICatalogCustomerTreeNode[];
    constructor(
        private httpProxy: HttpProxyService,
        private router: Router,
    ) {
        this.httpProxy
            .getCatalog()
            .subscribe(next => {
                this.catalogs = next.data;
                this.catalogsTree = this.convertToTree(next.data);
                this.currentNodes = this.catalogsTree;
            });

    }

    ngOnInit() { }
    private convertToTree(catalogs: ICatalogCard[]): ICatalogCustomerTreeNode[] {
        let levelIndex = 0;
        const rootNodes = catalogs.filter(e => e.parentId === null || e.parentId === undefined);
        const treeNodes = rootNodes.map(e => ({ id: e.id, name: e.name } as ICatalogCustomerTreeNode));
        let currentLevel = treeNodes;
        levelIndex++;
        while (this.notLeafNode(catalogs, currentLevel)) {
            const nextLevelCol: ICatalogCustomerTreeNode[] = []
            currentLevel.forEach(childNode => {
                const nextLevel = catalogs.filter(el => el.parentId === childNode.id)
                    .map(e => ({ id: e.id, name: e.name, } as ICatalogCustomerTreeNode));
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
        this.topLevel = false;
        if (node.children && node.children.length > 0) {
            this.currentNodes = node.children;
        }
        else {
            this.router.navigateByUrl('/catalogs/' + node.id)
        }
    }
    public lastNavList() {
        const parentId = this.catalogs.find(e => e.id === this.currentNodes[0].id).parentId;
        const grandParentId = this.catalogs.find(e => e.id === parentId).parentId;
        const grandParent = this.catalogs.find(e => e.id === grandParentId);
        if (grandParent === undefined) {
            this.currentNodes = this.catalogsTree;
            this.topLevel = true;
        } else {
            this.currentNodes = this.findNodeById(this.catalogsTree, grandParentId, this.catalogs)
        }
    }
    findNodeById(catalogsTree: ICatalogCustomerTreeNode[], nodeId: number, catalogs: ICatalogCard[]): ICatalogCustomerTreeNode[] {
        const path: number[] = [nodeId];
        let paId = catalogs.find(e => e.id === nodeId).parentId;
        while (notNullAndUndefined(paId)) {
            paId = catalogs.find(e => e.id === paId).parentId;
            if (notNullAndUndefined(paId)) {
                path.push(paId)
            }
        }
        let currentLevel: ICatalogCustomerTreeNode[] = catalogsTree;
        path.reverse().forEach(id => {
            currentLevel = currentLevel.find(e => e.id === id).children
        })
        return currentLevel
    }
}
