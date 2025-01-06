'use strict'

//there are 52 cards in total, and player start with 0 card until receive it
const NUM = 52;
const HAND = 0;

//array to save total of 52 image files and each assigned value with the length of total card numbers
let values = new Array(NUM);
let images = new Array(NUM);

//array to save the images and values for the player, start with length of 0 
let player_images = new Array(HAND);
let player_values = new Array(HAND);

//array to save the images and values for the dealer, start with length of 0 
let dealer_images = new Array (HAND);
let dealer_values = new Array(HAND);

//set hasAce as false, using to check the player or dealer has an ace in the deck or not. 
//Ace can be 11 or 1, depends on the other hands
let hasAce = false;

//setting variables to use to make an array that contains the card images and values
let suitOption = 1;
let cardType = 2;
let suitNumbers = 0;
let assignedValues = 2;

//declare the sum of players and dealers
let valueOfPlayer = 0;
let valueOfDealer = 0;

//set index for dealer and player as 0
let dealer_index = 0;
let player_index = 0;

//declare the varible to check who is the winner
let winner = '';

//declare constants based on the each html element id

//paragraph to show the amount of money player has
const MONEY = document.getElementById('player-money');

//showing images for player's cards - culminating.html
const PLAYER = document.getElementById('player-cards');

//showing a card image - page1.html
const CARD = document.getElementById('card');

//id for dealer images
const DEALER_FIRST = document.getElementById('dealer-first-card');
const DEALER_SECOND = document.getElementById('dealer-second-card');
const ALL_DEALER = document.getElementById('dealer-cards');

//button after the game
const RESTART_BUTTON = document.getElementById('restart');
const PLAY_AGAIN_BUTTON = document.getElementById('play-again');

//button to bet, hit and stand
const BET_BUTTON = document.getElementById('bet');
const GO_BUTTON = document.getElementById('go');
const STOP_BUTTON = document.getElementById('stop');

//to show all images, page1.html
const ALL_IMAGES = document.getElementById('all-images');

//result paragraph
const RESULT = document.getElementById('results');

//paragraph that shows the sum of player cards
const CURRENT = document.getElementById('current');

//textbox to type the amount of money to bet
const PRICE = document.getElementById('price');

//custom values
const CUSTOM_VALUE = document.getElementById('customTarget');
const CUSTOME_DEALER = document.getElementById('customDealer');
const PLAYER_MONEY = document.getElementById('player-money');

//chips images and buttons 
const TEN = document.getElementById('ten');
const HUNDRED = document.getElementById('hundred');
const FIVE_HUNDRED = document.getElementById('five-hundred');
const THOUSAND = document.getElementById('thousand');

const TEN_PIC = document.getElementById('ten-chip');
const HUNDRED_PIC = document.getElementById('hundred-chip');
const FIVE_HUNDRED_PIC = document.getElementById('five-hundred-chip');
const THOUSAND_PIC = document.getElementById('thousand-chip');

//get custom values from localStorage
const CUSTOM_BLACKJACK = localStorage.getItem('newTargetValue');
const CUSTOM_DEALER = localStorage.getItem('newDealerMaxValue');
const CUSTOM_MONEY = localStorage.getItem('playerBank');

//index for page1.html
let pageOneIndex = 0;

//assume firstGame is true in the beggining
let firstGame = true;

//assume 21 is the BlackJack, dealer stops at 17 or higher
let targetValue = 21;
let dealerMaxValue = 17;

//index to show player card's index
let currentIndex = 0;

//delcare the radom to give random card
let random = 0;

//declare variables for bettingMoney and playerMoney
let bettingMoney = 0;
let playerMoney = 10000;



//function to make poker values for parallal image array
function makePokerValues(){
    
    //do this values.length - 16 times, 52-16 = 36 times
    //all the cards except face cards and aces
    for (let i = 0; i < values.length-16; i++){
        //'i'th index becomes 'assignedValues'
        values[i] = assignedValues; 
        //increase suitNumbers value by one
        suitNumbers++;
        //since there are only 4 suits, if suitNumbers is equal to 4
        if (suitNumbers == 4){
            //change suitNumbers as 0
            suitNumbers = 0;
            //increase assignedValues, moving to next value after assigning for each suit
            assignedValues++;
        }
    }

    //let not-numbered values as 10, not-numbered cards = face cards and aces
    let notNumberedValues = 10;

    //start the setting values from where it stopped right befre, every time increase i by one
    //beggining from index of 36 and until it reaches the last index which is index of 52-1 = 51
    for (let i = values.length-16; i < values.length; i++){
        //'i'th index becomes 'notNumberedValues'
        values[i] = notNumberedValues;
        //if 'i' equal to fourth last index, 52-5 = 47
        //indexes for ace values
        if (i == values.length-5){
            //set notNumberedValues as 11 for aces
            notNumberedValues = 11;
        }
    }
}


