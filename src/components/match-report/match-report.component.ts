import { Component, OnInit } from "@angular/core";
import { Player } from '../../classes/player';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from "../../services/player.service"
import { MatchService } from "../../services/match.service"
import { EventService } from "../../services/event.service"
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'match-report',
    styleUrls: ['./match-report.style.scss'],
    templateUrl: 'match-report.template.html'
})
export class MatchReportComponent implements OnInit {

    player1: Player;
    player2: Player;
    player1Score: number;
    player2Score: number;
    loading = true;
    loggedIn = true;
    noEvent = false;
    event = '';
    submitting = false;
    too_many = false;

    constructor(
        private playerService: PlayerService,
        private matchService: MatchService,
        private eventService: EventService,
        private route: ActivatedRoute,
        private router: Router
    ){ }

    submit(){
        if(!this.submitting){
            this.submitting = true;
            let winner = this.player1Score > this.player2Score ? this.player1.id : this.player2.id;
            let loser = this.player1Score > this.player2Score ? this.player2.id : this.player1.id;

            this.matchService.countMatches(this.player1.id, this.player2.id).then(count => {
                if(count < 5){
                    return this.matchService.addMatch({
                        player1Score: this.player1Score,
                        player2Score: this.player2Score,
                        player1Id: this.player1.id,
                        player2Id: this.player2.id,
                        winnerId: winner,
                        loserId: loser,
                        completed_at: Date.now()
                    });
                } else {
                    return Promise.reject(false);
                }
            }).then(response => {
                const repWin = this.playerService.playerWon(winner);
                const repLoss = this.playerService.playerLost(loser);
                return Promise.all([repWin, repLoss]);
            }, err => {
                return Promise.reject(false);
            }).then(response => {
                this.router.navigate(['/players']);
            }, err => {
                this.too_many = true;
            });
        }
    }

    ngOnInit(){

        if(AuthService.loggedIn() !== true){
            this.loggedIn = false;
            return false;
        }
        if(EventService.selectedEvent() === null){
            this.noEvent = true;
            return false;
        } else {
            this.event = EventService.selectedEvent().name;
        }

        this.route.params.subscribe(players => {

            // map ID strings to integers
            // let playerIDs = Object.entries(players).map(id => +id[1]);
            let playerIDs = [];
            for(let x in players){
                playerIDs.push(+players[x]);
            }
            // get both players
            Promise.all(playerIDs.map(
                    id => this.playerService.getPlayer(id))
                ).then(players => {
                    this.player1 = <Player>players[0];
                    this.player2 = <Player>players[1];
                    this.loading = false;
                }
            );

        });

    }
}
