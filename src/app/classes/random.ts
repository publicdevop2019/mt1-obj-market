import { ICategory } from '../components/category-list/category-list.component';
import {
    IProductSimple,
    IProductDetail,
    IProductOption,
    IProductOptions
} from '../pages/product-detail/product-detail.component';
import { IAddress } from '../modules/account/addresses/addresses.component';
import { ICartItem } from '../pages/cart/cart.component';
import { IOrder } from '../modules/account/card-order/card-order.component';

export class RandomUtility {
    public static randomPrice(min: number, max: number): number {
        return +(Math.random() * (max - min) + min).toFixed(2);
    }
    public static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public static randomSales(): number {
        return RandomUtility.randomInt(0, 9999);
    }
    public static randomFromArray<T>(myArray: T[]): T {
        return myArray[Math.floor(Math.random() * myArray.length)];
    }
    public static randomFixedLengthString(length: number): string {
        return Math.random()
            .toString(36)
            .replace(/[0-9]/g, '')
            .substr(2, length);
    }
    public static randomLengthString(min: number, max: number): string {
        const length = RandomUtility.randomInt(min, max);
        if (length < 15) {
            return RandomUtility.randomFixedLengthString(length);
        } else {
            let iteCount = +(length / 15).toFixed();
            let output = '';
            while (iteCount > 0) {
                output = output + RandomUtility.randomFixedLengthString(15);
                iteCount--;
            }
            return output.substr(0, length);
        }
    }
    public static randomLengthStringWithSpace(
        min: number,
        max: number
    ): string {
        const length = RandomUtility.randomInt(min, max);
        let numOfSpace = Math.floor(length / 5);
        if (length < 15) {
            let noSpaceStr = RandomUtility.randomFixedLengthString(length);
            for (numOfSpace; numOfSpace > 0; numOfSpace--) {
                const index = RandomUtility.randomInt(min, max);
                noSpaceStr =
                    noSpaceStr.slice(0, index) + ' ' + noSpaceStr.slice(index);
            }
            return noSpaceStr.substr(0, length);
        } else {
            let iteCount = +(length / 15).toFixed();
            let output = '';
            while (iteCount > 0) {
                output = output + RandomUtility.randomFixedLengthString(15);
                iteCount--;
            }
            for (numOfSpace; numOfSpace > 0; numOfSpace--) {
                const index = RandomUtility.randomInt(0, length);
                output = output.slice(0, index) + ' ' + output.slice(index);
            }
            return output.substr(0, length);
        }
    }
    public static randomCategories(): ICategory[] {
        let iCount = RandomUtility.randomInt(1, 1);
        const output: ICategory[] = [];
        while (iCount > 0) {
            output.push(RandomUtility.randomCategorieItem());
            iCount--;
        }
        return output;
    }