//function to make poker images for parallal value array
function makePokerImages(){
    //startinf from 0th index, until it reaches the last index of images array
    for (let i = 0; i < images.length; i++) {

        //set suit as null
        let suit = '';
    
        //if suitOption equals to 1
        if (suitOption == 1) {
            //suit becomes clubs
            suit = 'clubs';
            //increase suitOption by one
            suitOption++;
        } 
        //else if suitOption equals to 2
        else if (suitOption == 2) {
            //suit becomes diamonds
            suit = 'diamonds';
            //increase suitOption by one
            suitOption++;
        } 
        //else if suitOption equals to 3
        else if (suitOption == 3) {
            //suit becomes hearts
            suit = 'hearts';
            //increase suitOption by one
            suitOption++;
        } 
        //else if suitOption equals to 4
        else if (suitOption == 4) {
            //suit becomes spades
            suit = 'spades';
            // reset suitOption to 0, since there are only 4 suits
            suitOption = 1;
        }
    
        //if cardType equals to ll
        if (cardType == 11){
            //set cardType as 'jack'
            cardType = 'jack';
        }
        //else if cardType equals to 12
        else if (cardType == 12){
            //set cardType as 'queen'
            cardType = 'queen';
        }
        //else if cardType equals to 13
        else if (cardType == 13){
            //set cardType as 'kind'
            cardType = 'king';
        }
        //else if cardType equals to 14
        else if (cardType == 14){
            //set cardType as 'ace'
            cardType = 'ace';
        }
    
        //'i'th index from images array becomes`Poker/${cardType}_of_${suit}.png`
        //only cardType and suit changes, other words stay in fixed
        images[i] = `Poker/${cardType}_of_${suit}.png`;
    
        //if cardType equals to 'jack
        if (cardType == 'jack'){
            //set back as 11
            cardType = 11;
        }
        //else if cardType equals to 'queen'
        else if (cardType == 'queen'){
            //set back as 12
            cardType = 12;
        }
        //else if cardType equals to 'king'
        else if (cardType == 'king'){
            //set back as 13
            cardType = 13;
        }
        //else if cardType equals to 'ace'
        else if (cardType == 'ace'){
            //set back as 14
            cardType = 14;
        }
        //if suitOption equals to 1, if it assigned all four suits and went back to first suit
        if (suitOption == 1){
            //increase cardType by one
            cardType++;
        }
    }
}




//functions for page1.html
//function to learn when pageOne is loaded
function pageOne(){

    suitOption = 1;
    cardType = 2;
    suitNumbers = 0;

    //assign values to parallel image array
    makePokerValues();
    //make a images array that contatin all 52 different playing cards
    makePokerImages();

    //CARD html const shows 'pageOneIndex'th image from images array
    CARD.src = images[pageOneIndex];
}

//function to go to page2.html
function goToPageTwo(){
    //move to page2.html
    window.location.href = 'page2.html';
}

//function to slide each card, page1.html
function showCards(){

    //increase the pageOneIndex by one to show the card of next index
    pageOneIndex++;

    // if pageOneIndex is greater than the last index of images array
    if (pageOneIndex > images.length-1){
        //set pageOneIndex as 0 to show the first card
        pageOneIndex = 0;
    }
    //put a image of the 'pageOneIndex'th to the html image element
    CARD.src = images[pageOneIndex];
}

//function to show all cards, page1.html
function showAllCards() {

    //Clear all images 
    ALL_IMAGES.innerHTML = '';

    //go thorugh each element for images array and append each image file to the html element
    for (let i = 0; i < images.length; i++) {
        //create an img element
        let allImages = document.createElement('img');
        //assign image file of 'i'th index from images array to the element that just has been created
        allImages.src = images[i];
        //append the image to display
        ALL_IMAGES.appendChild(allImages);
    }
}

