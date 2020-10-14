import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Chicken and Rice Casserole', 
        'This is simply a test', 
        'https://www.simplyrecipes.com/wp-content/uploads/2014/06/Chicken-Rice-Casserole-LEAD-2.jpg',
        [
           new Ingredient('Meat', 1),
           new Ingredient('French Fries', 20)
        ]),
        new Recipe('Bunsen Burger', 
        'Best Burger In Ireland', 
        'https://images.squarespace-cdn.com/content/v1/5ac3943fda02bcfea41797c2/1524734787476-DB4AA1KAKVQ4YXULEDC1/ke17ZwdGBToddI8pDm48kCKxPW2sfGBnvcQSgcMLVQQUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dh4T5RKB6zPI3hbe2JUz2BbdWsSPbgPXsF7Rr_6Gv48QZDqXZYzu2fuaodM4POSZ4w/BUNSEN_BURGER_21.jpg?format=1500w',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
      ];

      constructor(private slService: ShoppingListService){

      }
      getRecipes(){
          return this.recipes.slice();
      }
      getRecipe(index: number){
          return this.recipes[index];
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]){
          this.slService.addIngredients(ingredients);

      }
}