    public static randomCategorieItem(): ICategory {
        const rUrls: string[] = [
            '//ae01.alicdn.com/kf/HTB1WKJJbErrK1RkSne1763rVVXa8.png_.webp',
            '//ae01.alicdn.com/kf/HTB1jTFBbyzxK1RkSnaV760n9VXas.png_.webp',
            '//ae01.alicdn.com/kf/HTB1jUVBbELrK1Rjy1zb763enFXaQ.png_.webp',
            '//ae01.alicdn.com/kf/HTB16_FBbyzxK1RkSnaV760n9VXaS.png_.webp',
            '//ae01.alicdn.com/kf/HTB1LSNDbyDxK1Rjy1zc761GeXXaN.png_.webp',
            '//ae01.alicdn.com/kf/HTB1cRT4INjaK1RjSZKz760VwXXab.png_.webp',
            '//ae01.alicdn.com/kf/HTB1pxtzbsnrK1RkHFrd760CoFXag.png_.webp',
            '//ae01.alicdn.com/kf/HTB12f4IbvfsK1RjSszg761XzpXaI.png_.webp',
            '//ae01.alicdn.com/kf/HTB152ltbtfvK1RjSspo762fNpXap.png_.webp',
            '//ae01.alicdn.com/kf/HTB1wQ8ybsfrK1Rjy0Fm760hEXXaq.png_.webp'
        ];
        const rTitle: string = RandomUtility.randomLengthString(1, 20);
        const rUrl: string = RandomUtility.randomFromArray<string>(rUrls);
        return {
            url: rUrl,
            title: rTitle,
            routerUrl: '/categories/' + rTitle
        } as ICategory;
    }
    public static randomImageUrl() {
        const rImages: string[] = [
            'https://ae01.alicdn.com/kf/HTB13bm3aUD.BuNjt_h7q6yNDVXaH.jpg_350x350q90.jpg_.webp',
            'https://ae01.alicdn.com/kf/HTB12xZBXcfrK1RkSmLyq6xGApXaP.jpg_220x220q90.jpg',
            'https://ae01.alicdn.com/kf/HTB1Y9VVQbvpK1RjSZPiq6zmwXXaA.jpg_220x220q90.jpg',
            'https://ae01.alicdn.com/kf/HLB1DNpeaiHrK1Rjy0Flq6AsaFXa5.jpg_220x220q90.jpg',
            'https://ae01.alicdn.com/kf/HTB1abhjXLWG3KVjSZFgq6zTspXad.jpg_220x220q90.jpg',
            'https://ae01.alicdn.com/kf/HTB1oY72RxnaK1RjSZFtq6zC2VXaz.jpg_220x220q90.jpg',
            'https://ae01.alicdn.com/kf/H054f4c94f12c4072a4786f84bbcb3782V.jpg_220x220q90.jpg',
            'https://ae01.alicdn.com/kf/HTB1ATPHXfOzK1Rjt_jDq6zJwpXai.jpg_220x220q90.jpg',
            'https://ae01.alicdn.com/kf/HTB1VYy3cqWs3KVjSZFxq6yWUXXac.jpg_220x220q90.jpg',
            'https://ae01.alicdn.com/kf/HTB1QeEobfBj_uVjSZFpq6A0SXXao.jpg_220x220q90.jpg'
        ];
        return RandomUtility.randomFromArray<string>(rImages);
    }
    public static randomProductSimpleFromCategory(
        categories: ICategory
    ): IProductSimple {
        return {
            imageUrlSmall: RandomUtility.randomImageUrl(),
            name: RandomUtility.randomLengthString(0, 20),
            description: RandomUtility.randomLengthStringWithSpace(100, 200),
            lowestPrice: RandomUtility.randomPrice(0, 9999).toString(),
            totalSales: RandomUtility.randomSales().toString(),
            category: categories.title,
            id: RandomUtility.randomInt(0, 9999).toString()
        } as IProductSimple;
    }
    public static randomProductSimpleListFromCategory(
        categories: ICategory
    ): IProductSimple[] {
        let length = RandomUtility.randomInt(0, 50);
        const output: IProductSimple[] = [];
        while (length > 0) {
            output.push(
                RandomUtility.randomProductSimpleFromCategory(categories)
            );
            length--;
        }
        return output;
    }
    public static randomImageUrls(
        min: number,
        max: number,
        def: string
    ): string[] {
        let length = RandomUtility.randomInt(min, max);
        const output: string[] = [def];
        while (length > 0) {
            output.push(RandomUtility.randomImageUrl());
            length--;
        }
        return output;
    }
    public static randomProductDetailFromSimple(
        simple: IProductSimple
    ): IProductDetail {
        return {
            imageUrlSmall: simple.imageUrlSmall,
            name: simple.name,
            description: simple.description,
            lowestPrice: simple.lowestPrice,
            totalSales: simple.totalSales,
            id: simple.id,
            imageUrlLarge: RandomUtility.randomImageUrls(
                0,
                5,
                simple.imageUrlSmall
            ),
            selectedOptions: RandomUtility.randomProductOptions()
        } as IProductDetail;
    }
    public static randomProductOptions(): IProductOptions[] {
        let length = RandomUtility.randomInt(0, 5);
        const qty = {
            title: 'Qty',
            options: [
                {
                    optionValue: '1',
                    priceVar: 'x1'
                },
                {
                    optionValue: '2',
                    priceVar: 'x2'
                },
                {
                    optionValue: '3',
                    priceVar: 'x3'
                },
                {
                    optionValue: '4',
                    priceVar: 'x4'
                },
                {
                    optionValue: '5',
                    priceVar: 'x5'
                }
            ]
        } as IProductOptions;
        const output: IProductOptions[] = [];
        while (length > 0) {
            const item = {
                title: RandomUtility.randomLengthString(1, 20),
                options: RandomUtility.randomProductOption()
            } as IProductOptions;
            output.push(item);
            length--;
        }
        output.push(qty);
        return output;
    }
    public static randomProductOption(): IProductOption[] {
        let length = RandomUtility.randomInt(1, 5);
        const output: IProductOption[] = [];
        while (length > 0) {
            const item = {
                optionValue: RandomUtility.randomLengthString(1, 10),
                priceVar:
                    RandomUtility.randomFromArray(['-', '+']) +
                    RandomUtility.randomPrice(0, 10.99).toString()
            } as IProductOption;
            output.push(item);
            length--;
        }
        return output;
    }
    public static randomAddressList(): IAddress[] {
        let length = RandomUtility.randomInt(0, 10);
        const output: IAddress[] = [];
        while (length > 0) {
            const item = RandomUtility.randomAddress();
            output.push(item);
            length--;
        }
        return output;
    }
    public static randomAddress(): IAddress {
        const country = ['Canada', 'China', 'US', 'Europe'];
        const province = [
            'Ontario',
            'Quebec',
            'Nova Scotia',
            'New Burnswick',
            'Manitoba',
            'Britsh Columbia'
        ];
        return {
            id: RandomUtility.randomInt(0, 9999).toString(),
            country: RandomUtility.randomFromArray(country),
            province: RandomUtility.randomFromArray(province),
            postalCode:
                RandomUtility.randomLengthString(1, 1) +
                RandomUtility.randomInt(0, 9) +
                RandomUtility.randomLengthString(1, 1) +
                RandomUtility.randomLengthString(1, 1) +
                RandomUtility.randomInt(0, 9) +
                RandomUtility.randomLengthString(1, 1),
            fullName: RandomUtility.randomLengthStringWithSpace(0, 20),
            line1: RandomUtility.randomLengthString(0, 50),
            line2: RandomUtility.randomLengthString(0, 50),
            city: RandomUtility.randomLengthString(0, 10),
            phoneNumber: RandomUtility.randomInt(0, 9999999999).toString()
        } as IAddress;
    }
    public static randomCartOrders(min: number): ICartItem[] {
        let length = RandomUtility.randomInt(min, 50);
        const output: ICartItem[] = [];
        while (length > 0) {
            const item = {
                id: RandomUtility.randomInt(0, 9999).toString(),
                productId: RandomUtility.randomInt(0, 9999).toString(),
                finalPrice: RandomUtility.randomPrice(0, 9999).toString(),
                selectedOptions: RandomUtility.randomProductOptions(),
                name: RandomUtility.randomLengthString(1, 20),
                imageUrlSmall: RandomUtility.randomImageUrl()
            } as ICartItem;
            output.push(item);
            length--;
        }
        return output;
    }
    public static randomSuccessOrder(): IOrder {
        return {
            id: RandomUtility.randomInt(0, 9999).toString(),
            productList: RandomUtility.randomCartOrders(10),
            address: RandomUtility.randomAddress(),
        } as IOrder;
    }
    public static randomSuccessOrderList(): IOrder[] {
        let length = RandomUtility.randomInt(0, 10);
        const output: IOrder[] = [];
        while (length > 0) {
            output.push(RandomUtility.randomSuccessOrder());
            length--;
        }
        return output;
    }
}