//sorting all itmes in ascending order - smallest to largest
function sortAscending(){

    //ascending each array
    images = ascending(images);
    values = ascending(values);

    //display every card images after the array got sorted in ascending 
    showAllCards();
}

//make a copy of each array then change indexes of elements in the array to sort in ascending
function ascending(array){
    
    //make a copy of an array
    let newArray = copy(array);
    //make a copy of values before it gets sorted
    let tempValues = copy (values);

    // go through all the indexes of the array to look for the smallest
    for (let x = 0; x < array.length; x++){
    
        //assume index of x is the smallest
        let indexOfSmallest = x;
    
        //go through the array, comparing each element to find the smallest
        for (let y = x+1; y <tempValues.length; y++){

            //if element for y-index has the lower value than indexofSmallest
            if (tempValues[y] < tempValues [indexOfSmallest]){
                //change indexOfSmalles into y
                indexOfSmallest = y;
            }
        }

        //doing for tempValues, to track correct indexes
        //copy and save the elemenet that will be replaced with next smallest element index
        let tempOne = tempValues[x];
        //bring next smallest element into front, right before previous smallest element
        tempValues[x] = tempValues[indexOfSmallest];
        //replace next smallest element with the element that is replaced with
        tempValues[indexOfSmallest] = tempOne;

        //doing for the given parameter array
        //copy and save the elemenet that will be replaced with next smallest value index
        let tempTwo = newArray[x];
        //bring the element for next smallest index into front, right before element of the previous smallest index
        newArray[x] = newArray[indexOfSmallest];
        //replace the copied element to the index where the element for next smallest was located originally
        newArray[indexOfSmallest] = tempTwo;
    }
    //return array after sorting in ascending based on the copy of values
    return newArray;
}


//sorting all itmes in descending order - largest to smallest
function sortDescending(){

    //descending each array
    images = descending(images);
    values = descending(values);

    //display every card images after the array got sorted in descending 
    showAllCards();
}

//make a copy of each array then change indexes of elements in the array to sort in descending
function descending(array){
    
    //make a copy of an array
    let newArray = copy(array);
    //make a copy of values before it gets sorted
    let tempValues = copy (values);

    // go through all the indexes of the array to look for the largest
    for (let x = 0; x < array.length; x++){
    
        //assume index of x is the smallest
        let indexOfLargest = x;
    
        //go through the array, comparing each element to find the smallest
        for (let y = x+1; y <tempValues.length; y++){

            //if element for y-index has the lower value than indexofSmallest
            if (tempValues[y] > tempValues [indexOfLargest]){
                //change indexOfSmalles into y
                indexOfLargest = y;
            }
        }

        //doing for tempPrices, to track correct indexes
        //copy and save the elemenet that will be replaced with next smallest element index
        let tempOne = tempValues[x];
        //bring next smallest element into front, right before previous smallest element
        tempValues[x] = tempValues[indexOfLargest];
        //replace next smallest element with the element that is replaced with
        tempValues[indexOfLargest] = tempOne;

        //doing for array
        //copy and save the elemenet that will be replaced with next cheapest price index
        let tempTwo = newArray[x];
        //bring the element for next cheapest price index into front, right before element of the previous cheapest price index
        newArray[x] = newArray[indexOfLargest];
        //replace the copied element to the index where the element for next cheapest was located
        newArray[indexOfLargest] = tempTwo;
    }

    //return array after sorting in ascending based on the prices
    return newArray;
}

//function to shuffle all cards
function shuffle(){

    //shuffle randomly
    shuffleRandom();
    //display every card images after the array got shuffled 
    showAllCards();
}


//function to shuffle cards randomly
function shuffleRandom(){
    
    //declare variables to save value and image element temporarily 
    let tempValueSave = '';
    let tempImageSave = '';

    //repeat this for amount of total cards times, NUM times which is 52 times, each time i gets increased by one
    for (let i = 0; i < NUM; i++){

        //make a radon number between i and number of cards
        let random = Math.floor (Math.random() *(NUM-1 - i +1)) + i;

        //save 'i' index of values array temporarily
        tempValueSave = values[i];
        //bring 'random'th index to 'i'th index
        values[i] = values[random];
        //replace back temporarily saved value to the 'random'th index
        values[random] = tempValueSave;

        //save 'i' index of images array temporarily
        tempImageSave = images[i];
        //bring 'random'th index to 'i'th index
        images[i] = images[random];
        //replace back temporarily saved images to the 'random'th index
        images[random] = tempImageSave;
    }
}




