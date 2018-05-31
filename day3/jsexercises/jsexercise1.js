/*
Write a program to calculate the total price of your phone purchase. 

You will keep purchasing phones (hint: loop!) until you run out of money in your bank account. 
You'll also buy accessories for each phone as long as your purchase amount is below your mental spending threshold.

After you've calculated your purchase amount, add in the tax, then print out the calculated purchase amount, properly formatted.

Finally, check the amount against your bank account balance to see if you can afford it or not.
You should set up some constants for the "tax rate," "phone price," "accessory price," and "spending threshold," as well as a variable for your "bank account balance.""

You should define functions for calculating the tax and for formatting the price with a "$" and rounding to two decimal places.
*/

const taxRate = 0.02;
const phonePrice = 210;
const accesoryPrice = 29;
const spendingThreshold = 300;
var bankAccount = 9500;

function phoneAccesoryPurchase(){

    var tempBank = bankAccount;
    var perPurchaseCost = phonePrice;
    var totalCost = 0;
    
    while((perPurchaseCost+accesoryPrice) < spendingThreshold)
	perPurchaseCost += accesoryPrice;
    
    //console.log(perPurchaseCost)
    while((totalCost+perPurchaseCost) < bankAccount)
	totalCost += perPurchaseCost;
    
    return totalCost;
}

function addTax(totalCost){
    return totalCost *= (1+taxRate);
}

function outputPrice(price){
    return "$" + price.toFixed(2);
}

function canAfford(price){
    if (price < bankAccount)
	return "You can afford this :)";
    else
	return "You can't afford this :(";
}

var totalCost = phoneAccesoryPurchase();
console.log("Price before Tax: " + outputPrice(totalCost));

var totalCostWithTax = addTax(totalCost);
console.log("Price with Tax: " + outputPrice(totalCostWithTax));

console.log(canAfford(totalCostWithTax))
