# imports
import random
import keyboard
import time
import os
from dataclasses import dataclass
from colorama import Fore, Style

# struct Declaration
@dataclass
class Upgrades:
    name: str
    cost: int
    Dicesides: int
    diceAmount: int
    scoreMultiplier: int
    key: str

    
# upgrade Declarations
basic_side_Increase = Upgrades("Basic Side Increase", 10, 1, 0, 1,"1")
basic_Amount_Increase = Upgrades("Basic Amount Increase", 20, 0, 1, 1,"2")
basic_Score_Multiplier = Upgrades("Basic Score Multiplier", 50, 0, 0, 2,"3")
upgrade_list = [basic_side_Increase, basic_Amount_Increase, basic_Score_Multiplier]


#Dice Generator Function
def generator():
    return random.randint(0,i)

# clear screen function
def clear_screen():
    if os.name == 'nt':
        os.system('cls')



#main Code
Instructions = True
i = 6
score = 0
scoreMultiplicator = 1
rollAmmount = 1

#game loop
while True:
    if Instructions:
        Instructions = False
        print("Welcome to the dice roller!")
        print("Press " + Fore.GREEN + "'q'" + Style.RESET_ALL + " to quit")
        print("Press " + Fore.GREEN + "'enter'" + Style.RESET_ALL + " to roll the dice")
    if keyboard.is_pressed('q'):
        break
    
    
    # roll dice
    if keyboard.is_pressed('enter'):
        rollerCounter = 0
        diceSum = 0
        clear_screen()
        print("=============================================================")
        
        #roll handler
        while (rollerCounter < rollAmmount):
            dice = generator()
            if dice == i:
                print(str(dice) + Fore.YELLOW + " Critical Roll!" + Style.RESET_ALL)
            rollerCounter += 1
            diceSum += dice
        score = score + (diceSum * scoreMultiplicator)
        
        # display results
        print("You rolled a " + Fore.RED + str(diceSum) + Style.RESET_ALL)
        print("your score is: " + Fore.RED + str(score) + Style.RESET_ALL)
        print("Press " + Fore.GREEN + "'u'" + Style.RESET_ALL + " to upgrade")
        print("=============================================================")
        time.sleep(0.2)
        
        
        #Upgrade Menu
    if keyboard.is_pressed('u'):
        clear_screen()
        print("available upgrades:")
        for Upgrades in upgrade_list:
            print(Fore.GREEN + Upgrades.name + Style.RESET_ALL + " | Cost: " + Fore.RED + str(Upgrades.cost) + Style.RESET_ALL + " | Dice sides: " + Fore.RED + str(Upgrades.Dicesides) + Style.RESET_ALL + " | Dice Amount: " + Fore.RED + str(Upgrades.diceAmount) + Style.RESET_ALL + " | Score Multiplier: " + Fore.RED + str(Upgrades.scoreMultiplier) + Style.RESET_ALL)
        time.sleep(0.2)
        
        
        # Upgrade Handler
    for Upgrades in upgrade_list:
        if keyboard.is_pressed(Upgrades.key):
            if score >= Upgrades.cost:
                i += Upgrades.Dicesides
                score += Upgrades.diceAmount
                scoreMultiplicator *= Upgrades.scoreMultiplier
                rollAmmount += Upgrades.diceAmount
                score -= Upgrades.cost
                print("You purchased " + Fore.GREEN + Upgrades.name + Style.RESET_ALL)
                time.sleep(0.2)
            else:
                print("You don't have enough points to purchase " + Fore.GREEN + Upgrades.name + Style.RESET_ALL)
                time.sleep(0.2)