//functions for page2.html
//function to reset the custom values 
function resetCustom(){
   
    //change all custom values that are saved to localStorage, to the original values
    //BlackJack = 21; Dealer stops at 17 or above; player has 10000 money to bet
    localStorage.setItem('newTargetValue', 21);
    localStorage.setItem('newDealerMaxValue', 17);
    localStorage.setItem('playerBank', 10000);
}

//function to go back to page one
function goBackPageOne(){
    //move to 'page1.html'
    window.location.href = 'page1.html';
}


//function to go to custom page
function goToCustom(){
    //move to 'custom.html'
    window.location.href = 'custom.html';
}

//function to go to main plying page
function goToMain(){
    //move to 'culminating.html'
    window.location.href = 'culminating.html';
    //set firstGame as true, first game after chaning the custom setting
    firstGame = true;
}




//functions for custom.html
//function to submit to make the custom values
function sumbit(){
    customValues();
}

//change playing settings to what user wants
function customValues(){

    //clear local storage 
    localStorage.clear();

    //save the new values into the localStorage by assigning each id
    localStorage.setItem('newTargetValue', CUSTOM_VALUE.value);
    localStorage.setItem('newDealerMaxValue', CUSTOME_DEALER.value);
    localStorage.setItem('playerBank', PLAYER_MONEY.value);
}

//function to go back to page two
function goBackPageTwo(){
    //clear all the custom values
    resetCustom();
    //move to 'page2.html'
    window.location.href = 'page2.html';
}





//functions for culminating.html
//function to restart the game, culminating.html
function reset(){
    //reload the page
    location.reload();
    //move to the page1.html page
    window.location.href = 'page1.html';
    //reset the custome values, the values that saved into localStorage
    resetCustom();
}

//function to play again
function playAgain(){

    //set iamges and values length as the amounts of total cards, NUM = 52
    images.length = NUM;
    values.length = NUM;

    //not a first game using this new custom values
    firstGame = false;

    //set bettingMoney back to 0
    bettingMoney = 0;

    //setUp the game
    setUp();

    //clear previous game's player and dealer arrays
    clearArray(player_values);
    clearArray(player_images);   
    clearArray(dealer_values);
    clearArray(dealer_images);   
}

//function to increase the bettingMoney by 10 every time when the user clicks the image of '10' chip
function ten(){

    //set current number in the PRICE box as bettingMoney
    bettingMoney = Number(PRICE.value);

    //if player has enough money to bet 10 (more than or equal to 10) 
    if (bettingMoney + 10 <= playerMoney){
        //increase bettingMoney by 10
        bettingMoney = bettingMoney+10;
    }
    //show new bettingMoney to the PRICE textbox
    PRICE.value = bettingMoney;
}

//function to increase the bettingMoney by 100 every time when the user clicks the image of '100' chip
function hundred(){

    //set current number in the PRICE box as bettingMoney
    bettingMoney = Number(PRICE.value);

    //if player has enough money to bet 100(more than or equal to 100) 
    if (bettingMoney + 100 <= playerMoney){
        //increase bettingMoney by 100
        bettingMoney = bettingMoney+100;
    }
    //show new bettingMoney to the PRICE textbox
    PRICE.value = bettingMoney;
}

//function to increase the bettingMoney by 500 every time when the user clicks the image of '500' chip
function fiveHundred(){

    //set current number in the PRICE box as bettingMoney
    bettingMoney = Number(PRICE.value);

    //if player has enough money to bet 500 (more than or equal to 500) 
    if (bettingMoney + 500 <= playerMoney){
        //increase bettingMoney by 500
        bettingMoney = bettingMoney+500;
    }
    //show new bettingMoney to the PRICE textbox
    PRICE.value = bettingMoney;
}

//function to increase the bettingMoney by `1000` every time when the user clicks the image of '1000' chip
function thousand(){

    //set current number in the PRICE box as bettingMoney
    bettingMoney = Number(PRICE.value);

    //if player has enough money to bet 1000 (more than or equal to 1000) 
    if (bettingMoney + 1000 <= playerMoney){
        //increase bettingMoney by 1000
        bettingMoney = bettingMoney+1000;
    }
    //show new bettingMoney to the PRICE textbox
    PRICE.value = bettingMoney;
}

