import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  // this HTTP Client object is the one who allow to make the server requests (HTTP requests).
  constructor(private client: HttpClient) { }

  //GET - will return all the items.
  getAllItems(){
    return this.client.get<Item[]>("http://localhost:3000/items/all");
  }

//GET- will return one item by given id - this id pass as path varaible.
  getItemById(id: number){
    return this.client.get<Item>("http://localhost:3000/items/" + id);
  }

//POST - will add a new item to the array and return this item as an answer.
  addItem(item: Item){
    return this.client.post<Item>("http://localhost:3000/items/add", item );
  }

//PUT- will update an exicting item by given id and return this item as an answer - this id pass as path varaible..
  updateItem(item: Item){
    return this.client.put<Item>("http://localhost:3000/items/update/" + item.id, item);
  }
//DELETE - will delete an exicting item from the array by given id - this id pass as path varaible.
  removeItem(id: number){
    return this.client.delete("http://localhost:3000/items/delete/" + id, {responseType:'text'});
  }

//PUT- will update an exicting count item and return this item as an answer - id and amount are path varaibles.
  withdrawItem(item: Item, amount:number){
    return this.client.put<Item>("http://localhost:3000/items/withdraw/" + item.id + "/" + amount, item);
  }

//PUT- will update an exicting count item and return this item as an answer - id and amount are path varaibles.
  depositItem(item: Item, amount: number){
    return this.client.put<Item>("http://localhost:3000/items/deposit/" + item.id + "/" + amount, item);
  }



}
