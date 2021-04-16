import { IProductDetail } from 'src/app/pages/product-detail/product-detail.component';

export const mockProductDetail: IProductDetail = {
  id: '835606421200896',
  name: '【迪士尼合作款】ONE MORE2020夏季新款涂鸦薄上衣短袖T恤女',
  imageUrlSmall: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/1652714638/O1CN01v4m3ta1k8FYY743F6_!!1652714638.jpg_430x430q90.jpg',
  imageUrlLarge: [
    'https://img.alicdn.com/imgextra/i3/384661685/O1CN01l7joqz1OJlxuNwjiN_!!384661685-0-lubanu-s.jpg_430x430q90.jpg',
    'https://gd2.alicdn.com/imgextra/i2/763299481/O1CN01Alm2Ew2JuLhCamzjk_!!763299481.jpg_400x400.jpg',
    'https://img.alicdn.com/imgextra/i3/384661685/O1CN01l7joqz1OJlxuNwjiN_!!384661685-0-lubanu-s.jpg_430x430q90.jpg'
  ],
  description: '圆领图案薄上衣',
  specification: [],
  lowestPrice: 179,
  totalSales: 0,
  attributeSaleImages: [
    {
      attributeSales: '835604723556352:玫红',
      imageUrls: ['https://img.alicdn.com/imgextra/i3/384661685/O1CN01l7joqz1OJlxuNwjiN_!!384661685-0-lubanu-s.jpg_430x430q90.jpg']
    },
    {
      attributeSales: '835604723556352:白色',
      imageUrls: ['https://gd2.alicdn.com/imgextra/i2/763299481/O1CN01Alm2Ew2JuLhCamzjk_!!763299481.jpg_400x400.jpg',
        'https://img.alicdn.com/imgextra/i3/384661685/O1CN01l7joqz1OJlxuNwjiN_!!384661685-0-lubanu-s.jpg_430x430q90.jpg']
    }
  ],
  selectedOptions: [
    {
    title: '数量',
    options: [
      {
        optionValue: '2',
        priceVar: 'x2'
      },
      {
        optionValue: '3',
        priceVar: 'x3'
      }
    ]
  },
    {
    title: '个性挂饰',
    options: [
      {
        optionValue: '普通',
        priceVar: '+50'
      },
      {
        optionValue: '豪华',
        priceVar: '+100'
      }
    ]
  }
],
  skus: [
    {
      attributesSales: [
        '835604663263232:155/80A/XS',
        '835604723556352:玫红'
      ],
      storage: 0,
      price: 179,
      skuId:'abc'
    },
    {
      attributesSales: [
        '835604723556352:玫红',
        '835604663263232:160/84A/S'
      ],
      storage: 0,
      price: 179,
      skuId:'abc'
    },
    {
      attributesSales: [
        '835604723556352:玫红',
        '835604663263232:165/88/A/M'
      ],
      storage: 0,
      price: 179,
      skuId:'abc'
    },
    {
      attributesSales: [
        '835604663263232:155/80A/XS',
        '835604723556352:白色'
      ],
      storage: 0,
      price: 179.9,
      skuId:'abc'
    }
  ],
  attrIdMap: {
    835604663263232: '尺码',
    835604723556352: '颜色'
  }
}