//functio to hide all chips after the game started
function hideChips(){
  
    //hide all buttons of the chips
    TEN.hidden = true;
    HUNDRED.hidden = true;
    FIVE_HUNDRED.hidden = true;
    THOUSAND.hidden = true;

    //hide all images of the chips
    TEN_PIC.hidden = true;
    HUNDRED_PIC.hidden = true;
    FIVE_HUNDRED_PIC.hidden = true;
    THOUSAND_PIC.hidden = true;
}

//function to show all chips after the game ended, to bet again
function showChips(){
  
    //show all chips pictures to each html element
    TEN_PIC.src = 'Chips/10.jpg';
    HUNDRED_PIC.src = 'Chips/100.jpg';
    FIVE_HUNDRED_PIC.src = 'Chips/500.png';
    THOUSAND_PIC.src = 'Chips/1000.jpg';
    
    //do not hide chip buttons
    TEN.hidden = false;
    HUNDRED.hidden = false;
    FIVE_HUNDRED.hidden = false;
    THOUSAND.hidden = false;

    //do not hide chip images
    TEN_PIC.hidden = false;
    HUNDRED_PIC.hidden = false;
    FIVE_HUNDRED_PIC.hidden = false;
    THOUSAND_PIC.hidden = false;
}

//functio to make a random index to assign card
function giveCard(){
    //make a random number between 0 and values.length, to give cards in random 
    random = Math.floor (Math.random() *(values.length-1 - 0 +1)) + 0;
}

//function to set up the game
function setUp(){

    //show chip images and buttons
    showChips();

    //if this is the first game after the user changed the custome values
    if (firstGame == true){
        //player starts the game with CUSTOM_MONEY amounts of money
        playerMoney = CUSTOM_MONEY;
    }

    // Remove any previously displayed dealer images
    clearDealers();
    //assign all starting values
    startingValues();
    //assign values to parallel image array
    makePokerValues();
    //make a images array that contatin all 52 different playing cards
    makePokerImages();

    //hide player and dealer's card images
    PLAYER.hidden = true;
    DEALER_FIRST.hidden = true;
    DEALER_SECOND.hidden = true;

    //hide the paragraph that shows the sum of player cards
    CURRENT.hidden = true;

    //show bet, restart, play again buttons
    BET_BUTTON.hidden = false;
    RESTART_BUTTON.hidden = false;
    PLAY_AGAIN_BUTTON.hidden = false;

    //hide hit and stand buttons
    GO_BUTTON.hidden = true;
    STOP_BUTTON.hidden = true;
}

//make an indentical array
function copy(array){

    //declare new array to copy every elements
    let copyArray = new Array();

    //go through each indexes
    for (let i = 0; i < array.length; i++){
        //copy each element
        copyArray[i] = array[i];
    }
    //return the array after finsihing copying
    return copyArray
}

//function to show all images in the given array
function showNextImage(array) {

    //create an img element
    let nextImage = document.createElement('img');
    //assign image file of 'currentIndex'th index from the given array to the element that just has been created
    nextImage.src = array[currentIndex];
    //append the image to display at html page to the PLAYER constant
    PLAYER.appendChild(nextImage);

    //increase currentIndex by one, to go to next index
    currentIndex++;
}

//function remove a card that has given to the dealer or player
function removeCard(){
    //images = images array after removing the selected element
    images = removeArray(images);
    //values = values array after removing the selected element
    values = removeArray(values);
}

//function start the assigning cards for dealer
function startDealer(){
    
    //randomly assign a card image with the value that pairs with the image
    giveCard();
    //bring that card image and value to the array dealer_images array and dealer_values array
    dealer_images[dealer_index] = images[random];
    dealer_values[dealer_index] = values[random];
    //show the dealer's first card, allowing the user checks the one of the dealer's card
    DEALER_FIRST.src = dealer_images[dealer_index];

    //increase the dealer_index to save next card at next index
    dealer_index++;
    //remove the card imformations that has just assigned to dealer, from the orginal array that contains all image files and values
    removeCard();
    
    //randomly assign a card image with the value that pairs with the image again
    giveCard();
    //bring that card image and value to the array dealer_images array and dealer_values array
    dealer_images[dealer_index] = images[random];
    dealer_values[dealer_index] = values[random];
    //remove the card imformations that has just assigned to dealer, from the orginal array that contains all image files and values
    removeCard();

    //show back side of the second card, user can't see the dealer's second card
    DEALER_SECOND.src = 'Poker/back.png'; 
}

