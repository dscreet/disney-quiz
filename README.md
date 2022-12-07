# Disney quiz

The player has to guess which film the displayed disney character is from.

Created using the ERN stack alongside the [Disney API](https://disneyapi.dev/).

![image](https://user-images.githubusercontent.com/29370740/206271194-1d5ff846-8bc3-4fc0-b94f-7639cd491130.png)

## Game

- Each game has 10 rounds.
- Each round displays an image of a character and 4 answers, one of them being the correct one.
- Player has one guess per round.
- Characters for each round are random.
- At the end of the 10 rounds, the total score is displayed and the player has the option to play again.

<div align="center">
<img src="https://i.imgur.com/qJuMuNO.png" width="48%"/>
<img src="https://i.imgur.com/kmpSZve.png" width="48%"/>
</div>

## Launch

In the project directory, you can run:

### `docker-compose up --build`

This will launch both the client and server, where you can view the quiz in your browser on [http://localhost:3000](http://localhost:3000).
