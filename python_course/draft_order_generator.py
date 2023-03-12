from flask import Flask
app = Flask(__name__)
import random

def draft_order():
    playerslist = list()
    file = open('teams.txt')
    # num_teams = input('Enter number of teams: ')
    # while int(num_teams) > 0:
    #     teams = input('Enter team name: ')
    for team in file:
        team = team.rstrip()
        playerslist.append(team)
        # num_teams = int(num_teams) - 1

    random.shuffle(playerslist)

    print('The 2023 Draft Order: ')
    for i, team in enumerate(playerslist):
        order = print(f'Pick #{i+1} goes to {team}')

    return order

if __name__ == '__main__':
    app.run()