//function start the assigning cards for plaer
function startPlayer(){

    //randomly assign a card image with the value that pairs with the image
    giveCard();
    //bring that card image and value to the array player_images array and player_values array
    player_images[player_index] = images[random];
    player_values[player_index] = values[random];
    //remove the card imformations that has just assigned to player, from the orginal array that contains all image files and values
    removeCard();
    //show all images in the player_images array
    showNextImage(player_images);
    //increase player_index by one, to move to the next index
    player_index++;

    //randomly assign a card image with the value that pairs with the image again
    giveCard();
    //bring that card image and value to the array player_images array and player_values array
    player_images[player_index] = images[random];
    player_values[player_index] = values[random];
    //remove the card imformations that has just assigned to player, from the orginal array that contains all image files and values
    removeCard();
    //show all images in the player_images array
    showNextImage(player_images);
    //increase player_index by one
    player_index++;
}

//function to bet the money, and start the game
function bet(){

    //setting the number from the PRICE textbox as the amount of money player want to bet, 
    bettingMoney = Number(PRICE.value);

    //if player wants to bet more money that he currently has
    if (bettingMoney > playerMoney){
        //alert 'not enough money'
        alert('not enough money');
    }

    //else if player doesn't want to bet any money
    else if(bettingMoney == 0 || PRICE.value == ''){
        //alert decide the amount of money to bet
        alert('decide the amount of money to bet');
    }

    //else if player wants to bet negative amount of money
    else if (bettingMoney < 0){
        //alert bet money should be greater than 0
        alert('bet money should be greater than 0');
    }

    //else, if the bettinMoney makes sense
    else {
        //hide all chips
        hideChips();

        //give cards for dealer
        startDealer();
        //give cards for player
        startPlayer();

        //show player and dealer images, hit and stand button and current sum of the player cards
        CURRENT.hidden = false;
        PLAYER.hidden = false;
        DEALER_FIRST.hidden = false;
        DEALER_SECOND.hidden = false;
        GO_BUTTON.hidden = false;
        STOP_BUTTON.hidden = false;

        //hide bet, restart and play again button
        BET_BUTTON.hidden = true;
        RESTART_BUTTON.hidden = true;
        PLAY_AGAIN_BUTTON.hidden = true;

        //shows the player values
        displayPlayerValues();
    }
}

//function to show the sum of player cards
function displayPlayerValues(){

    //add all player's card values then record the sum to the valueOfPlayer
    valueOfPlayer = addValues(player_values);
    //show valueOfPlayer to the CURRENT paragaph from culminating.html page
    CURRENT.innerText = valueOfPlayer;

    //if valueOfPlayer == targetValue, which is a black jack
    if (valueOfPlayer == targetValue){
        //display BLACK-JACK! Player Won text to the RESULT element
        RESULT.innerText = 'BLACK-JACK! Player Won';
        //set player as the winner  
        winner = 'player';
        //check winner
        checkWinner();
    }
}

//function hit, allowing player to choose one more card
function hit(){

    //randomly assign a card image with the value that pairs with the image again
    giveCard();
    //bring that card image and value to the array player_images array and player_values array
    player_images[player_index] = images[random];
    player_values[player_index] = values[random];
    //remove the card imformations that has just assigned to player, from the orginal array that contains all image files and values
    removeCard();
    //show all images in the player_images array
    showNextImage(player_images);
    //increase player_index by one
    player_index++;
    //shows the player values
    displayPlayerValues();
    //if the sum of player values is greater than targetValue, BlackJack value
    if (valueOfPlayer > targetValue){
        //check the player values to declare the result
        checkPlayerValues(valueOfPlayer);
    }
}

//function to stop getting new cards, stand 
function stand(){
    //set valueOfPlayer as the sum of plaer_values
    valueOfPlayer = addValues(player_values);
    //check the player values to declare the result
    checkPlayerValues(valueOfPlayer);
}

