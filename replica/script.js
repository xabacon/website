# imports
import random
import keyboard
import time
import os
from dataclasses import dataclass
from colorama import Fore, Style

#Upgrades Struct Declaration
@dataclass
class Upgrades:
    name: str
    cost: int
    Dicesides: int
    diceAmount: int
    scoreMultiplier: int
    priceMultiplier: float
    key: str
    
    
#Effects Struct Declaration
@dataclass
class Effects:
    name: str
    chance: int
    effect: int
    effectInterval: float
    duration: float
    activated: bool = False
    LastUpdate: float = 0.0

    
# upgrade Declarations
basic_side_Increase = Upgrades("Basic Side Increase", 10, 1, 0, 1,1.4,"1")
basic_Amount_Increase = Upgrades("Basic Amount Increase", 20, 0, 1, 1,2.8,"2")
basic_Score_Multiplier = Upgrades("Basic Score Multiplier", 50, 0, 0, 2,4.3,"3")
upgrade_list = [basic_side_Increase, basic_Amount_Increase, basic_Score_Multiplier]


# effect Declarations
normal = Effects("Normal", 0, 0, 0, 0)
ice = Effects("Ice", 1, 1, 5.0, 20.0)
fire = Effects("Fire", 2, 5, 2.0, 5.0)
poison = Effects("Poison", 3, 10, 15.0, 30.0)
effect_list = [ice, fire, poison]

#Dice Generator Function
def generator():
    return random.randint(0,i)
def effectGenerator():
    return random.randint(0,3)

# clear screen function
def clear_screen():
    if os.name == 'nt':
        os.system('cls')
        
def update_effects():
    global score, LastUpdate, ActiveEffect
    for effect in effect_list:
        if effect.activated:
            now = time.time()
            if now - effect.LastUpdate >= effect.effectInterval:
                score += effect.effect
                effect.duration -= effect.effectInterval
                effect.LastUpdate = now
                if effect.duration > 0:
                        continue
                else:
                    normal.activated = True
                    effect.activated = False
                    print(Fore.MAGENTA + effect.name + " effect has worn off." + Style.RESET_ALL)



#main Code
Instructions = True
i = 6
score = 0
scoreMultiplicator = 1
rollAmmount = 1
LastUpdate = time.time()
AdvancedView = False
ActiveEffect = False



#game loop
while True:
    if ActiveEffect:
        update_effects()
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
            for effect in effect_list:
                if effectGenerator() == effect.chance:
                    effect.activated = True
                    ActiveEffect = True
                    print(Fore.CYAN + effect.name + " Random event!!!" + Style.RESET_ALL)
            if dice == i:
                print(str(dice) + Fore.YELLOW + " Critical Roll! 2x Points" + Style.RESET_ALL)
                dice = dice * 2
            rollerCounter += 1
            diceSum += dice
        score = score + (diceSum * scoreMultiplicator)
        
        # display results
        print("You rolled a " + Fore.RED + str(diceSum) + Style.RESET_ALL)
        if ActiveEffect:
            update_effects()
            print("your score is: " + Fore.RED + str(score) + Style.RESET_ALL)
        print("Press " + Fore.GREEN + "'u'" + Style.RESET_ALL + " to upgrade")
        print("Press " + Fore.GREEN + "'a'" + Style.RESET_ALL + " to toggle advanced view")
        if AdvancedView == True:
            print("Current Dice sides: " + Fore.RED + str(i) + Style.RESET_ALL)
            print("Current Dice Amount: " + Fore.RED + str(rollAmmount) + Style.RESET_ALL)
            print("Current Score Multiplier: " + Fore.RED + str(scoreMultiplicator) + Style.RESET_ALL)
        print("=============================================================")
        time.sleep(0.2)
        
        
        #Upgrade Menu
    if keyboard.is_pressed('u'):
        clear_screen()
        print("available upgrades:")
        for Upgrades in upgrade_list:
            print(Fore.GREEN + Upgrades.name + Style.RESET_ALL + " | Cost: " + Fore.RED + str(Upgrades.cost) + Style.RESET_ALL + " | Dice sides: " + Fore.RED + str(Upgrades.Dicesides) + Style.RESET_ALL + " | Dice Amount: " + Fore.RED + str(Upgrades.diceAmount) + Style.RESET_ALL + " | Score Multiplier: " + Fore.RED + str(Upgrades.scoreMultiplier) + Style.RESET_ALL)
        time.sleep(0.2)
        
    if keyboard.is_pressed('a'):
        AdvancedView = not AdvancedView
        
        
        # Upgrade Handler
    for Upgrades in upgrade_list:
        if keyboard.is_pressed(Upgrades.key):
            if score >= Upgrades.cost:
                i += Upgrades.Dicesides
                score += Upgrades.diceAmount
                scoreMultiplicator *= Upgrades.scoreMultiplier
                rollAmmount += Upgrades.diceAmount
                score -= Upgrades.cost
                Upgrades.cost *= Upgrades.priceMultiplier
                print("You purchased " + Fore.GREEN + Upgrades.name + Style.RESET_ALL)
                time.sleep(0.2)
            else:
                print("You don't have enough points to purchase " + Fore.GREEN + Upgrades.name + Style.RESET_ALL)
                time.sleep(0.2)