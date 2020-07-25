import { Component, OnInit } from '@angular/core';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CONSTANT_I18N } from 'src/locale/constant';
import { isNullOrUndefined } from 'util';
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
    public topLevel: boolean = true
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
        let rootNodes = catalogs.filter(e => e.parentId === null || e.parentId === undefined);
        let treeNodes = rootNodes.map(e => <ICatalogCustomerTreeNode>{
            id: e.id,
            name: e.name,
        });
        let currentLevel = treeNodes;
        levelIndex++;
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
        this.topLevel = false;
        if (node.children && node.children.length > 0) {
            this.currentNodes = node.children;
        }
        else {
            this.router.navigateByUrl('/catalogs/' + node.id)
        }
    }
    public lastNavList() {
        let parentId = this.catalogs.find(e => e.id === this.currentNodes[0].id).parentId;
        let grandParentId = this.catalogs.find(e => e.id === parentId).parentId;
        let grandParent = this.catalogs.find(e => e.id === grandParentId);
        if (grandParent === undefined) {
            this.currentNodes = this.catalogsTree;
            this.topLevel = true;
        } else {
            this.currentNodes = this.findNodeById(this.catalogsTree, grandParentId, this.catalogs)
        }
    }
    findNodeById(catalogsTree: ICatalogCustomerTreeNode[], id: number, catalogs: ICatalogCard[]): ICatalogCustomerTreeNode[] {
        let path: number[] = [id];
        let paId = catalogs.find(e => e.id === id).parentId;
        while (!isNullOrUndefined(paId)) {
            let paId: number = catalogs.find(e => e.id === paId).parentId;
            if (!isNullOrUndefined(paId))
                path.push(paId)
        }
        let currentLevel: ICatalogCustomerTreeNode[] = catalogsTree;
        path.reverse().forEach(id => {
            currentLevel = currentLevel.find(e => e.id === id).children
        })
        return currentLevel
    }
}