//function for dealer to finsh picking rest cards
function finishDealer(array){

    //set valueOfDealer as the sum of elements for the given array
    valueOfDealer = addValues(array);

    //if valueOfDealer is less than dealerMaxValue, the value where dealer should stop
    if (valueOfDealer < dealerMaxValue){
        //continue picking card until valueOfDealer is not less than dealerMaxValue, increase 'i' by one each time
        for (let i = dealer_index+1; valueOfDealer < dealerMaxValue; i++){
            //randomly assign a card image with the value that pairs with the image 
            giveCard();
            //bring that card imformation to dealer_images and dealer_values array at index of 'i'
            dealer_images[i] = images[random];
            dealer_values[i] = values[random];
            //remove the card imformations that has just assigned to dealer, from the orginal array that contains all image files and values
            removeCard();
            //set valueOfDealer as the sum of elements for the given array after new card is added to dealers array
            valueOfDealer = addValues(array);
        }
    }
    // after delaer finishes picking cards, display all dealer images
    displayDealerImages(dealer_images);

    //return the sum of dealer's cards
    return valueOfDealer;
}

//function to compare sum of player's cards to declare the winner 
function checkPlayerValues(item){

    //if given item is greater than targetValue, the sum is over BlackJack value
    if (item > targetValue){
        //shows the 'Dealer won' message as well as all the player's card values and the sum
        //dealer won because the sum of player's card is over BlackJack value
        RESULT.innerText = 'Dealer Won' + '\n' + 'Player: ' 
        + player_values + ' = ' + item + ' --> over ' + targetValue;
        //set dealer as the winner
        winner = 'dealer';
    }
    //else if item is equal to targetValue
    else if (item == targetValue){
        //shows the 'BLACK-JACK! Player Won' message with all the player's card values and the sum
        RESULT.innerText = 'BLACK-JACK! Player Won' + '\n' + 'Player: ' 
        + player_values + ' = ' + item;
        //set player as the winner
        winner = 'player';
    }

    //else if the item is not (greater or equal) to BlackJack value, less than targetValue
    else{
        //finish picking dealer's rest cards
        valueOfDealer = finishDealer(dealer_values);

        //if item is greater than the sum of all dealer's cards or the sum of dealer's cards is greater than targetValue
        if (item > valueOfDealer || valueOfDealer > targetValue){
            //shows the 'Plaer Won' message with all the player and dealer's card values and the sums
            RESULT.innerText = 'Player Won'+ '\n' + 'Player: ' 
            + player_values +  ' = ' + item + '\n' + ' vs Dealer: ' + dealer_values + ' = ' + valueOfDealer; 
            //set player as the winner
            winner = 'player';
        }

        //else if the item is equal to the sum of dealer's cards
        else if (item == valueOfDealer){
            //shows 'Tie' message with with all the player and dealer's card values and the sums
            RESULT.innerText = 'Tie'+ '\n' + 'Player: ' 
            + player_values + ' = ' + item +  '\n' +' vs Dealer: ' + dealer_values + ' = ' + valueOfDealer;
            //don't set anyone as the winner
            winner = '';
        }

        //else, if the valueOfDealer is less than BlackJack value and greater than the item
        else{
            //shows 'Dealer Won' message with all the player and dealer's card values and the sums
            RESULT.innerText = 'Dealer Won' + '\n' + 'Player: ' 
            + player_values + ' = ' + item +  '\n' + ' vs Dealer: ' + dealer_values + ' = ' + valueOfDealer;
            //set dealer as thew inner
            winner = 'dealer';
        }
    }
    //check the winner
    checkWinner();
    //clear the PRICE textbox
    PRICE.value = '';
}


//function to chekc the winner
function checkWinner(){

    //if player won the game
    if (winner == 'player'){
        //player gains the amount of money he betted
        //equation with treating each variable as an integer, not string
        playerMoney = Number(playerMoney) + Number(bettingMoney);
        //shows the new playerMoney
        MONEY.innerText = playerMoney;
    }
    //if dealer won the game
    else if (winner == 'dealer'){
        //player loses the amount of money he betted
        //equation with treating each variable as an integer, not string
        playerMoney = parseInt(playerMoney) - parseInt(bettingMoney);
        //shows the new playerMoney
        MONEY.innerText = playerMoney;
    }
    //else, if there is no winner, the game ended with tie
    else {
        //shows the plaerMoney without any changes
        MONEY.innerText = playerMoney;
    }

    //hide hit and stand buttons
    GO_BUTTON.hidden = true;
    STOP_BUTTON.hidden = true;   

    //show play again and restart button
    PLAY_AGAIN_BUTTON.hidden = false;
    RESTART_BUTTON.hidden = false;
}


