import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent  implements OnInit{
  product: any[] = []
  search: string = ''
  check: string = 'add'
  file: string = ''

  formProduct = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    price: new FormControl<number>(0),
    sale: new FormControl<number>(0),
    qty: new FormControl<number>(0),
    img: new FormControl<string>('')
  })

  ngOnInit(): void {
    this.formProduct.controls['img'].setValue('assets/img/')
    this.prod.getProductHttp().subscribe(data =>{
      this.product = data
    })
  }

  changeFile(event: any){
    let str = event.target.files[0].name
    this.file = 'assets/img/' + str

  }

  add(){
    this.formProduct.controls['img'].setValue(this.file)
    this.prod.addProduct(this.formProduct.value).subscribe(res =>{
      this.ngOnInit()
      alert('Add success')
    })
  }

  update(){
    this.formProduct.controls['img'].setValue(this.file)
    this.prod.Update(this.id, this.formProduct.value).subscribe(res =>{
      this.ngOnInit()
      alert('Update success')
    })
  }

  delete(item: any){
    if (confirm('Product deletion confirmation???')){
      this.prod.Delete(item.id).subscribe(res =>{
        this.ngOnInit()
        alert('Delete success')
      })
    }
  }

  filterData(){
    let dataFilter = this.product

    if (this.search){
      dataFilter = dataFilter.filter(item =>{
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }

    return dataFilter
  }

  id: string = ''
  edit(item: any){
    this.check = 'update'
    this.id = item.id

    this.formProduct.controls['name'].setValue(item.name)
    this.formProduct.controls['description'].setValue(item.description)
    this.formProduct.controls['price'].setValue(item.price)
    this.formProduct.controls['sale'].setValue(item.sale)
    this.formProduct.controls['qty'].setValue(item.qty)
    this.formProduct.controls['img'].setValue(item.img)
  }

  constructor(private prod: ProductService){
    prod.getProductHttp().subscribe(data =>{
      this.product = data
    })
  }
}