//function to find the sum of elements for given array
function addValues(array){
    
    //declare the amount of ace in array as 0
    let aceNumber = 0;
    //delcare the location of ace in array as -1
    let aceIndex = -1; 

    //check 4 times, since there is 4 different suits of ace
    for (let i = 0; i < 4; i++){
        //find the index where value of 11 located in the array, starting from 0
        //if it's not the first time searching for 11, start one index after the previous found ace index
        aceIndex = array.indexOf(11,aceIndex+1);
        //if there is ace
        if (aceIndex !=  -1){
            //change hasAce state as true
            hasAce = true;
            //increase the aceNumber by one
            aceNumber++;
        }
        //else if there is no more ace
        else {
            //break the loop
            break;
        }
    }

    //let sum is 0
    let sum = 0;

    //go through all the element for given array
    for (let i = 0; i < array.length; i++){
        //sum is equal to the sum of all elements
        sum = sum + array[i];
    }

    //if there is ace in the given array
    if (hasAce == true){

        //run the loop for amounts of ace
        for (let i = 0; i < aceNumber; i++){
            //if the sum is greater than BlackJack value
            if (sum > targetValue){
                //subtract by 10, in this case, ace is working as the value of 1 instead of 11
                sum = sum - 10;
            }
            //if the sum is not greater than targetValue
            else {
                //break the loop
                break;
            }
        }
    }
    //return the sum of all elements
    return sum;
}

//function to clear given array
function clearArray(array){
    //change the given array's length to length of HAND in the beggining, 0
    array.length = HAND;
}

//function to remove one element from given parameter array
function removeArray(array){

    //set x as 0, using for index of smaller array
    let x = 0;

    //make a new smaller array that is 1 element less than parameter array
    let smaller = new Array(array.length-1);

    //deep copy algorithm - copy everything from array into except the item user typed in
    for (let i = 0; i < array.length; i++){

        //if 'i' is not the random, the index that is given to player or dealer
        if (i != random){

            //copy parameter array elements into the smaller array
            smaller[x] = array[i];
            //increase x-value, index of smaller array by one each time
            x++;
        }
    }
    //return smaller array after finish copying and removing one card
    return smaller; 
}

//function to clear dealer images
function clearDealers(){
    //clear the innderHTML for ALL_DEALER image html tag
    ALL_DEALER.innerHTML = '';
}

//function to show all dealer images, dealer_images should be the parameter array
function displayDealerImages(array) {

    //hide images for DEALER_FIRST and SECOND
    DEALER_FIRST.hidden = true;
    DEALER_SECOND.hidden = true;

    //clear any existing content in the ALL_DEALER
    ALL_DEALER.innerHTML = '';

    //go through the array
    for (let i = 0; i < array.length; i++){
        //create an img element
        let dealerImage = document.createElement('img');
        //assign image file of 'i'th index from the given array to the element that just has been created
        dealerImage.src = array[i];
        //append the image to display at html page to the ALL_DEALER constant
        ALL_DEALER.appendChild(dealerImage);
    }
}

//function to assign all starting values
function startingValues(){
    
    //assume no one has a ace
    hasAce = false;

    //reset every variables to the original value in order to make the game mode again
    suitOption = 1;
    cardType = 2;
    suitNumbers = 0;
    assignedValues = 2;
    
    //reset the sum of players and dealers
    valueOfPlayer = 0;
    valueOfDealer = 0;
    
    //reset indexes for dealer and plaer arrays
    dealer_index = 0;
    player_index = 0;
    
    //reset currentIndex for player card
    currentIndex = 0;

    //set targetValue and dealerMaxValue based on teh custom values
    targetValue = CUSTOM_BLACKJACK;
    dealerMaxValue = CUSTOM_DEALER;

    //clearing innerHTML for html element
    RESULT.innerText = '';
    PLAYER.innerHTML ='';
    DEALER_FIRST.innerHTML = '';
    DEALER_SECOND.innerHTML = '';

    //show player's money
    MONEY.innerText = playerMoney;
}